"use client"

import React from "react"

import { useEffect, useState } from "react"
import type { StoreMapProps } from "./store-map"

// This component acts as a wrapper to load the map only on the client side
export default function StoreMapWrapper(props: StoreMapProps) {
    const [MapComponent, setMapComponent] = useState<React.ComponentType<StoreMapProps> | null>(null)

    useEffect(() => {
        // Import the map component only on the client side
        import("./store-map").then((module) => {
            setMapComponent(() => module.StoreMap)
        })
    }, [])

    if (!MapComponent) {
        return (
            <div className="flex items-center justify-center h-[70vh] bg-gray-100">
                <p>Loading map...</p>
            </div>
        )
    }

    return <MapComponent {...props} />
}
