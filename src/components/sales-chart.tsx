import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts"

const data = [
  { month: "Jan", currentWeek: 12, previousWeek: 8 },
  { month: "Feb", currentWeek: 8, previousWeek: 16 },
  { month: "Mar", currentWeek: 9, previousWeek: 14 },
  { month: "Apr", currentWeek: 15, previousWeek: 10 },
  { month: "May", currentWeek: 19, previousWeek: 15 },
  { month: "Jun", currentWeek: 20, previousWeek: 22 },
]

// Full data for the chart
const fullData = data

const formatYAxis = (value: number) => {
  return `${value}M`
}

export default function SalesChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={fullData}>
        <defs>
          <linearGradient id="colorPreviousWeek" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="oklch(0.7 0.14 250)" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="oklch(0.7 0.14 250)" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
        <XAxis dataKey="month" stroke="hsl(var(--color-muted-foreground))" />
        <YAxis 
          stroke="hsl(var(--color-muted-foreground))" 
          domain={[0, 30]}
          tickFormatter={formatYAxis}
          ticks={[0, 10, 20, 30]}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--color-card))",
            border: "1px solid hsl(var(--color-border))",
            borderRadius: "0.5rem",
          }}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="previousWeek"
          stroke="oklch(0.7 0.14 250)"
          strokeWidth={2}
          fill="url(#colorPreviousWeek)"
          dot={false}
          name="Previous Week $68,768"
        />
        {/* Solid line for Jan-Mar */}
        <Line
          type="monotone"
          dataKey="currentWeek"
          stroke="#000000"
          strokeWidth={2}
          dot={false}
          strokeDasharray="0 0"
          data={fullData.slice(0, 3)}
          name="Current Week $58,211"
          connectNulls={true}
        />
        {/* Dashed line for Apr-Jun, starting from Mar to connect */}
        <Line
          type="monotone"
          dataKey="currentWeek"
          stroke="#000000"
          strokeWidth={2}
          dot={false}
          strokeDasharray="5 5"
          data={fullData.slice(2)}
          legendType="none"
          connectNulls={true}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
