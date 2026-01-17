import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"

const data = [
  { month: "Jan", currentWeek: 12, previousWeek: 8 },
  { month: "Feb", currentWeek: 8, previousWeek: 16 },
  { month: "Mar", currentWeek: 9, previousWeek: 14 },
  { month: "Apr", currentWeek: 15, previousWeek: 10 },
  { month: "May", currentWeek: 19, previousWeek: 15 },
  { month: "Jun", currentWeek: 20, previousWeek: 22 },
]

const formatYAxis = (value: number) => {
  return `${value}M`
}

interface SalesChartProps {
  currentWeekValue?: string
  previousWeekValue?: string
}

export default function SalesChart({ currentWeekValue = "$58,211", previousWeekValue = "$68,768" }: SalesChartProps) {
  // Create data with null values to create a break in the current week line
  const chartData = data.map((item, index) => ({
    ...item,
    // Solid line for first 3 months, then dashed
    currentWeekSolid: index < 3 ? item.currentWeek : null,
    currentWeekDashed: index >= 2 ? item.currentWeek : null,
  }))

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="colorPreviousWeek" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="oklch(0.7 0.14 250)" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="oklch(0.7 0.14 250)" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
        <XAxis 
          dataKey="month" 
          stroke="hsl(var(--color-muted-foreground))"
          tick={{ fill: "hsl(var(--color-muted-foreground))", fontSize: 12 }}
        />
        <YAxis 
          stroke="hsl(var(--color-muted-foreground))" 
          domain={[0, 30]}
          tickFormatter={formatYAxis}
          ticks={[0, 10, 20, 30]}
          tick={{ fill: "hsl(var(--color-muted-foreground))", fontSize: 12 }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--color-card))",
            border: "1px solid hsl(var(--color-border))",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
          labelStyle={{ color: "hsl(var(--color-foreground))", fontWeight: 600 }}
        />
        <Area
          type="basis"
          dataKey="previousWeek"
          stroke="oklch(0.7 0.14 250)"
          strokeWidth={2.5}
          fill="url(#colorPreviousWeek)"
          dot={false}
          name={`Previous Week ${previousWeekValue}`}
        />
        {/* Solid line for Jan-Mar */}
        <Line
          type="basis"
          dataKey="currentWeekSolid"
          stroke="#000000"
          strokeWidth={3}
          dot={false}
          strokeDasharray="0 0"
          name={`Current Week ${currentWeekValue}`}
          connectNulls={false}
          activeDot={{ r: 4 }}
        />
        {/* Dashed line for Apr-Jun */}
        <Line
          type="basis"
          dataKey="currentWeekDashed"
          stroke="#000000"
          strokeWidth={3}
          dot={false}
          strokeDasharray="5 5"
          legendType="none"
          connectNulls={false}
          activeDot={{ r: 4 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
