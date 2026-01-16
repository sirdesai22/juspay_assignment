import { useState, useEffect } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import Dashboard from "@/components/dashboard"

export default function App() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <Dashboard />
    </ThemeProvider>
  )
}
