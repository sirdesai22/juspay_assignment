import { motion } from "framer-motion"
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
      <div className="p-6 space-y-6">
        <motion.div>
          <h3 className="text-lg font-bold">Orders List</h3>
        </motion.div>
        {/* Header Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          {/* Left side - Action buttons */}
          <div className="flex items-center gap-3">
            <Button size="sm" variant="ghost" className="p-2">
              <Plus className="w-5 h-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost" className="p-2">
                  <Menu className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                  All Statuses
                </DropdownMenuItem>
                {statusOptions.map((status) => (
                  <DropdownMenuItem
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={statusFilter === status ? "bg-muted" : ""}
                  >
                    {status}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost" className="p-2">
                  <ArrowUpDown className="w-5 h-5" />
                </Button>
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
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
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
                {filteredAndSortedOrders.map((order, i) => (
                  <motion.tr
                    key={`${order.id}-${i}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`border-b border-border hover:bg-muted/30 transition-colors ${
                      selectedOrders.includes(`${order.id}-${i}`) ? "bg-muted/50" : ""
                    }`}
                  >
                    <td className="py-3 px-4">
                      <Checkbox
                        checked={selectedOrders.includes(`${order.id}-${i}`)}
                        onCheckedChange={() => toggleOrderSelection(`${order.id}-${i}`)}
                        className="data-[state=checked]:bg-black data-[state=checked]:border-black data-[state=checked]:text-white"
                      />
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-foreground">#{order.id}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={order.user.avatar}
                          alt={order.user.name}
                          className="w-8 h-8 rounded-full shrink-0 object-cover"
                        />
                        <span className="text-sm text-foreground">{order.user.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-foreground">{order.project}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-foreground">{order.address}</span>
                        {order.hasDocument && <FileText className="w-4 h-4 text-muted-foreground" />}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">{order.date}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${order.status.color}`}></div>
                        <span className={`text-sm ${order.status.textColor}`}>{order.status.label}</span>
                        {order.status.label === "Rejected" && i === 4 && (
                          <button className="ml-auto p-1 hover:bg-muted rounded">
                            <MoreVertical className="w-4 h-4 text-muted-foreground" />
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="border-t border-border px-6 py-4 flex">
            <div className="ml-auto">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">4</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">5</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.main>
  )
}
