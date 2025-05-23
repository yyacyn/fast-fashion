"use client"

import { useState, useEffect } from "react"
import { getStoreSubmissions, updateStoreStatus } from "../lib/adminAuth"
import AdminLayout from "../components/admin-layout"
import { AlertTriangle, MapPin, Phone, Calendar, Search, Trash2 } from "lucide-react"
import { format } from "date-fns"
import "../app/globals.css"
import STORE_CATEGORIES from "../data/categories"


export default function AdminApprovedStoresPage() {
    const [stores, setStores] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [filteredStores, setFilteredStores] = useState([])
    const [processingId, setProcessingId] = useState(null);

    useEffect(() => {
        fetchStores()
    }, [])

    useEffect(() => {
        if (stores.length > 0) {
            const filtered = stores.filter(
                (store) =>
                    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    store.address.toLowerCase().includes(searchQuery.toLowerCase()),
            )
            setFilteredStores(filtered)
        }
    }, [searchQuery, stores])

    const fetchStores = async () => {
        setLoading(true)
        try {
            const data = await getStoreSubmissions("approved")
            setStores(data || [])
            setFilteredStores(data || [])
        } catch (error) {
            console.error("Error fetching stores:", error)
            setError("Failed to load approved stores. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const getCategoryLabel = (categoryId) => {
        const category = STORE_CATEGORIES.find((cat) => cat.id === categoryId)
        return category ? category.label : categoryId
    }

    const handleReject = async (storeId) => {
        if (processingId) return;
        setProcessingId(storeId);

        try {
            await updateStoreStatus(storeId, "rejected"); // Update status to "rejected"
            setStores(stores.filter((store) => store.id !== storeId)); // Remove the store from the list
            setFilteredStores(filteredStores.filter((store) => store.id !== storeId)); // Update filtered list
        } catch (error) {
            console.error("Error rejecting store:", error);
            alert("Failed to reject store. Please try again.");
        } finally {
            setProcessingId(null);
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-[var(--foreground)]">Approved Stores</h1>
                    <button
                        onClick={fetchStores}
                        className="px-4 py-2 bg-gray-100 text-[var(--foreground)] rounded-md hover:bg-gray-200"
                    >
                        Refresh
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)] mx-auto"></div>
                        <p className="mt-4 text-[var(--foreground)]">Loading approved stores...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-start">
                        <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                ) : (
                    <>
                        <div className="relative mb-6">
                            <input
                                type="text"
                                placeholder="Search by name or address"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    &times;
                                </button>
                            )}
                        </div>

                        {filteredStores.length === 0 ? (
                            <div className="bg-gray-50 border border-gray-200 rounded-md p-6 text-center">
                                <svg
                                    className="mx-auto h-12 w-12 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                                <h3 className="mt-2 text-sm font-medium text-gray-900">No approved stores found</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    {searchQuery ? "Try a different search term" : "There are no approved stores yet"}
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredStores.map((store) => (
                                    <div key={store.id} className="bg-white rounded-md shadow overflow-hidden">
                                        <div className="h-40 bg-gray-200 relative">
                                            {store.image ? (
                                                <img
                                                    src={store.image || "/placeholder.svg"}
                                                    alt={store.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                                    <p className="text-gray-500">No image available</p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h2 className="text-lg font-semibold text-[var(--foreground)]">{store.name}</h2>
                                            <p className="text-sm text-[var(--muted-foreground)] flex items-center mt-1">
                                                <MapPin className="h-4 w-4 mr-1 text-[var(--primary)]" />
                                                {store.address}
                                            </p>
                                            <p className="text-sm text-[var(--muted-foreground)] flex items-center mt-1">
                                                <Phone className="h-4 w-4 mr-1 text-[var(--primary)]" />
                                                {store.phone}
                                            </p>

                                            <div className="mt-3 flex flex-wrap gap-1">
                                                {store.categories &&
                                                    store.categories.map((categoryId) => (
                                                        <span
                                                            key={categoryId}
                                                            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                                        >
                                                            {getCategoryLabel(categoryId)}
                                                        </span>
                                                    ))}
                                            </div>

                                            <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                                                <div className="flex items-center text-xs text-[var(--muted-foreground)]">
                                                    <Calendar className="h-3 w-3 mr-1" />
                                                    <span>
                                                        {store.created_at
                                                            ? format(new Date(store.created_at), "MMM d, yyyy")
                                                            : "Date not available"}
                                                    </span>
                                                </div>

                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() => handleReject(store.id)}
                                                        disabled={processingId === store.id}
                                                        className={`px-3 py-1 text-xs bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center ${processingId === store.id ? "opacity-50 cursor-not-allowed" : ""
                                                            }`}
                                                    >
                                                        <Trash2 className="h-3 w-3 mr-1" />
                                                        Reject
                                                    </button>
                                                    {store.website && (
                                                    <a
                                                        href={store.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-sm text-blue-600 hover:underline"
                                                    >
                                                        Website →
                                                    </a>
                                                )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </AdminLayout>
    )
}
