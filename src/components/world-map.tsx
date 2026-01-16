import { motion } from "framer-motion"
import { Map, MapTileLayer, MapMarker } from "@/components/ui/map"
import L from "leaflet"

// Custom dark grey marker icon
const createCustomIcon = () => {
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="width: 6px; height: 6px; background-color: #666; border-radius: 50%;"></div>`,
    iconSize: [6, 6],
    iconAnchor: [3, 3],
  })
}

const locations = [
  { name: "New York", value: 72, coordinates: [40.7128, -74.006] as [number, number] },
  { name: "San Francisco", value: 39, coordinates: [37.7749, -122.4194] as [number, number] },
  { name: "Sydney", value: 25, coordinates: [-33.8688, 151.2093] as [number, number] },
  { name: "Singapore", value: 61, coordinates: [1.3521, 103.8198] as [number, number] },
]

const maxValue = Math.max(...locations.map(l => l.value))

export default function WorldMap() {
  const customIcon = createCustomIcon()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-card border border-border rounded-lg p-6 h-full flex flex-col"
    >
      <h3 className="text-lg font-semibold mb-4">Revenue by Location</h3>
      <div className="relative w-full flex-1 min-h-[200px] bg-[oklch(0.95_0.02_250)] rounded-lg overflow-hidden mb-4">
        <Map center={[20, 0]} zoom={1} className="h-full" minZoom={1} maxZoom={10}>
          <MapTileLayer 
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          {locations.map((location, i) => (
            <MapMarker key={i} position={location.coordinates} icon={customIcon} />
          ))}
        </Map>
      </div>

      {/* Location list with horizontal bars */}
      <div className="space-y-3">
        {locations.map((location, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-foreground">{location.name}</span>
                <span className="text-sm font-semibold text-foreground">{location.value}K</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(location.value / maxValue) * 100}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="h-full bg-[oklch(0.62_0.18_250)] rounded-full"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
