"use client"

import { useState } from "react"
import { X, ChevronRight, User, Phone } from "lucide-react"
import TableSelectionModal from "./TableSelectionModal"
import {useApp} from "../context/AppContext"
import { useNavigate } from "react-router-dom"

const CreateOrderModal = ({ onClose, environment }) => {
  console.log(environment)
  const { addOrder } = useApp()
  const navigate = useNavigate()
  const [guestCount, setGuestCount] = useState(1)
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [showTableSelection, setShowTableSelection] = useState(false)
  const [selectedTable, setSelectedTable] = useState(null)
  const [orderType, setOrderType] = useState("Dine In")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [newOrderId, setNewOrderId] = useState(null)

  const handleSelectTable = (table) => {
    setSelectedTable(table)
    setShowTableSelection(false)
  }

  const validateForm = () => {
    const newErrors = {}

    if (!customerName.trim()) {
      newErrors.customerName = "El nombre del cliente es requerido"
    }

    if (orderType === "Dine In" && !selectedTable) {
      newErrors.table = "Debe seleccionar una mesa para pedidos en el restaurante"
    }

    if (customerPhone && !/^\d{10}$/.test(customerPhone.replace(/\D/g, ""))) {
      newErrors.customerPhone = "Ingrese un número de teléfono válido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCreateOrder = () => {
    if (!validateForm()) return

    setIsSubmitting(true)

    // Crear la orden con los datos del formulario
    const orderData = {
      customerName,
      customerPhone,
      table: selectedTable,
      type: orderType,
      guestCount,
    }

    try {
      // Añadir la orden al contexto
      const newOrder = addOrder(orderData)
      setNewOrderId(newOrder.id)

      // Mostrar mensaje de éxito
      setSuccess(true)

      // Cerrar el modal después de un breve retraso o navegar a la orden
      setTimeout(() => {
        navigate(`/order/${newOrder.id}`)
        onClose()
      }, 1500)
    } catch (error) {
      console.error("Error al crear la orden:", error)
      setErrors({ submit: "Ocurrió un error al crear la orden. Inténtelo de nuevo." })
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-gray-900 w-full max-w-sm rounded-lg overflow-hidden p-6 text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-white text-xl font-medium mb-2">¡Orden Creada!</h2>
          <p className="text-gray-400 mb-4">La orden ha sido creada exitosamente.</p>
          {newOrderId && <p className="text-amber-500 font-medium">Orden #{newOrderId}</p>}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-gray-900 w-full max-w-sm rounded-lg overflow-hidden">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white text-lg font-medium">Create New Order</h2>
              <button className="text-gray-400 hover:text-white" onClick={onClose}>
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Customer name */}
            <div className="mb-4">
              <p className="text-gray-400 text-sm mb-2">Customer Name</p>
              <div className="relative">
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter customer name"
                  className={`w-full bg-gray-800 rounded-md py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-1 ${
                    errors.customerName ? "focus:ring-red-500 border border-red-500" : "focus:ring-amber-500"
                  }`}
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              {errors.customerName && <p className="text-red-500 text-xs mt-1">{errors.customerName}</p>}
            </div>

            {/* Customer phone */}
            <div className="mb-4">
              <p className="text-gray-400 text-sm mb-2">Customer Phone</p>
              <div className="relative">
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Enter phone number"
                  className={`w-full bg-gray-800 rounded-md py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-1 ${
                    errors.customerPhone ? "focus:ring-red-500 border border-red-500" : "focus:ring-amber-500"
                  }`}
                />
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              {errors.customerPhone && <p className="text-red-500 text-xs mt-1">{errors.customerPhone}</p>}
            </div>

            {/* Order Type */}
            <div className="mb-4">
              <p className="text-gray-400 text-sm mb-2">Order Type</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  className={`py-2 px-4 rounded-md text-sm font-medium ${
                    orderType === "Dine In" ? "bg-amber-500 text-black" : "bg-gray-800 text-white"
                  }`}
                  onClick={() => setOrderType("Dine In")}
                >
                  Dine In
                </button>
                <button
                  className={`py-2 px-4 rounded-md text-sm font-medium ${
                    orderType === "Takeaway" ? "bg-amber-500 text-black" : "bg-gray-800 text-white"
                  }`}
                  onClick={() => setOrderType("Takeaway")}
                >
                  Takeaway
                </button>
              </div>
            </div>

            {/* Guest count */}
            <div className="mb-4">
              <p className="text-gray-400 text-sm mb-2">Guest</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-amber-500 mr-2"></div>
                </div>
                <span className="text-white">{guestCount} Person</span>
                <div className="flex items-center">
                  <button
                    className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center"
                    onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                  >
                    <span className="text-black font-bold">-</span>
                  </button>
                  <span className="mx-3 text-white">{guestCount}</span>
                  <button
                    className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center"
                    onClick={() => setGuestCount(Math.min(99, guestCount + 1))}
                  >
                    <span className="text-black font-bold">+</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Select table (solo para Dine In) */}
            {orderType === "Dine In" && (
              <div className="mb-6">
                <p className="text-gray-400 text-sm mb-2">Select Table</p>
                <button
                  className={`w-full bg-gray-800 rounded-md py-3 px-4 flex justify-between items-center ${
                    errors.table ? "border border-red-500" : ""
                  }`}
                  onClick={() => setShowTableSelection(true)}
                >
                  <span className="text-white">{selectedTable ? `Table ${selectedTable}` : "Select Table"}</span>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </button>
                {errors.table && <p className="text-red-500 text-xs mt-1">{errors.table}</p>}
              </div>
            )}

            {errors.submit && <p className="text-red-500 text-sm mb-4 text-center">{errors.submit}</p>}

            {/* Create order button */}
            <button
              className={`w-full ${
                isSubmitting ? "bg-gray-600 cursor-not-allowed" : "bg-amber-500 hover:bg-amber-600"
              } text-black font-medium py-3 px-4 rounded transition-colors`}
              onClick={handleCreateOrder}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Order..." : "Create Order"}
            </button>
          </div>
        </div>
      </div>

      {/* Modal de selección de mesa */}
      {showTableSelection && (
        <TableSelectionModal
          onClose={() => setShowTableSelection(false)}
          onSelectTable={handleSelectTable}
          guestCount={guestCount}
        />
      )}
    </>
  )
}

export default CreateOrderModal

