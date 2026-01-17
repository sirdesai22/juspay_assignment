import { motion } from "framer-motion";
import { useState } from "react";
import StatCard from "./stat-card";
import Chart from "./chart";
import WorldMap from "./world-map";
import ProductsTable from "./products-table";
import SalesChart from "./sales-chart";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function MainContent() {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null)

  const segmentData = {
    Direct: { percentage: "38.6%", color: "#4a5568" },
    Affiliate: { percentage: "21.2%", color: "#68d391" },
    Sponsored: { percentage: "24.1%", color: "#63b3ed" },
    Email: { percentage: "16.1%", color: "#b794f4" },
  }

  const displayPercentage = hoveredSegment 
    ? segmentData[hoveredSegment as keyof typeof segmentData]?.percentage || ""
    : ""

  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex-1 overflow-y-auto bg-background"
    >
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Title */}
        <motion.div variants={itemVariants}>
          <h3 className="text-lg font-bold">eCommerce</h3>
        </motion.div>

        {/* Stat Cards and Bar Chart */}
        <motion.div
          variants={itemVariants}
          className="flex gap-6 flex-col lg:flex-row w-full"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 w-full lg:w-auto lg:min-w-[400px] xl:min-w-[500px] lg:shrink-0">
            <StatCard
              title="Customers"
              value="3,781"
              change="+11.01%"
              trend="up"
              color="var(--stat-card1)"
            />
            <StatCard
              title="Orders"
              value="1,219"
              change="-0.03%"
              trend="down"
              color="var(--stat-card2)"
            />
            <StatCard
              title="Revenue"
              value="$695"
              change="+15.03%"
              trend="up"
              color="var(--stat-card2)"
            />
            <StatCard
              title="Growth"
              value="30.1%"
              change="+6.08%"
              trend="up"
              color="var(--stat-card3)"
            />
          </div>
          <div className="w-full lg:flex-[2] lg:min-w-0 min-h-[250px] lg:min-h-0">
            <Chart />
          </div>
        </motion.div>

        {/* Revenue Chart and World Map */}
        <motion.div
          variants={itemVariants}
          className="flex gap-6 flex-col lg:flex-row"
        >
          <div className="flex-1 lg:flex-[2] min-w-0">
            <div className="rounded-lg shadow-sm p-4 md:p-6 h-full flex flex-col bg-card">
              <div className="flex flex-col sm:flex-row sm:items-center mb-4 gap-3 sm:gap-0">
                <h3 className="text-lg font-semibold">Revenue</h3>
                <div className="h-px w-full sm:h-6 sm:w-px bg-border sm:mx-4 block sm:block"></div>
                {/* Stats beside title */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 sm:ml-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-foreground rounded-full"></div>
                    <div className="flex gap-2">
                      <p className="text-sm text-muted-foreground">
                        Current Week
                      </p>
                      <p className="text-sm font-semibold text-foreground">
                        $58,211
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[oklch(0.7_0.14_250)] rounded-full"></div>
                    <div className="flex gap-2">
                      <p className="text-sm text-muted-foreground">
                        Previous Week
                      </p>
                      <p className="text-sm font-semibold text-foreground">
                        $68,768
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 min-h-[250px] md:min-h-[300px]">
                <SalesChart
                  currentWeekValue="$58,211"
                  previousWeekValue="$68,768"
                />
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="h-full">
              <WorldMap />
            </div>
          </div>
        </motion.div>

        {/* Products and Sales */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <div className="lg:col-span-2 h-full">
            <ProductsTable />
          </div>
          <div className="h-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-lg shadow-sm p-6 h-full flex flex-col bg-card"
            >
              <h3 className="text-lg font-semibold mb-4">Total Sales</h3>
              <div className="relative flex items-center justify-center flex-1 min-h-[200px] mb-4">
                <svg
                  width="200"
                  height="200"
                  viewBox="0 0 200 200"
                  className="transform -rotate-90"
                >
                  {/* Donut Chart - Full circle with segments (circumference ≈ 502.65) */}
                  {/* Direct (Dark grey/black) - 38.6% */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#4a5568"
                    strokeWidth="25"
                    strokeDasharray="194 308.65"
                    strokeDashoffset="0"
                    strokeLinecap="round"
                    onMouseEnter={() => setHoveredSegment("Direct")}
                    onMouseLeave={() => setHoveredSegment(null)}
                    className="cursor-pointer transition-opacity hover:opacity-80"
                  />
                  {/* Affiliate (Light green) - 21.2% */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#68d391"
                    strokeWidth="25"
                    strokeDasharray="106.5 396.15"
                    strokeDashoffset="-194"
                    strokeLinecap="round"
                    onMouseEnter={() => setHoveredSegment("Affiliate")}
                    onMouseLeave={() => setHoveredSegment(null)}
                    className="cursor-pointer transition-opacity hover:opacity-80"
                  />
                  {/* Sponsored (Light blue) - 24.1% */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#63b3ed"
                    strokeWidth="25"
                    strokeDasharray="121.1 381.55"
                    strokeDashoffset="-300.5"
                    strokeLinecap="round"
                    onMouseEnter={() => setHoveredSegment("Sponsored")}
                    onMouseLeave={() => setHoveredSegment(null)}
                    className="cursor-pointer transition-opacity hover:opacity-80"
                  />
                  {/* E-mail (Light purple) - 16.1% */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#b794f4"
                    strokeWidth="25"
                    strokeDasharray="81 421.65"
                    strokeDashoffset="-421.6"
                    strokeLinecap="round"
                    onMouseEnter={() => setHoveredSegment("Email")}
                    onMouseLeave={() => setHoveredSegment(null)}
                    className="cursor-pointer transition-opacity hover:opacity-80"
                  />
                </svg>
                {hoveredSegment && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-[#2d5016] text-white px-3 py-1.5 rounded text-sm font-semibold transition-all">
                      {displayPercentage}
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-2.5 text-sm mt-auto">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#4a5568]" />
                    <span className="text-foreground">Direct</span>
                  </div>
                  <span className="font-semibold text-foreground">$300.56</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#68d391]" />
                    <span className="text-foreground">Affiliate</span>
                  </div>
                  <span className="font-semibold text-foreground">$135.18</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#63b3ed]" />
                    <span className="text-foreground">Sponsored</span>
                  </div>
                  <span className="font-semibold text-foreground">$154.02</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#b794f4]" />
                    <span className="text-foreground">E-mail</span>
                  </div>
                  <span className="font-semibold text-foreground">$48.96</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}
