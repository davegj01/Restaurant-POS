"use client"

import { useState, useEffect } from "react"
import Header from "../common/Header"
import Navigation from "../common/Navigation"
import StatusCard from "../home/StatusCard"
import PopularDishCard from "../home/PopularDishCard"
import OrderCard from "../home/OrderCard"
import ActionButton from "../common/ActionButton"
import { Search, Plus } from "lucide-react"
import { useApp, ENVIRONMENTS } from "../context/AppContext"
import CreateOrderModal from "../orders/CreateOrderModal"
import { useNavigate } from "react-router-dom"



const HomePage = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("inProgress")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const { currentEnvironment, currentUser, orders } = useApp()
  const navigate = useNavigate()

  // Filtrar órdenes según el estado
  const inProgressOrders = orders.filter((order) => order.status === "inProgress" || order.status === "ready")

  const waitingOrders = orders.filter((order) => order.status === "waiting" || order.status === "completed")

  // Datos específicos según el ambiente
  const environmentData = {
    [ENVIRONMENTS.WAITER]: {
      greeting: "Good Morning, " + currentUser.name,
      subtext: "Give your best services for customers! 👋",
      stats: [
        {
          title: "In Progress",
          count: inProgressOrders.length,
          change: "+21% than yesterday",
          color: "amber",
        },
        {
          title: "Waiting List",
          count: waitingOrders.length,
          change: "-10% than yesterday",
          color: "blue",
        },
      ],
    },
  }

  // Datos comunes para todos los ambientes
  const popularDishes = [
    {
      id: "01",
      name: "Southwest Scramble Bowl",
      orders: 26,
      available: true,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "02",
      name: "Hickory Smoked Bacon",
      orders: 24,
      available: true,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "03",
      name: "Chicken Tender Plate",
      orders: 23,
      available: true,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "04",
      name: "Grilled Chicken Sandwich",
      orders: 22,
      available: true,
      image: "/placeholder.svg?height=60&width=60",
    },
    { id: "05", name: "BBQ Bacon Burger", orders: 22, available: true, image: "/placeholder.svg?height=60&width=60" },
  ]

  const outOfStockDishes = [
    {
      id: "01",
      name: "Breakfast Burger",
      available: "Available • 12:00 PM",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "02",
      name: "Fried Fish Sandwich",
      available: "Available • 02:00 PM",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "03",
      name: "Shrimp & Grits",
      available: "Available • Tomorrow",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "04",
      name: "Chicken Tender Salad",
      available: "Available • Tomorrow",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "05",
      name: "Veggie Omelette",
      available: "Available • Tomorrow",
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  // Obtener datos según el ambiente actual
  const currentData = environmentData[currentEnvironment]

  const getCurrentTime = () => {
    const now = new Date()
    const hours = now.getHours().toString().padStart(2, "0")
    const minutes = now.getMinutes().toString().padStart(2, "0")
    const seconds = now.getSeconds().toString().padStart(2, "0")
    return `${hours}:${minutes}:${seconds}`
  }

  const [currentTime, setCurrentTime] = useState(getCurrentTime())

  // Actualizar el tiempo cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTime())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleOrderClick = (orderId) => {
    navigate(`/order/${orderId}`)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <Header onLogout={onLogout} />

      {/* Hero section */}
      <div className="px-4 py-3 flex justify-between items-center">
        <div>
          <h1 className="text-white text-xl font-medium">{currentData.greeting}</h1>
          <p className="text-gray-400 text-sm">{currentData.subtext}</p>
        </div>
        <div className="text-white text-xl font-medium">{currentTime}</div>
      </div>

      {/* Stats */}
      <div className="px-4 py-2 grid grid-cols-2 gap-3">
        {currentData.stats.map((stat) => (
          <StatusCard key={stat.title} title={stat.title} count={stat.count} change={stat.change} color={stat.color} />
        ))}
      </div>

      {/* Popular dishes */}
      <div className="px-4 py-2">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-white text-lg font-medium">Popular Dishes</h2>
          <button className="text-amber-500 text-sm">View All</button>
        </div>

        <div className="flex overflow-x-auto space-x-3 pb-2">
          {popularDishes.map((dish) => (
            <PopularDishCard key={dish.id} id={dish.id} name={dish.name} orders={dish.orders} image={dish.image} />
          ))}
        </div>
      </div>

      {/* Out of stock */}
      <div className="px-4 py-2">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-white text-lg font-medium">Out of Stock</h2>
          <button className="text-amber-500 text-sm">View All</button>
        </div>

        <div className="flex overflow-x-auto space-x-3 pb-2">
          {outOfStockDishes.map((dish) => (
            <PopularDishCard
              key={dish.id}
              id={dish.id}
              name={dish.name}
              available={dish.available}
              image={dish.image}
              outOfStock
            />
          ))}
        </div>
      </div>

      {/* Orders */}
      <div className="px-4 py-2 flex-1 overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-3">
          <div className="flex space-x-4">
            <button
              className={`text-sm font-medium ${activeTab === "inProgress" ? "text-white" : "text-gray-400"}`}
              onClick={() => setActiveTab("inProgress")}
            >
              In Progress
            </button>
            <button
              className={`text-sm font-medium ${activeTab === "waiting" ? "text-white" : "text-gray-400"}`}
              onClick={() => setActiveTab("waiting")}
            >
              Waiting for Payment
            </button>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search a Order"
              className="bg-gray-800 text-white text-sm rounded-md pl-8 pr-3 py-1.5 w-40 focus:outline-none"
            />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
        </div>

        <div className="overflow-y-auto flex-1">
          {activeTab === "inProgress" && (
            <div className="space-y-2">
              {inProgressOrders.map((order) => (
                <div key={order.id} onClick={() => handleOrderClick(order.id)} className="cursor-pointer">
                  <OrderCard
                    id={order.id}
                    name={order.name}
                    items={order.items.length}
                    status={order.status}
                    statusText={order.statusText}
                    detail={order.detail}
                  />
                </div>
              ))}
              {inProgressOrders.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-400">No hay órdenes en progreso</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "waiting" && (
            <div className="space-y-2">
              {waitingOrders.map((order) => (
                <div key={order.id} onClick={() => handleOrderClick(order.id)} className="cursor-pointer">
                  <OrderCard
                    id={order.id}
                    name={order.name}
                    items={order.items.length}
                    status={order.status}
                    statusText={order.statusText}
                    detail={order.detail}
                  />
                </div>
              ))}
              {waitingOrders.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-400">No hay órdenes en espera de pago</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Navigation active="home" />
      <ActionButton icon={<Plus className="h-6 w-6" />} onClick={() => setShowCreateModal(true)} />

      {showCreateModal && (
        <CreateOrderModal onClose={() => setShowCreateModal(false)} environment={currentEnvironment} />
      )}
    </div>
  )
}

export default HomePage

