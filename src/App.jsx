"use client"

import { useState } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AppProvider } from "../src/components/context/AppContext"
import LoginPage from "../src/components/pages/LoginPage"
import DashboardPage from "../src/components/pages/DashboardPage"
import HomePage from "../src/components/pages/HomePage"
import OrdersPage from "../src/components/pages/OrdersPage"
import TablePage from "../src/components/pages/TablePage"
import OrderDetailPage from "../src/components/pages/OrderDetailPage"

import "./index.css"


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    console.log("Login successful, setting isLoggedIn to true")
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  console.log("Current isLoggedIn state:", isLoggedIn)

  return (
    <div className="min-h-screen">
      {isLoggedIn ? (
        <AppProvider>
          <Router>
            <Routes>
              <Route path="/dashboard" element={<DashboardPage onLogout={handleLogout} />} />
              <Route path="/home" element={<HomePage onLogout={handleLogout} />} />
              <Route path="/orders" element={<OrdersPage onLogout={handleLogout} />} />
              <Route path="/table" element={<TablePage onLogout={handleLogout} />} />
              <Route path="/order/:orderId" element={<OrderDetailPage onLogout={handleLogout} />} />
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </Router>
        </AppProvider>
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  )
}

export default App
