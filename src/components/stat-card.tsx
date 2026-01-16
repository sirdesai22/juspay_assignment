import { color, motion } from "framer-motion"
import { TrendingUp, TrendingDown } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
}

export default function StatCard({ title, value, change, trend, color }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`bg-card rounded-lg p-5 backdrop-blur-sm hover:shadow-lg shadow-sm transition-shadow w-full`} style={{ backgroundColor: color }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <p className="text-sm font-medium text-muted-foreground mb-2">{title}</p>
        <div className="flex items-end justify-between">
          <h3 className="text-3xl font-bold text-foreground">{value}</h3>
          <motion.div
            animate={{ y: trend === "up" ? -4 : 4 }}
            className={`flex items-center gap-1 ${trend === "up" ? "text-chart-1" : "text-destructive"}`}
          >
            {trend === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="text-sm font-semibold">{change}</span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
