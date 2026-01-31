"use client"

import { useState, useEffect } from "react"
import { Search, MapPin, Filter, X, Menu, Phone, Navigation, ChevronLeft } from "lucide-react"
import dynamic from "next/dynamic"
import { supabase } from "../lib/supabaseClient"
import "../app/globals.css";
import SAMPLE_STORES from "../data/sample-stores"
import STORE_CATEGORIES from "../data/categories"

// Import custom components
import {
    Input,
    Button,
    Checkbox,
    Label,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Separator,
    Badge,
} from "./ui/custom-components"
import Link from "next/link"

// Dynamically import MapComponent with no SSR
const MapComponent = dynamic(() => import("./map-component"), { ssr: false })


export default function StoreFinderApp() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [allStores, setAllStores] = useState(SAMPLE_STORES)
    const [filteredStores, setFilteredStores] = useState(SAMPLE_STORES)
    const [selectedStore, setSelectedStore] = useState<{
        type: string
        properties: {
            id: string
            name: string
            address: string
            categories: string[]
            phone: string
            web?: string
            image?: string
            description?: string
        }
        geometry: {
            type: string
            coordinates: [number, number]
        }
    } | null>(null)
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    // Fetch stores from Supabase
    useEffect(() => {
        async function fetchStores() {
            setIsLoading(true)
            try {
                const { data, error } = await supabase.from("stores").select("*").eq("status", "approved")

                if (error) {
                    console.error("Error fetching stores:", error)
                    return
                }

                if (data && data.length > 0) {
                    // Convert Supabase data to GeoJSON format
                    const dynamicFeatures = data.map((store) => ({
                        type: "Feature",
                        properties: {
                            id: store.id,
                            name: store.name,
                            address: store.address,
                            categories: store.categories || [],
                            phone: store.phone,
                            web: store.website,
                            image: store.image,
                            description: store.description,
                            status: store.status,
                        },
                        geometry: {
                            type: "Point",
                            coordinates: store.location || [106.8019, -6.5971], // Default to Bogor if no location
                        },
                    }))

                    // Combine with sample stores
                    const combinedStores = {
                        type: "FeatureCollection",
                        features: [...SAMPLE_STORES.features, ...dynamicFeatures],
                    }

                    setAllStores(combinedStores)
                    setFilteredStores(combinedStores)
                }
            } catch (error) {
                console.error("Unexpected error fetching stores:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchStores()
    }, [])

    // Filter stores based on search query and selected categories
    useEffect(() => {
        const filtered = {
            type: "FeatureCollection",
            features: allStores.features.filter((store) => {
                const matchesSearch =
                    searchQuery === "" ||
                    store.properties.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    store.properties.address.toLowerCase().includes(searchQuery.toLowerCase())

                const matchesCategories =
                    selectedCategories.length === 0 || selectedCategories.some((cat) => store.properties.categories.includes(cat))

                return matchesSearch && matchesCategories
            }),
        }

        setFilteredStores(filtered)
    }, [searchQuery, selectedCategories, allStores])

    // Handle category selection
    const handleCategoryChange = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
        )
    }

    // Clear all filters
    const clearFilters = () => {
        setSearchQuery("")
        setSelectedCategories([])
    }

    return (
        <div className="flex flex-col h-screen">
            {/* Header */}
            <header className="bg-white border-b border-[var(--border)] p-3 shadow-sm flex">
                <div className="max-w-7xl mx-3 flex items-center justify-between w-full">
                    <Link href="/" className="flex items-center">
                        <h1 className="text-l text-black bg-clip-text flex items-center">
                            <ChevronLeft size={20} className="mr-2 text-black" />
                            Back
                        </h1>
                    </Link>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                    >
                        {isMobileFilterOpen ? <X size={20} /> : <Menu size={20} />}
                    </Button>
                </div>
            </header>

            {/* Main content */}
            <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                {/* Sidebar for filters - hidden on mobile by default */}
                <aside
                    className={`
            ${isMobileFilterOpen ? "block" : "hidden"} 
            md:block bg-[var(--card-background)] w-full md:w-80 border-r border-[var(--border)] overflow-y-auto p-4
            transition-all duration-300 ease-in-out
          `}
                >
                    <div className="space-y-6">
                        {/* Search */}
                        <div>
                            <h2 className="text-lg font-semibold mb-3 flex items-center">
                                <Search size={18} className="mr-2 text-[var(--primary)]" />
                                Search Stores
                            </h2>
                            <div className="relative">
                                <Input
                                    type="text"
                                    placeholder="Search by name or address"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10"
                                />
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </div>
                        </div>

                        <Separator />

                        {/* Categories */}
                        <div>
                            <h2 className="text-lg font-semibold mb-3 flex items-center">
                                <Filter size={18} className="mr-2 text-[var(--primary)]" />
                                Categories
                            </h2>
                            <div className="space-y-2">
                                {STORE_CATEGORIES.map((category) => (
                                    <div
                                        key={category.id}
                                        className="flex items-center space-x-2 p-2 hover:bg-[var(--muted)] rounded-md transition-colors"
                                    >
                                        <Checkbox
                                            id={`category-${category.id}`}
                                            checked={selectedCategories.includes(category.id)}
                                            onCheckedChange={() => handleCategoryChange(category.id)}
                                        />
                                        <Label htmlFor={`category-${category.id}`} className="cursor-pointer flex-1">
                                            {category.label}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Separator />

                        {/* Filter summary */}
                        <div>
                            <h2 className="text-lg font-semibold mb-3">Active Filters</h2>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {selectedCategories.length > 0 ? (
                                    selectedCategories.map((cat) => {
                                        const category = STORE_CATEGORIES.find((c) => c.id === cat)
                                        return (
                                            <Badge
                                                key={cat}
                                                variant="secondary"
                                                className="cursor-pointer pl-2 pr-1 py-1 flex items-center"
                                                onClick={() => handleCategoryChange(cat)}
                                            >
                                                {category?.label}
                                                <span className="ml-1 rounded-full bg-[var(--primary)] text-white w-4 h-4 flex items-center justify-center">
                                                    ✕
                                                </span>
                                            </Badge>
                                        )
                                    })
                                ) : (
                                    <p className="text-sm text-[var(--muted-foreground)]">No filters applied</p>
                                )}
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={clearFilters}
                                disabled={searchQuery === "" && selectedCategories.length === 0}
                                className="w-full"
                            >
                                Clear All Filters
                            </Button>
                        </div>

                        {/* Results count */}
                        <div className="mt-4 bg-[var(--accent)] text-[var(--accent-foreground)] p-3 rounded-md">
                            <p className="text-sm font-medium">
                                Found <span className="font-bold">{filteredStores.features.length}</span> stores
                            </p>
                        </div>

                        {/* Add Store Button */}
                        <div className="mt-4">
                            <Link href="/add-store">
                                <Button variant="default" className="w-full">
                                    Add Your Store
                                </Button>
                            </Link>
                        </div>

                        {/* Close button - only on mobile */}
                        <div className="md:hidden mt-4">
                            <Button variant="secondary" className="w-full" onClick={() => setIsMobileFilterOpen(false)}>
                                Apply Filters
                            </Button>
                        </div>
                    </div>
                </aside>

                {/* Main content area */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Mobile filter toggle */}
                    <div className="md:hidden p-2 bg-[var(--muted)] border-b border-[var(--border)]">
                        <Button
                            variant="outline"
                            className="w-full flex items-center justify-center"
                            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                        >
                            <Filter size={16} className="mr-2" />
                            {isMobileFilterOpen ? "Hide Filters" : "Show Filters"}
                            <Badge className="ml-2" variant="secondary">
                                {filteredStores.features.length}
                            </Badge>
                        </Button>
                    </div>

                    {/* Loading state */}
                    {isLoading && (
                        <div className="absolute inset-0 bg-white bg-opacity-70 z-10 flex items-center justify-center">
                            <div className="flex flex-col items-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)]"></div>
                                <p className="mt-4 text-[var(--foreground)]">Loading stores...</p>
                            </div>
                        </div>
                    )}

                    {/* Map */}
                    <div className="flex-1 relative">
                        <MapComponent stores={filteredStores} selectedStore={selectedStore} setSelectedStore={setSelectedStore} />
                    </div>

                    {/* Selected store details */}
                    {selectedStore && (
                        <Card className="m-4">
                            <CardHeader className="pb-2 pt-3 flex justify-between flex-row-reverse">
                                {/* Close Button */}
                                <button
                                    onClick={() => setSelectedStore(null)}
                                    className="flex text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                                >
                                    <X size={20} />
                                </button>
                                <CardTitle className="flex items-center">
                                    <MapPin size={20} className="mr-2 text-[var(--primary)]" />
                                    {selectedStore.properties.name}
                                </CardTitle>
                            </CardHeader>

                            <CardContent>
                                <div className="flex flex-col">
                                    {/* Store info and image in a flex row */}
                                    <div className="flex justify-between items-start">
                                        {/* Store details on the left */}
                                        <div className="flex-1">
                                            <p className="text-sm text-[var(--muted-foreground)] mb-2">{selectedStore.properties.address}</p>
                                            <p className="text-sm mb-3 flex items-center">
                                                <Phone size={16} className="mr-2 text-[var(--primary)]" />
                                                <span>{selectedStore.properties.phone}</span>
                                            </p>
                                            <p className="text-sm mb-3">
                                                {selectedStore.properties.description || "No description available."}
                                            </p>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {selectedStore.properties.categories.map((cat) => {
                                                    const category = STORE_CATEGORIES.find((c) => c.id === cat)
                                                    return (
                                                        <Badge key={cat} variant="secondary">
                                                            {category?.label || cat}
                                                        </Badge>
                                                    )
                                                })}
                                            </div>
                                            
                                        </div>

                                        {/* Image on the right */}
                                        {selectedStore.properties.image && (
                                            <div className="ml-4">
                                                <img
                                                    src={selectedStore.properties.image || "/placeholder.svg"}
                                                    alt={selectedStore.properties.name}
                                                    className="w-32 h-32 object-cover rounded-md"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Button below both info and image */}
                                    <div className="mt-4 pt-4 border-t border-[var(--border)]">
                                        {selectedStore.properties.web ? (
                                            <a
                                                href={selectedStore.properties.web}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full flex items-center justify-center"
                                            >
                                                <Button variant="default" size="sm" className="w-full flex items-center justify-center">
                                                    <Navigation size={16} className="mr-2" />
                                                    Go to Web
                                                </Button>
                                            </a>
                                        ) : (
                                            <Button variant="default" size="sm" className="w-full flex items-center justify-center" disabled>
                                                No Website Available
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}
