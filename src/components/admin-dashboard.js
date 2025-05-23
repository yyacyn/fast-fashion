"use client"

import { useState, useEffect } from "react"
import { getStoreSubmissions, updateStoreStatus } from "../lib/adminAuth"
import dynamic from "next/dynamic";
import AdminLayout from "../components/admin-layout"
import { CheckCircle, XCircle, AlertTriangle, MapPin, Phone, Tag, Calendar, Clock } from "lucide-react"
import { format } from "date-fns"
import "../app/globals.css"
import STORE_CATEGORIES from "../data/categories"

// Dynamically import MapComponent with no SSR
const MapComponent = dynamic(() => import("./map-component"), { ssr: false })


export default function AdminDashboardPage() {
    const [stores, setStores] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedStore, setSelectedStore] = useState(null)
    const [processingId, setProcessingId] = useState(null)

    useEffect(() => {
        fetchStores()
    }, [])

    const fetchStores = async () => {
        setLoading(true);
        try {
            const data = await getStoreSubmissions("pending"); // Fetch stores with status "pending"
            setStores(data || []);
        } catch (error) {
            console.error("Error fetching stores:", error);
            setError("Failed to load store submissions. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (storeId) => {
        if (processingId) return
        setProcessingId(storeId)

        try {
            await updateStoreStatus(storeId, "approved")
            setStores(stores.filter((store) => store.id !== storeId))

            if (selectedStore && selectedStore.id === storeId) {
                setSelectedStore(null)
            }
        } catch (error) {
            console.error("Error approving store:", error)
            alert("Failed to approve store. Please try again.")
        } finally {
            setProcessingId(null)
        }
    }

    const handleReject = async (storeId) => {
        if (processingId) return
        setProcessingId(storeId)

        try {
            await updateStoreStatus(storeId, "rejected")
            setStores(stores.filter((store) => store.id !== storeId))

            if (selectedStore && selectedStore.id === storeId) {
                setSelectedStore(null)
            }
        } catch (error) {
            console.error("Error rejecting store:", error)
            alert("Failed to reject store. Please try again.")
        } finally {
            setProcessingId(null)
        }
    }

    const getCategoryLabel = (categoryId) => {
        const category = STORE_CATEGORIES.find((cat) => cat.id === categoryId)
        return category ? category.label : categoryId
    }

    return (
        
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-[var(--foreground)]">Pending Store Submissions</h1>
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
                        <p className="mt-4 text-[var(--foreground)]">Loading submissions...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-start">
                        <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                ) : stores.length === 0 ? (
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-6 text-center">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
                            <CheckCircle className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-medium text-blue-900 mb-2">No pending submissions</h3>
                        <p className="text-blue-700">
                            All store submissions have been processed. Check back later for new submissions.
                        </p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="md:col-span-1 space-y-4">
                            <h2 className="text-lg font-semibold mb-2">Store Submissions ({stores.length})</h2>

                            <div className="bg-white rounded-md shadow overflow-hidden">
                                <div className="max-h-[600px] overflow-y-auto">
                                    {stores.map((store) => (
                                        <div
                                            key={store.id}
                                            onClick={() => setSelectedStore(store)}
                                            className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${selectedStore && selectedStore.id === store.id
                                                ? "bg-gray-50 border-l-4 border-l-[var(--primary)]"
                                                : ""
                                                }`}
                                        >
                                            <h3 className="font-medium text-[var(--foreground)]">{store.name}</h3>
                                            <p className="text-sm text-[var(--muted-foreground)] truncate">{store.address}</p>
                                            <div className="flex items-center mt-2 text-xs text-[var(--muted-foreground)]">
                                                <Calendar className="h-3 w-3 mr-1" />
                                                <span>
                                                    {store.created_at ? format(new Date(store.created_at), "MMM d, yyyy") : "Date not available"}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            {selectedStore ? (
                                <div className="bg-white rounded-md shadow p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <h2 className="text-xl font-bold text-[var(--foreground)]">{selectedStore.name}</h2>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleApprove(selectedStore.id)}
                                                disabled={processingId === selectedStore.id}
                                                className={`px-3 py-1.5 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center ${processingId === selectedStore.id ? "opacity-50 cursor-not-allowed" : ""
                                                    }`}
                                            >
                                                <CheckCircle className="h-4 w-4 mr-1" />
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleReject(selectedStore.id)}
                                                disabled={processingId === selectedStore.id}
                                                className={`px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center ${processingId === selectedStore.id ? "opacity-50 cursor-not-allowed" : ""
                                                    }`}
                                            >
                                                <XCircle className="h-4 w-4 mr-1" />
                                                Reject
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div>
                                                <h3 className="text-sm font-medium text-[var(--muted-foreground)]">Store Information</h3>
                                                <div className="mt-2 space-y-2">
                                                    <p className="flex items-start text-[var(--foreground)]">
                                                        <MapPin className="h-4 w-4 mr-2 mt-1 text-[var(--primary)]" />
                                                        <span>{selectedStore.address}</span>
                                                    </p>
                                                    <p className="flex items-start text-[var(--foreground)]">
                                                        <Phone className="h-4 w-4 mr-2 mt-1 text-[var(--primary)]" />
                                                        <span>{selectedStore.phone}</span>
                                                    </p>
                                                    {selectedStore.website && (
                                                        <p className="flex items-start text-[var(--foreground)]">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-4 w-4 mr-2 mt-1 text-[var(--primary)]"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                                                />
                                                            </svg>
                                                            <a
                                                                href={selectedStore.website}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-blue-600 hover:underline"
                                                            >
                                                                {selectedStore.website}
                                                            </a>
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="text-sm font-medium text-[var(--muted-foreground)]">Categories</h3>
                                                <div className="mt-2 flex flex-wrap gap-2">
                                                    {selectedStore.categories && selectedStore.categories.length > 0 ? (
                                                        selectedStore.categories.map((categoryId) => (
                                                            <span
                                                                key={categoryId}
                                                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                                            >
                                                                <Tag className="h-3 w-3 mr-1" />
                                                                {getCategoryLabel(categoryId)}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span className="text-[var(--muted-foreground)]">No categories specified</span>
                                                    )}
                                                </div>
                                            </div>

                                            {selectedStore.description && (
                                                <div>
                                                    <h3 className="text-sm font-medium text-[var(--muted-foreground)]">Description</h3>
                                                    <p className="mt-2 text-[var(--foreground)] bg-gray-50 p-3 rounded-md">
                                                        {selectedStore.description}
                                                    </p>
                                                </div>
                                            )}

                                            <div>
                                                <h3 className="text-sm font-medium text-[var(--muted-foreground)]">Submission Info</h3>
                                                <div className="mt-2 space-y-2">
                                                    <p className="flex items-center text-sm text-[var(--foreground)]">
                                                        <span className="font-medium mr-2">Submitted by:</span>
                                                        {selectedStore.owner_name} ({selectedStore.owner_email})
                                                    </p>
                                                    <p className="flex items-center text-sm text-[var(--foreground)]">
                                                        <span className="font-medium mr-2">Submitted on:</span>
                                                        <Clock className="h-3 w-3 mr-1" />
                                                        {selectedStore.created_at
                                                            ? format(new Date(selectedStore.created_at), "MMMM d, yyyy 'at' h:mm a")
                                                            : "Date not available"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <h3 className="text-sm font-medium text-[var(--muted-foreground)]">Store Location</h3>
                                                <div className="mt-2">
                                                    {selectedStore.location ? (
                                                        <div className="space-y-2">
                                                            <div className="bg-gray-100 p-3 rounded-md">
                                                                <p className="text-sm text-[var(--foreground)]">
                                                                    Coordinates: {selectedStore.location[0].toFixed(6)},{" "}
                                                                    {selectedStore.location[1].toFixed(6)}
                                                                </p>
                                                            </div>
                                                            <div className="h-64 bg-gray-200 rounded-md flex items-center justify-center">
                                                                <MapComponent
                                                                    stores={{
                                                                        features: [
                                                                            {
                                                                                type: "Feature",
                                                                                geometry: {
                                                                                    type: "Point",
                                                                                    coordinates: selectedStore.location,
                                                                                },
                                                                                properties: {
                                                                                    id: selectedStore.id,
                                                                                    name: selectedStore.name,
                                                                                },
                                                                            },
                                                                        ],
                                                                    }}
                                                                    selectedStore={{
                                                                        geometry: {
                                                                            coordinates: selectedStore.location,
                                                                        },
                                                                        properties: {
                                                                            id: selectedStore.id,
                                                                        },
                                                                    }}
                                                                    setSelectedStore={() => { }}
                                                                />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <p className="text-[var(--muted-foreground)]">No location data available</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="text-sm font-medium text-[var(--muted-foreground)]">Store Image</h3>
                                                <div className="mt-2">
                                                    {selectedStore.image ? (
                                                        <img
                                                            src={selectedStore.image || "/placeholder.svg"}
                                                            alt={selectedStore.name}
                                                            className="w-full h-48 object-cover rounded-md"
                                                        />
                                                    ) : (
                                                        <div className="h-48 bg-gray-100 rounded-md flex items-center justify-center">
                                                            <p className="text-[var(--muted-foreground)]">No image available</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-gray-50 border border-gray-200 rounded-md p-12 text-center">
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
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">No store selected</h3>
                                    <p className="mt-1 text-sm text-gray-500">Select a store from the list to view details</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    )
}
