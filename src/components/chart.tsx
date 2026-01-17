import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

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

export default function Chart() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-lg shadow-sm p-4 md:p-6"
      style={{ backgroundColor: '#f7f9fb' }}
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
            tickLine={true}
            axisLine={true}
          />
          <YAxis 
            stroke="hsl(var(--color-muted-foreground))" 
            domain={[0, 30]}
            tickFormatter={formatYAxis}
            ticks={[0, 10, 20, 30]}
            tickLine={true}
            axisLine={true}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--color-card))",
              border: "1px solid hsl(var(--color-border))",
              borderRadius: "0.5rem",
            }}
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
            fill="#cfdfeb" 
            radius={[8, 8, 0, 0]}
            barSize={30}
          />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
