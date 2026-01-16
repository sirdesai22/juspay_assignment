import { motion } from "framer-motion"
import StatCard from "./stat-card"
import Chart from "./chart"
import WorldMap from "./world-map"
import ProductsTable from "./products-table"
import SalesChart from "./sales-chart"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export default function MainContent() {
  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex-1 overflow-y-auto bg-background"
    >
      <div className="p-6 space-y-6">
        {/* Title */}
        <motion.div variants={itemVariants}>
          <h1 className="text-2xl font-bold">eCommerce</h1>
        </motion.div>

        {/* Stat Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Customers" value="3,781" change="+11.01%" trend="up" />
          <StatCard title="Orders" value="1,219" change="-0.03%" trend="down" />
          <StatCard title="Revenue" value="$695" change="+15.03%" trend="up" />
          <StatCard title="Growth" value="30.1%" change="+6.08%" trend="up" />
        </motion.div>

        {/* Charts Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Chart />
          </div>
          <div>
            <WorldMap />
          </div>
        </motion.div>

        {/* Revenue Chart */}
        <motion.div variants={itemVariants}>
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold mb-4">Revenue</h3>
            <SalesChart />
          </div>
        </motion.div>

        {/* Products and Sales */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ProductsTable />
          </div>
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card rounded-lg border border-border p-6"
            >
              <h3 className="text-lg font-semibold mb-4">Total Sales</h3>
              <div className="flex items-center justify-center h-64">
                <svg width="200" height="200" viewBox="0 0 200 200" className="transform -rotate-90">
                  {/* Donut Chart */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="hsl(var(--color-chart-1))"
                    strokeWidth="25"
                    strokeDasharray="126 314"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="hsl(var(--color-chart-2))"
                    strokeWidth="25"
                    strokeDasharray="79 314"
                    strokeDashoffset="-126"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="hsl(var(--color-chart-4))"
                    strokeWidth="25"
                    strokeDasharray="50 314"
                    strokeDashoffset="-205"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="hsl(var(--color-chart-6))"
                    strokeWidth="25"
                    strokeDasharray="59 314"
                    strokeDashoffset="-255"
                  />
                </svg>
                <div className="absolute text-center">
                  <div className="text-2xl font-bold">38.6%</div>
                  <div className="text-xs text-muted-foreground">Direct</div>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(var(--color-chart-1))" }} />
                    <span>Direct</span>
                  </div>
                  <span className="font-semibold">$300.56</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(var(--color-chart-2))" }} />
                    <span>Affiliate</span>
                  </div>
                  <span className="font-semibold">$135.18</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(var(--color-chart-4))" }} />
                    <span>Sponsored</span>
                  </div>
                  <span className="font-semibold">$154.02</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(var(--color-chart-6))" }} />
                    <span>E-mail</span>
                  </div>
                  <span className="font-semibold">$48.96</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.main>
  )
}
