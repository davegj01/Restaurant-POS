"use client"

import { useNavigate } from "react-router-dom"
import { useApp, ENVIRONMENTS } from "../context/AppContext"
import Header from "../common/Header"
import { Utensils, Truck, ShoppingBag } from "lucide-react"

const DashboardPage = ({ onLogout }) => {
  const navigate = useNavigate()
  const { changeEnvironment } = useApp()

  const handleEnvironmentSelect = (environment) => {
    changeEnvironment(environment)
    navigate("/home")
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header onLogout={onLogout} />

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-bold text-white mb-12 text-center">How Would You Like To Order?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {/* Dine In (Waiter) */}
          <button
            className="bg-amber-500 hover:bg-amber-600 transition-colors rounded-lg p-8 flex flex-col items-center justify-center aspect-square"
            onClick={() => handleEnvironmentSelect(ENVIRONMENTS.WAITER)}
          >
            <Utensils className="h-16 w-16 text-black mb-4" />
            <span className="text-black text-xl font-medium">Dine In</span>
          </button>

          {/* Delivery */}
          <button
            className="bg-amber-500 hover:bg-amber-600 transition-colors rounded-lg p-8 flex flex-col items-center justify-center aspect-square"
            onClick={() => handleEnvironmentSelect(ENVIRONMENTS.DELIVERY)}
          >
            <Truck className="h-16 w-16 text-black mb-4" />
            <span className="text-black text-xl font-medium">Delivery</span>
          </button>

          {/* Take Out (Takeaway) */}
          <button
            className="bg-amber-500 hover:bg-amber-600 transition-colors rounded-lg p-8 flex flex-col items-center justify-center aspect-square"
            onClick={() => handleEnvironmentSelect(ENVIRONMENTS.TAKEAWAY)}
          >
            <ShoppingBag className="h-16 w-16 text-black mb-4" />
            <span className="text-black text-xl font-medium">Take Out</span>
          </button>
        </div>
      </main>
    </div>
  )
}

export default DashboardPage
