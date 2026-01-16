import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", currentWeek: 15000, previousWeek: 12000 },
  { month: "Feb", currentWeek: 18000, previousWeek: 14000 },
  { month: "Mar", currentWeek: 16000, previousWeek: 15000 },
  { month: "Apr", currentWeek: 22000, previousWeek: 18000 },
  { month: "May", currentWeek: 19000, previousWeek: 17000 },
  { month: "Jun", currentWeek: 25000, previousWeek: 21000 },
]

export default function SalesChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
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
        <Legend />
        <Line
          type="monotone"
          dataKey="currentWeek"
          stroke="hsl(var(--color-chart-1))"
          strokeWidth={2}
          dot={false}
          name="Current Week $58,211"
        />
        <Line
          type="monotone"
          dataKey="previousWeek"
          stroke="hsl(var(--color-chart-2))"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={false}
          name="Previous Week $68,768"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
