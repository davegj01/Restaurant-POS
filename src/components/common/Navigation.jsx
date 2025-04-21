"use client"

import { useNavigate } from "react-router-dom"
import { Home, FileText, Grid, LayoutDashboard, Settings } from "lucide-react"

const Navigation = ({ active }) => {
  const navigate = useNavigate()

  const navItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { id: "home", icon: Home, label: "Home", path: "/home" },
    { id: "orders", icon: FileText, label: "Orders", path: "/orders" },
    { id: "table", icon: Grid, label: "Table", path: "/table" },
    { id: "settings", icon: Settings, label: "Settings", path: "/dashboard" },
  ]

  return (
    <nav className="bg-gray-900 border-t border-gray-800 fixed bottom-0 left-0 right-0 z-10">
      <div className="flex justify-around items-center">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`flex flex-col items-center justify-center py-3 px-4 ${
              active === item.id ? "text-amber-500" : "text-gray-400"
            }`}
            onClick={() => navigate(item.path)}
          >
            <item.icon className="h-5 w-5 mb-1" />
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}

export default Navigation
