import { motion } from "framer-motion"
import { TrendingUp, TrendingDown } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  color?: string
  isLight?: boolean
}

export default function StatCard({ title, value, change, trend, color, isLight = false }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`bg-card rounded-lg p-5 backdrop-blur-sm hover:shadow-lg shadow-sm transition-shadow w-full flex items-center justify-between`}
      style={{ backgroundColor: color }}
    >
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="w-full">
        <p className={`text-sm ${isLight ? "text-black" : "text-foreground"} font-semibold mb-2`}>{title}</p>
        <div className="flex items-end w-full">
          <h3 className={`text-3xl font-bold ${isLight ? "text-black" : "text-foreground"} flex-1`}>{value}</h3>
          <motion.div
            animate={{ y: trend === "up" ? -4 : 4 }}
            className="flex items-center gap-2 sm:gap-3 md:gap-4 ml-6"
          >
            {trend === "up" ? <TrendingUp className={`w-4 h-4 ${isLight ? "text-black" : "text-white"}`} /> : <TrendingDown className={`w-4 h-4 ${isLight ? "text-black" : "text-white"}`} />}
            <span className={`text-sm font-semibold ${isLight ? "text-black" : "text-white"}`}>{change}</span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
