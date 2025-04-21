"use client"

import { useState } from "react"
import { useApp, ENVIRONMENTS } from "../context/AppContext"
import { ChevronDown, User, Truck, ShoppingBag } from "lucide-react"

const EnvironmentSelector = () => {
  const { currentEnvironment, changeEnvironment } = useApp()
  const [isOpen, setIsOpen] = useState(false)

  const environments = [
    { id: ENVIRONMENTS.WAITER, name: "Meseros", icon: <User className="h-4 w-4" /> },
    { id: ENVIRONMENTS.DELIVERY, name: "Delivery", icon: <Truck className="h-4 w-4" /> },
    { id: ENVIRONMENTS.TAKEAWAY, name: "Domicilio", icon: <ShoppingBag className="h-4 w-4" /> },
  ]

  const getCurrentEnvironment = () => {
    return environments.find((env) => env.id === currentEnvironment) || environments[0]
  }

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-2 bg-gray-800 rounded-md px-3 py-2 text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {getCurrentEnvironment().icon}
        <span>{getCurrentEnvironment().name}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-gray-800 rounded-md shadow-lg overflow-hidden z-50">
          {environments.map((env) => (
            <button
              key={env.id}
              className={`w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-gray-700 ${
                currentEnvironment === env.id ? "bg-gray-700 text-white" : "text-gray-300"
              }`}
              onClick={() => {
                changeEnvironment(env.id)
                setIsOpen(false)
              }}
            >
              {env.icon}
              <span>{env.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default EnvironmentSelector

