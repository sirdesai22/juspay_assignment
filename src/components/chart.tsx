import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useTheme } from "next-themes"

const data = [
  { month: "Jan", actuals: 15, projections: 5 },
  { month: "Feb", actuals: 19, projections: 5 },
  { month: "Mar", actuals: 17, projections: 4 },
  { month: "Apr", actuals: 21, projections: 6 },
  { month: "May", actuals: 14, projections: 4 },
  { month: "Jun", actuals: 17, projections: 7 },
]

const formatYAxis = (value: number) => {
  return `${value}M`
}

// Custom Tooltip Component
const CustomTooltip = (props: any) => {
  const { active, payload, label } = props
  
  if (!active || !payload || payload.length === 0 || !label) {
    return null
  }

  const actuals = payload.find((item: { dataKey?: string }) => item.dataKey === "actuals")?.value as number || 0
  const projections = payload.find((item: { dataKey?: string }) => item.dataKey === "projections")?.value as number || 0
  const total = actuals + projections

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="bg-card border border-border rounded-lg shadow-lg p-4 min-w-[200px]"
      style={{
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
    >
      <div className="font-semibold text-foreground mb-3 pb-2 border-b border-border">
        {label}
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-[#a8c5da]" />
            <span className="text-sm text-muted-foreground">Actuals</span>
          </div>
          <span className="text-sm font-semibold text-foreground">{actuals}M</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-[#a8c5da50]" />
            <span className="text-sm text-muted-foreground">Projections</span>
          </div>
          <span className="text-sm font-semibold text-foreground">{projections}M</span>
        </div>
        <div className="pt-2 mt-2 border-t border-border">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-medium text-foreground">Total</span>
            <span className="text-sm font-bold text-foreground">{total}M</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Chart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const tickColor = isDark ? "#ffffff" : "#000000"

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-lg shadow-sm p-4 md:p-6 bg-card"
    >
    
      <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Projections vs Actuals</h3>
      <ResponsiveContainer width="100%" height="100%" minHeight={200}>
        <BarChart data={data} barCategoryGap="25%">
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="hsl(var(--color-border))" 
            vertical={false}
            horizontal={true}
          />
          <XAxis 
            dataKey="month" 
            stroke="hsl(var(--color-muted-foreground))"
            tick={{ fill: tickColor, fontSize: 12 }}
            tickLine={true}
            axisLine={true}
          />
          <YAxis 
            stroke="hsl(var(--color-muted-foreground))" 
            domain={[0, 30]}
            tickFormatter={formatYAxis}
            ticks={[0, 10, 20, 30]}
            tick={{ fill: tickColor, fontSize: 12 }}
            tickLine={true}
            axisLine={true}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(168, 197, 218, 0.1)", stroke: "hsl(var(--color-border))", strokeWidth: 1 }}
            animationDuration={200}
          />
          <Bar 
            dataKey="actuals" 
            stackId="a"
            fill="#a8c5da" 
            radius={[0, 0, 0, 0]}
            barSize={30}
          />
          <Bar 
            dataKey="projections" 
            stackId="a"
            fill="#a8c5da50" 
            radius={[8, 8, 0, 0]}
            barSize={30}
          />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
