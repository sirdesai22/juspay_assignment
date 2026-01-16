import { motion } from "framer-motion"
import { Bug, UserPlus, Mic } from "lucide-react"

const notifications = [
  { id: 1, icon: Bug, title: "You have a bug that needs...", time: "Just now" },
  { id: 2, icon: UserPlus, title: "New user registered", time: "59 minutes ago" },
  { id: 3, icon: Bug, title: "You have a bug that needs...", time: "12 hours ago" },
  { id: 4, icon: Mic, title: "Andi Lane subscribed to you", time: "Today, 11:59 AM" },
]

const activities = [
  { id: 1, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John", title: "You have a bug that needs...", time: "Just now" },
  { id: 2, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", title: "Released a new version", time: "59 minutes ago" },
  { id: 3, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike", title: "Submitted a bug", time: "12 hours ago" },
  { id: 4, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily", title: "Modified A data in Page X", time: "Today, 11:59 AM" },
  { id: 5, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David", title: "Deleted a page in Project X", time: "Feb 2, 2023" },
]

const contacts = [
  { id: 1, name: "Natali Craig", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Natali" },
  { id: 2, name: "Drew Cano", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Drew" },
  { id: 3, name: "Orlando Diggs", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Orlando" },
  { id: 4, name: "Andi Lane", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Andi" },
  { id: 5, name: "Kate Morrison", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kate" },
  { id: 6, name: "Koray Okumus", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Koray" },
]

interface RightPanelProps {
  onClose?: () => void
}

export default function RightPanel({ onClose: _onClose }: RightPanelProps) {
  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 320, opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-card border-l border-border overflow-hidden flex flex-col"
    >
      {/* Header */}
      {/* <div className="border-b border-border px-6 py-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Panel</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-1 hover:bg-muted rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div> */}

      {/* Content - All sections one below the other */}
      <div className="flex-1 overflow-y-auto">
        {/* Notifications Section */}
        <div className="p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Notifications</h3>
          <div className="space-y-1">
            {notifications.map((notif, i) => {
              const IconComponent = notif.icon
              return (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ backgroundColor: "hsl(var(--color-muted) / 0.5)" }}
                  className="p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="flex gap-3 items-center">
                    <div className="shrink-0 p-2 bg-muted rounded-full">
                      <IconComponent className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{notif.title}</p>
                      <p className="text-xs text-muted-foreground">{notif.time}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Activities Section */}
        <div className="p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Activities</h3>
          <div className="space-y-4">
            {activities.map((activity, i) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <motion.div
                  whileHover={{ backgroundColor: "hsl(var(--color-muted) / 0.5)" }}
                  className="p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="flex gap-3">
                    <img 
                      src={activity.avatar} 
                      alt="User avatar" 
                      className="w-8 h-8 rounded-full shrink-0 object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contacts Section */}
        <div className="p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Contacts</h3>
          <div className="space-y-2">
            {contacts.map((contact, i) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ backgroundColor: "hsl(var(--color-muted) / 0.5)" }}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <img 
                  src={contact.avatar} 
                  alt={contact.name} 
                  className="w-8 h-8 rounded-full shrink-0 object-cover"
                />
                <p className="text-sm font-medium">{contact.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
