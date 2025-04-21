"use client"

import { useState } from "react"
import Header from "../common/Header"
import Navigation from "../common/Navigation"
import OrderDetailCard from "../orders/OrderDetailCard"
import ActionButton from "../common/ActionButton"
import { Plus } from "lucide-react"
import CreateOrderModal from "../orders/CreateOrderModal"
import { useApp, ENVIRONMENTS } from "../context/AppContext"
import { useNavigate } from "react-router-dom"

const OrdersPage = ({ onLogout }) => {
  const [activeFilter, setActiveFilter] = useState("all")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const { currentEnvironment, orders } = useApp()
  const navigate = useNavigate()

  const filteredOrders =
    activeFilter === "all"
      ? orders
      : orders.filter((order) => {
          if (activeFilter === "inProgress") return order.status === "inProgress"
          if (activeFilter === "ready") return order.status === "ready"
          if (activeFilter === "completed") return order.status === "completed" || order.status === "waiting"
          return true
        })

  const handleOrderClick = (orderId) => {
    navigate(`/order/${orderId}`)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <Header onLogout={onLogout} />

      {/* Title and filters */}
      <div className="px-4 py-3 flex justify-between items-center">
        <h1 className="text-white text-xl font-medium">Orders</h1>
        <div className="flex space-x-4 overflow-x-auto">
          <button
            className={`text-sm font-medium ${activeFilter === "all" ? "text-white" : "text-gray-400"}`}
            onClick={() => setActiveFilter("all")}
          >
            All
          </button>
          <button
            className={`text-sm font-medium ${activeFilter === "inProgress" ? "text-white" : "text-gray-400"}`}
            onClick={() => setActiveFilter("inProgress")}
          >
            In Progress
          </button>
          <button
            className={`text-sm font-medium ${activeFilter === "ready" ? "text-white" : "text-gray-400"}`}
            onClick={() => setActiveFilter("ready")}
          >
            Ready
          </button>
          <button
            className={`text-sm font-medium ${activeFilter === "completed" ? "text-white" : "text-gray-400"}`}
            onClick={() => setActiveFilter("completed")}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Orders list */}
      <div className="px-4 py-2 flex-1 overflow-y-auto">
        {filteredOrders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredOrders.map((order) => (
              <div key={order.id} className="cursor-pointer" onClick={() => handleOrderClick(order.id)}>
                <OrderDetailCard
                  id={order.id}
                  name={order.name}
                  table={order.table}
                  type={order.type}
                  status={order.status}
                  statusText={order.statusText}
                  detail={order.detail}
                  date={order.date}
                  items={order.items.length}
                  total={Number.parseFloat(order.total)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-gray-400 mb-4">No hay órdenes que mostrar</p>
              <button
                className="bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded text-sm font-medium"
                onClick={() => setShowCreateModal(true)}
              >
                Crear Nueva Orden
              </button>
            </div>
          </div>
        )}
      </div>

      <Navigation active="orders" />
      <ActionButton icon={<Plus className="h-6 w-6" />} onClick={() => setShowCreateModal(true)} />

      {showCreateModal && (
        <CreateOrderModal onClose={() => setShowCreateModal(false)} environment={currentEnvironment} />
      )}
    </div>
  )
}

export default OrdersPage

