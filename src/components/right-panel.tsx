import { motion } from "framer-motion"
import { X } from "lucide-react"
import { useState } from "react"

const notifications = [
  { id: 1, icon: "🐛", title: "You have a bug that needs...", time: "Just now" },
  { id: 2, icon: "👤", title: "New user registered", time: "59 minutes ago" },
  { id: 3, icon: "🐛", title: "You have a bug that needs...", time: "12 hours ago" },
  { id: 4, icon: "🎙️", title: "Andi Lane subscribed to you", time: "Today, 11:59 AM" },
]

const activities = [
  { id: 1, icon: "👤", title: "You have a bug that needs...", time: "Just now" },
  { id: 2, icon: "📦", title: "Released a new version", time: "59 minutes ago" },
  { id: 3, icon: "🐛", title: "Submitted a bug", time: "12 hours ago" },
  { id: 4, icon: "✏️", title: "Modified A data in Page X", time: "Today, 11:59 AM" },
  { id: 5, icon: "🗑️", title: "Deleted a page in Project X", time: "Feb 2, 2023" },
]

const contacts = [
  { id: 1, name: "Natali Craig", avatar: "👩" },
  { id: 2, name: "Drew Cano", avatar: "👨" },
  { id: 3, name: "Orlando Diggs", avatar: "👨" },
  { id: 4, name: "Andi Lane", avatar: "👩" },
  { id: 5, name: "Kate Morrison", avatar: "👩" },
  { id: 6, name: "Koray Okumus", avatar: "👨" },
]

export default function RightPanel() {
  const [activeTab, setActiveTab] = useState<"notifications" | "activities" | "contacts">("notifications")

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 320, opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-card border-l border-border overflow-hidden flex flex-col"
    >
      {/* Header */}
      <div className="border-b border-border px-6 py-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Panel</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-1 hover:bg-muted rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border">
        {(["notifications", "activities", "contacts"] as const).map((tab) => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "text-foreground border-b-2 border-chart-1"
                : "text-muted-foreground hover:text-foreground"
            }`}
            whileHover={{ backgroundColor: "hsl(var(--color-muted) / 0.3)" }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "notifications" && (
          <motion.div className="space-y-1 p-4">
            {notifications.map((notif, i) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ backgroundColor: "hsl(var(--color-muted) / 0.5)" }}
                className="p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="flex gap-3">
                  <div className="text-xl flex-shrink-0">{notif.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{notif.title}</p>
                    <p className="text-xs text-muted-foreground">{notif.time}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === "activities" && (
          <motion.div className="space-y-1 p-4">
            {activities.map((activity, i) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ backgroundColor: "hsl(var(--color-muted) / 0.5)" }}
                className="p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="flex gap-3">
                  <div className="text-xl flex-shrink-0">{activity.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === "contacts" && (
          <motion.div className="space-y-2 p-4">
            {contacts.map((contact, i) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ backgroundColor: "hsl(var(--color-muted) / 0.5)" }}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-lg flex-shrink-0">
                  {contact.avatar}
                </div>
                <p className="text-sm font-medium">{contact.name}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
