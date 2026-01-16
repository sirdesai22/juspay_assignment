import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", value: 12 },
  { month: "Feb", value: 15 },
  { month: "Mar", value: 14 },
  { month: "Apr", value: 18 },
  { month: "May", value: 13 },
  { month: "Jun", value: 20 },
]

export default function Chart() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-card border border-border rounded-lg p-6"
    >
      <h3 className="text-lg font-semibold mb-4">Projections vs Actuals</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
          <XAxis dataKey="month" stroke="hsl(var(--color-muted-foreground))" />
          <YAxis stroke="hsl(var(--color-muted-foreground))" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--color-card))",
              border: "1px solid hsl(var(--color-border))",
              borderRadius: "0.5rem",
            }}
          />
          <Bar dataKey="value" fill="hsl(var(--color-chart-2))" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
