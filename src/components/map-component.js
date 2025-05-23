"use client"

import { useEffect, useRef } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
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

// Component to recenter map when selectedStore changes
function MapController({ selectedStore, stores }) {
    const map = useMap()

    useEffect(() => {
        if (selectedStore) {
            const { coordinates } = selectedStore.geometry
            map.setView([coordinates[1], coordinates[0]], 15)
        } else if (stores.features.length > 0) {
            // If no store is selected but we have stores, fit the map to show all stores
            const bounds = L.latLngBounds(
                stores.features.map((store) => {
                    const [lng, lat] = store.geometry.coordinates
                    return [lat, lng]
                }),
            )
            map.fitBounds(bounds, { padding: [50, 50] })
        }
    }, [selectedStore, stores, map])

    return null
}

// Main map component
function MapComponent({ stores, selectedStore, setSelectedStore }) {
    const mapRef = useRef(null)
    const markerIcon = createMarkerIcon()

    // Default center on Bogor, Indonesia
    const center = [-6.5971, 106.806]

    return (
        <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }} ref={mapRef}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {stores.features
                ?.filter((store) => store.geometry?.coordinates)
                .map((store) => {
                    const [lng, lat] = store.geometry.coordinates;
                    const isSelected = selectedStore && selectedStore.properties.id === store.properties.id;

                    return (
                        <Marker
                            key={store.properties.id}
                            position={[lat, lng]}
                            icon={markerIcon}
                            eventHandlers={{
                                click: () => {
                                    setSelectedStore(store);
                                },
                            }}
                        >
                            <Popup>
                                <div>
                                    <h3 className="font-semibold">{store.properties.name}</h3>
                                    <p className="text-sm">{store.properties.address}</p>
                                    {/* <button
                                        className="text-sm text-blue-600 hover:underline mt-1"
                                        onClick={() => setSelectedStore(store)}
                                    >
                                        View Details
                                    </button> */}
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}

            <MapController selectedStore={selectedStore} stores={stores} />
        </MapContainer>
    )
}

export default MapComponent
