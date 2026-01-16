import { useState } from "react"
import { useTheme } from "next-themes"
import Sidebar from "./sidebar"
import Header from "./header"
import MainContent from "./main-content"
import RightPanel from "./right-panel"

export default function Dashboard() {
  const { theme, setTheme } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          onNotificationClick={() => setNotificationsOpen(!notificationsOpen)}
          onThemeToggle={() => setTheme(theme === "dark" ? "light" : "dark")}
          theme={theme}
        />

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Main dashboard content */}
          <MainContent />

          {/* Right panel */}
          {notificationsOpen && <RightPanel onClose={() => setNotificationsOpen(false)} />}
        </div>
      </div>
    </div>
  )
}
