import { motion } from "framer-motion"

const locations = [
  { name: "New York", value: "72k", top: "45%", left: "25%" },
  { name: "San Francisco", value: "39k", top: "35%", left: "15%" },
  { name: "Sydney", value: "25k", top: "75%", left: "65%" },
  { name: "Singapore", value: "61k", top: "65%", left: "55%" },
]

export default function WorldMap() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-card border border-border rounded-lg p-6"
    >
      <h3 className="text-lg font-semibold mb-4">Revenue by Location</h3>
      <div className="relative w-full h-64 bg-muted rounded-lg overflow-hidden">
        {/* Simplified world map SVG */}
        <svg viewBox="0 0 960 600" className="w-full h-full opacity-20" preserveAspectRatio="xMidYMid slice">
          <path
            d="M200,100 Q300,50 400,100 T600,100 Q700,150 750,200 L700,300 Q600,350 500,300 T300,350 Q200,300 150,250 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>

        {/* Location dots */}
        {locations.map((location, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="absolute"
            style={{ top: location.top, left: location.left, transform: "translate(-50%, -50%)" }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="w-3 h-3 bg-chart-1 rounded-full"
            />
          </motion.div>
        ))}

        {/* Location labels */}
        <div className="absolute inset-0 pointer-events-none">
          {locations.map((location, i) => (
            <motion.div
              key={`label-${i}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 + 0.3 }}
              className="absolute text-xs font-semibold text-foreground"
              style={{
                top: `calc(${location.top} + 20px)`,
                left: location.left,
                transform: "translateX(-50%)",
                whiteSpace: "nowrap",
              }}
            >
              <div>{location.name}</div>
              <div className="text-muted-foreground">{location.value}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
