import { motion, AnimatePresence } from "framer-motion"
import { Plus, Menu, ArrowUpDown, Search, FileText, Calendar, MoreVertical } from "lucide-react"
import { Checkbox } from "./ui/checkbox"
import { Button } from "./ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { useState, useMemo } from "react"

type SortField = "id" | "user" | "project" | "date" | "status" | null
type SortOrder = "asc" | "desc"

const orders = [
  {
    id: "CM9801",
    user: { name: "Natali Craig", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Natali" },
    project: "Landing Page",
    address: "Meadow Lane Oakland",
    date: "Just now",
    status: { label: "In Progress", color: "bg-blue-200", textColor: "text-blue-700" },
  },
  {
    id: "CM9802",
    user: { name: "Kate Morrison", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kate" },
    project: "CRM Admin pages",
    address: "Larry San Francisco",
    date: "A minute ago",
    status: { label: "Complete", color: "bg-green-200", textColor: "text-green-700" },
  },
  {
    id: "CM9803",
    user: { name: "Drew Cano", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Drew" },
    project: "Client Project",
    address: "Bagwell Avenue Ocala",
    date: "1 hour ago",
    status: { label: "Pending", color: "bg-sky-200", textColor: "text-sky-700" },
  },
  {
    id: "CM9804",
    user: { name: "Orlando Diggs", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Orlando" },
    project: "Admin Dashboard",
    address: "Washburn Baton Rouge",
    date: "Yesterday",
    status: { label: "Approved", color: "bg-orange-200", textColor: "text-orange-700" },
  },
  {
    id: "CM9805",
    user: { name: "Andi Lane", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Andi" },
    project: "App Landing Page",
    address: "Nest Lane Olivette",
    date: "Feb 2, 2023",
    status: { label: "Rejected", color: "bg-gray-200", textColor: "text-gray-700" },
    hasDocument: true,
  },
  {
    id: "CM9801",
    user: { name: "Natali Craig", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Natali" },
    project: "Landing Page",
    address: "Meadow Lane Oakland",
    date: "Just now",
    status: { label: "In Progress", color: "bg-blue-200", textColor: "text-blue-700" },
  },
  {
    id: "CM9802",
    user: { name: "Kate Morrison", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kate" },
    project: "CRM Admin pages",
    address: "Larry San Francisco",
    date: "A minute ago",
    status: { label: "Complete", color: "bg-green-200", textColor: "text-green-700" },
  },
  {
    id: "CM9803",
    user: { name: "Drew Cano", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Drew" },
    project: "Client Project",
    address: "Bagwell Avenue Ocala",
    date: "1 hour ago",
    status: { label: "Pending", color: "bg-sky-200", textColor: "text-sky-700" },
  },
  {
    id: "CM9804",
    user: { name: "Orlando Diggs", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Orlando" },
    project: "Admin Dashboard",
    address: "Washburn Baton Rouge",
    date: "Yesterday",
    status: { label: "Approved", color: "bg-orange-200", textColor: "text-orange-700" },
  },
  {
    id: "CM9805",
    user: { name: "Andi Lane", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Andi" },
    project: "App Landing Page",
    address: "Nest Lane Olivette",
    date: "Feb 2, 2023",
    status: { label: "Rejected", color: "bg-gray-200", textColor: "text-gray-700" },
  },
]

export default function OrderList() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<SortField>(null)
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc")

  const toggleOrderSelection = (orderId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]
    )
  }

  const handleSort = (field: SortField) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("asc")
    }
  }

  const getDatePriority = (date: string): number => {
    if (date === "Just now") return 0
    if (date.includes("minute")) return 1
    if (date.includes("hour")) return 2
    if (date === "Yesterday") return 3
    return 4 // For dates like "Feb 2, 2023"
  }

  const filteredAndSortedOrders = useMemo(() => {
    let filtered = [...orders]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(query) ||
          order.user.name.toLowerCase().includes(query) ||
          order.project.toLowerCase().includes(query) ||
          order.address.toLowerCase().includes(query) ||
          order.status.label.toLowerCase().includes(query)
      )
    }

    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter((order) => order.status.label === statusFilter)
    }

    // Apply sorting
    if (sortBy) {
      filtered.sort((a, b) => {
        let comparison = 0
        switch (sortBy) {
          case "id":
            comparison = a.id.localeCompare(b.id)
            break
          case "user":
            comparison = a.user.name.localeCompare(b.user.name)
            break
          case "project":
            comparison = a.project.localeCompare(b.project)
            break
          case "date":
            comparison = getDatePriority(a.date) - getDatePriority(b.date)
            break
          case "status":
            comparison = a.status.label.localeCompare(b.status.label)
            break
        }
        return sortOrder === "asc" ? comparison : -comparison
      })
    }

    return filtered
  }, [searchQuery, statusFilter, sortBy, sortOrder])

  const statusOptions = ["In Progress", "Complete", "Pending", "Approved", "Rejected"]

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 overflow-y-auto bg-background"
    >
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-bold">Orders List</h3>
        </motion.div>
        {/* Header Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-0 mb-4 md:mb-6"
        >
          {/* Left side - Action buttons */}
          <div className="flex items-center gap-2 md:gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="sm" variant="ghost" className="p-2">
                <Plus className="w-5 h-5" />
              </Button>
            </motion.div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="sm" variant="ghost" className="p-2">
                    <Menu className="w-5 h-5" />
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                    All Statuses
                  </DropdownMenuItem>
                  {statusOptions.map((status, index) => (
                    <motion.div
                      key={status}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <DropdownMenuItem
                        onClick={() => setStatusFilter(status)}
                        className={statusFilter === status ? "bg-muted" : ""}
                      >
                        {status}
                      </DropdownMenuItem>
                    </motion.div>
                  ))}
                </motion.div>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="sm" variant="ghost" className="p-2">
                    <ArrowUpDown className="w-5 h-5" />
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => handleSort("id")}>
                  Order ID {sortBy === "id" && (sortOrder === "asc" ? "↑" : "↓")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort("user")}>
                  User {sortBy === "user" && (sortOrder === "asc" ? "↑" : "↓")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort("project")}>
                  Project {sortBy === "project" && (sortOrder === "asc" ? "↑" : "↓")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort("date")}>
                  Date {sortBy === "date" && (sortOrder === "asc" ? "↑" : "↓")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort("status")}>
                  Status {sortBy === "status" && (sortOrder === "asc" ? "↑" : "↓")}
                </DropdownMenuItem>
                {sortBy && (
                  <>
                    <DropdownMenuItem className="border-t border-border mt-1 pt-1" onClick={() => {
                      setSortBy(null)
                      setSortOrder("asc")
                    }}>
                      Clear Sort
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Right side - Search */}
          <motion.div
            className="relative w-full sm:w-auto sm:max-w-xs"
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              animate={{
                scale: searchQuery ? 1.1 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
            </motion.div>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-all"
            />
            <AnimatePresence>
              {searchQuery && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none"
                >
                  {filteredAndSortedOrders.length} results
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Order Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left py-3 px-4 w-12">
                    <Checkbox disabled className="data-[state=checked]:bg-black data-[state=checked]:border-black data-[state=checked]:text-white" />
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    User
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Project
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Address
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {filteredAndSortedOrders.map((order, i) => (
                    <motion.tr
                      key={`${order.id}-${i}`}
                      layout
                      initial={{ opacity: 0, x: -20, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 20, scale: 0.95 }}
                      transition={{ 
                        delay: Math.min(i * 0.03, 0.3),
                        layout: { duration: 0.3 }
                      }}
                      whileHover={{ 
                        scale: 1.01, 
                        x: 4,
                        transition: { duration: 0.2 }
                      }}
                      className={`border-b border-border transition-colors ${
                        selectedOrders.includes(`${order.id}-${i}`) ? "bg-muted/50" : ""
                      }`}
                    >
                      <td className="py-3 px-4">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Checkbox
                            checked={selectedOrders.includes(`${order.id}-${i}`)}
                            onCheckedChange={() => toggleOrderSelection(`${order.id}-${i}`)}
                            className="data-[state=checked]:bg-black data-[state=checked]:border-black data-[state=checked]:text-white"
                          />
                        </motion.div>
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-foreground">#{order.id}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <motion.img
                            src={order.user.avatar}
                            alt={order.user.name}
                            className="w-8 h-8 rounded-full shrink-0 object-cover"
                            whileHover={{ scale: 1.15, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          />
                          <span className="text-sm text-foreground">{order.user.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-foreground">{order.project}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-foreground">{order.address}</span>
                          {order.hasDocument && (
                            <motion.div
                              whileHover={{ scale: 1.2, rotate: 15 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <FileText className="w-4 h-4 text-muted-foreground" />
                            </motion.div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: -15 }}
                          >
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                          </motion.div>
                          <span className="text-sm text-foreground">{order.date}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <motion.div
                            className={`w-2 h-2 rounded-full ${order.status.color}`}
                            initial={false}
                            animate={{
                              scale: selectedOrders.includes(`${order.id}-${i}`) ? [1, 1.5, 1] : 1,
                            }}
                            transition={{ duration: 0.3 }}
                          ></motion.div>
                          <span className={`text-sm ${order.status.textColor}`}>{order.status.label}</span>
                          {order.status.label === "Rejected" && i === 4 && (
                            <motion.button
                              className="ml-auto p-1 hover:bg-muted rounded"
                              whileHover={{ scale: 1.2, rotate: 90 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <MoreVertical className="w-4 h-4 text-muted-foreground" />
                            </motion.button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="border-t border-border px-6 py-4 flex"
          >
            <div className="ml-auto">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <PaginationPrevious href="#" />
                    </motion.div>
                  </PaginationItem>
                  {[1, 2, 3, 4, 5].map((page) => (
                    <PaginationItem key={page}>
                      <motion.div
                        whileHover={{ scale: 1.15, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <PaginationLink href="#" isActive={page === 1}>
                          {page}
                        </PaginationLink>
                      </motion.div>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <PaginationNext href="#" />
                    </motion.div>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.main>
  )
}
