"use client"

import * as React from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from "react-leaflet"
import { LatLngExpression } from "leaflet"
import "leaflet/dist/leaflet.css"
import { cn } from "@/lib/utils"

interface MapProps extends React.HTMLAttributes<HTMLDivElement> {
  center: LatLngExpression
  zoom?: number
  children?: React.ReactNode
}

const Map = React.forwardRef<HTMLDivElement, MapProps>(
  ({ center, zoom = 2, className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("w-full h-full", className)} {...props}>
        <MapContainer
          center={center}
          zoom={zoom}
          zoomControl={false}
          className="w-full h-full rounded-lg"
          style={{ height: "100%", width: "100%" }}
        >
          {children}
        </MapContainer>
      </div>
    )
  }
)
Map.displayName = "Map"

interface MapTileLayerProps {
  url?: string
  darkUrl?: string
  attribution?: string
}

const MapTileLayer = ({ 
  url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  darkUrl,
  attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}: MapTileLayerProps) => {
  const { theme } = React.useMemo(() => {
    if (typeof window !== "undefined") {
      const html = document.documentElement
      return { theme: html.classList.contains("dark") ? "dark" : "light" }
    }
    return { theme: "light" }
  }, [])

  const tileUrl = theme === "dark" && darkUrl ? darkUrl : url

  return (
    <TileLayer
      url={tileUrl}
      attribution={attribution}
    />
  )
}

interface MapMarkerProps {
  position: LatLngExpression
  children?: React.ReactNode
  icon?: L.Icon
}

const MapMarker = ({ position, children, icon }: MapMarkerProps) => {
  return (
    <Marker position={position} icon={icon}>
      {children}
    </Marker>
  )
}

interface MapPopupProps {
  children?: React.ReactNode
}

const MapPopup = ({ children }: MapPopupProps) => {
  return <Popup>{children}</Popup>
}

const MapZoomControl = () => {
  const map = useMap()
  return <ZoomControl position="bottomright" />
}

export { Map, MapTileLayer, MapMarker, MapPopup, MapZoomControl }
