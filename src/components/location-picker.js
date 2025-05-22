"use client"

import { useEffect } from "react"
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// Fix for Leaflet marker icons in Next.js
const createMarkerIcon = () => {
    return new L.Icon({
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    })
}

// Component to handle click events on the map
function MapClickHandler({ onLocationSelect }) {
    const map = useMap()

    useEffect(() => {
        map.on("click", (e) => {
            onLocationSelect([e.latlng.lat, e.latlng.lng])
        })

        return () => {
            map.off("click")
        }
    }, [map, onLocationSelect])

    return null
}

export default function LocationPicker({ onLocationSelect, selectedLocation }) {
    const markerIcon = createMarkerIcon()

    // Default center on Bogor, Indonesia
    const defaultCenter = [-6.5971, 106.806]
    const markerPosition = selectedLocation || defaultCenter

    return (
        <MapContainer center={defaultCenter} zoom={13} style={{ height: "100%", width: "100%" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {selectedLocation && <Marker position={selectedLocation} icon={markerIcon} />}

            <MapClickHandler onLocationSelect={onLocationSelect} />
        </MapContainer>
    )
}
