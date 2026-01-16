import { Bell, Moon, Sun, RotateCcw, Book, Grid2X2, Search } from "lucide-react"
import { motion } from "framer-motion"

interface HeaderProps {
  onNotificationClick: () => void
  onThemeToggle: () => void
  theme?: string
}

export default function Header({ onNotificationClick, onThemeToggle, theme }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-10"
    >
      <div className="flex items-center gap-4 flex-1">
        <div className="flex items-center gap-2">
          <Book className="w-5 h-5" />
          <span className="text-sm text-muted-foreground">Dashboards</span>
          <span className="text-sm">/</span>
          <span className="text-sm font-medium">Default</span>
        </div>
      </div>

      <div className="hidden md:flex flex-1 max-w-xs mx-4 relative items-center">
        <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-1 focus:ring-ring"
        />
      </div>

      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onThemeToggle}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNotificationClick}
          className="p-2 hover:bg-muted rounded-lg transition-colors relative"
        >
          <Bell className="w-5 h-5" />
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-1 right-1 w-2 h-2 bg-chart-1 rounded-full"
          />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <Grid2X2 className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.header>
  )
}
