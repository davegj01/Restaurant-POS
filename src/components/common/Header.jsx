"use client"

import { useState } from "react"
import { Search, Bell, LogOut } from "lucide-react"
import { useApp } from "../context/AppContext"
import { useNavigate } from "react-router-dom"

const Header = ({ onLogout }) => {
  const { currentUser } = useApp()
  const [notificationCount] = useState(3)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const navigate = useNavigate()

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout()
    }
  }

  const handleLogoClick = () => {
    navigate("/dashboard")
  }

  return (
    <header className="bg-gray-900 p-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
        <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-2">
          <span className="text-amber-500 text-sm font-bold">ZC</span>
        </div>
        <span className="text-white text-sm font-medium">zesty-cafe</span>
      </div>

      {/* Search bar */}
      <div className="flex-1 mx-4 relative max-w-md">
        <input
          type="text"
          placeholder="Search here"
          className="w-full bg-gray-800 text-white rounded-md py-2 pl-9 pr-4 text-sm focus:outline-none"
        />
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      </div>

      {/* User profile */}
      <div className="flex items-center">
        {/* Notification bell */}
        <div className="relative mr-4">
          <Bell className="h-5 w-5 text-gray-400" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogoutClick}
          className="mr-4 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-md px-3 py-1.5 text-sm transition-colors"
        >
          <LogOut className="h-4 w-4 mr-1" />
          <span>Logout</span>
        </button>

        {/* User avatar and name */}
        <div className="flex items-center relative">
          <div className="flex items-center cursor-pointer" onClick={() => setShowUserMenu(!showUserMenu)}>
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-2">
              <img src="/placeholder.svg?height=32&width=32" alt="User" className="w-8 h-8 rounded-full" />
            </div>
            <div className="flex flex-col">
              <span className="text-white text-sm">{currentUser.name}</span>
              <span className="text-gray-400 text-xs">{currentUser.role}</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

