import { motion } from "framer-motion"
import { ChevronDown, ChevronRight, Home, FolderOpen, BookOpen, Users, Settings } from "lucide-react"
import { useState } from "react"

interface SidebarProps {
  open: boolean
  onToggle: () => void
  onNavigate?: (view: "default" | "ecommerce") => void
  activeView?: "default" | "ecommerce"
}

const navigationItems = [
  { icon: Home, label: "Overview", href: "#" },
  { icon: FolderOpen, label: "Projects", href: "#" },
]

const dashboardItems = [
  { icon: Home, label: "Default", id: "default" as const, shouldHighlight: true },
  { icon: BookOpen, label: "eCommerce", id: "ecommerce" as const, shouldHighlight: true },
  { icon: FolderOpen, label: "Projects", id: "default" as const, shouldHighlight: false },
  { icon: BookOpen, label: "Online Courses", id: "default" as const, shouldHighlight: false },
]

const userProfileItems = [
  { icon: Home, label: "Overview" },
  { icon: FolderOpen, label: "Projects" },
  { icon: BookOpen, label: "Campaigns" },
  { icon: BookOpen, label: "Documents" },
  { icon: Users, label: "Followers" },
]

const pageItems = [
  { icon: Settings, label: "Account" },
  { icon: Home, label: "Corporate" },
  { icon: BookOpen, label: "Blog" },
  { icon: Home, label: "Social" },
]

export default function Sidebar({ open, onToggle, onNavigate, activeView = "default" }: SidebarProps) {
  const [expandedFavories, setExpandedFavories] = useState(true)
  const [expandedUserProfile, setExpandedUserProfile] = useState(false)

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onToggle}
        />
      )}
      <motion.aside
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: open ? 200 : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`bg-sidebar border-r border-sidebar-border overflow-hidden z-50 ${
          open ? "fixed md:relative" : "fixed md:relative"
        } h-full max-md:shadow-lg`}
      >
      <div className="flex flex-col h-full overflow-y-auto">
        {/* Logo */}
        <div className="p-4 border-b border-sidebar-border">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <span className="text-sidebar-primary-foreground font-bold text-sm">B</span>
            </div>
            <span className="font-semibold text-sidebar-foreground">ByeWind</span>
          </motion.div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-6">
          {/* Favorites */}
          <div>
            <motion.button
              onClick={() => setExpandedFavories(!expandedFavories)}
              className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-sidebar-foreground uppercase tracking-wider hover:text-sidebar-primary transition-colors"
            >
              <span>Favorites</span>
              <motion.div animate={{ rotate: expandedFavories ? 0 : -90 }} className="text-sidebar-muted-foreground">
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </motion.button>
            <motion.div
              animate={{ opacity: expandedFavories ? 1 : 0, height: expandedFavories ? "auto" : 0 }}
              className="overflow-hidden space-y-1 mt-2"
            >
              {navigationItems.map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sidebar-accent text-sm text-sidebar-foreground transition-colors"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Dashboards */}
          <div>
            <div className="px-3 py-2 text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider">
              Dashboards
            </div>
            <motion.div className="space-y-1">
              {dashboardItems.map((item, i) => {
                const isActive = item.shouldHighlight && activeView === item.id
                return (
                  <motion.button
                    key={i}
                    onClick={() => onNavigate?.(item.id)}
                    whileHover={{ x: 4 }}
                    className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-60" />
                  </motion.button>
                )
              })}
            </motion.div>
          </div>

          {/* Pages */}
          <div>
            <div className="px-3 py-2 text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider">
              Pages
            </div>
            <motion.div className="space-y-1">
              {/* User Profile with dropdown */}
              <div>
                <motion.button
                  onClick={() => setExpandedUserProfile(!expandedUserProfile)}
                  whileHover={{ x: 4 }}
                  className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4" />
                    <span>User Profile</span>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedUserProfile ? 90 : 0 }}
                    className="text-sidebar-muted-foreground"
                  >
                    <ChevronRight className="w-4 h-4 opacity-60" />
                  </motion.div>
                </motion.button>
                <motion.div
                  animate={{ opacity: expandedUserProfile ? 1 : 0, height: expandedUserProfile ? "auto" : 0 }}
                  className="overflow-hidden space-y-1 ml-7 mt-1"
                >
                  {userProfileItems.map((item, i) => (
                    <motion.a
                      key={i}
                      href="#"
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </motion.a>
                  ))}
                </motion.div>
              </div>
              
              {/* Other page items */}
              {pageItems.map((item, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ x: 4 }}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-60" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </nav>
      </div>
      </motion.aside>
    </>
  )
}
