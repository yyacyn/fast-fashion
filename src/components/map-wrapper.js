"use client"

import { useEffect, useState } from "react"

// This component acts as a wrapper to load the map only on the client side
export default function MapWrapper({ stores, selectedStore, setSelectedStore }) {
    const [MapComponent, setMapComponent] = useState(null)

    useEffect(() => {
        // Import the map component only on the client side
        import("./map-component").then((module) => {
            setMapComponent(() => module.default)
        })
    }, [])

    if (!MapComponent) {
        return (
            <div className="flex items-center justify-center h-[70vh] bg-gray-100">
                <p>Loading map...</p>
            </div>
        )
    }

    return <MapComponent stores={stores} selectedStore={selectedStore} setSelectedStore={setSelectedStore} />
}
