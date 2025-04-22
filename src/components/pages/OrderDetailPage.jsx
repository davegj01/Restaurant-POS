"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Plus, Minus, X, Check, ChevronRight, Edit2, DollarSign } from "lucide-react"
import Header from "../common/Header"
import { useApp } from "../context/AppContext"
import MenuSelectionModal from "../orders/MenuSelectionModal"
import ItemCustomizationModal from "../orders/ItemCustomizationModal"
import PaymentModal from "../payment/PaymentModal"
import PaymentSuccessModal from "../payment/PaymentSuccessModal"

const OrderDetailPage = ({ onLogout }) => {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const { getOrderById, removeItemFromOrder, updateOrderStatus } = useApp()

  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showMenuModal, setShowMenuModal] = useState(false)
  const [showCustomizeModal, setShowCustomizeModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false)
  const [paymentDetails, setPaymentDetails] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedItemIndex, setSelectedItemIndex] = useState(null)

  useEffect(() => {
    // Cargar los datos de la orden
    const orderData = getOrderById(orderId)
    setOrder(orderData)
    setLoading(false)
  }, [orderId, getOrderById])

  const handleBack = () => {
    navigate(-1)
  }

  const handleAddItem = () => {
    setShowMenuModal(true)
  }

  const handleRemoveItem = (index) => {
    removeItemFromOrder(orderId, index)
    // Actualizar la orden local
    setOrder(getOrderById(orderId))
  }

  const handleEditItem = (item, index) => {
    setSelectedItem(item)
    setSelectedItemIndex(index)
    setShowCustomizeModal(true)
  }

  const handleProceedOrder = () => {
    // Si la orden está lista, mostrar el modal de pago
    if (order.status === "ready" || order.items.length > 0) {
      setShowPaymentModal(true)
    } else {
      // Si no está lista, actualizar el estado a "ready"
      updateOrderStatus(orderId, "ready", "Ready to serve", "Order completed")
      navigate("/orders")
    }
  }

  const handlePaymentComplete = (details) => {
    setPaymentDetails(details)
    setShowPaymentModal(false)
    setShowPaymentSuccess(true)
  }

  const handlePaymentSuccessDone = () => {
    setShowPaymentSuccess(false)
    navigate("/orders")
  }

  if (loading) {
    return (
      <div className="flex flex-col h-screen bg-gray-900">
        <Header onLogout={onLogout} />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-white">Cargando detalles de la orden...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="flex flex-col h-screen bg-gray-900">
        <Header onLogout={onLogout} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-white mb-4">Orden no encontrada</p>
            <button className="bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded" onClick={handleBack}>
              Volver
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <Header onLogout={onLogout} />

      {/* Encabezado de la página */}
      <div className="p-4 flex items-center">
        <button className="mr-3" onClick={handleBack}>
          <ArrowLeft className="h-5 w-5 text-white" />
        </button>
        <h1 className="text-white text-xl font-medium">Choose Menu</h1>
      </div>

      <div className="flex flex-col md:flex-row h-full overflow-hidden">
        {/* Panel izquierdo - Categorías y menú */}
        <div className="w-full md:w-2/3 flex flex-col overflow-hidden">
          {/* Barra de búsqueda */}
          <div className="px-4 py-2">
            <input
              type="text"
              placeholder="Search here"
              className="w-full bg-gray-800 text-white rounded-md py-2 px-4 text-sm focus:outline-none"
            />
          </div>

          {/* Botón para añadir platos */}
          <div className="px-4 py-2">
            <button
              className="w-full bg-amber-500 hover:bg-amber-600 text-black font-medium py-2 px-4 rounded transition-colors flex items-center justify-center"
              onClick={handleAddItem}
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Menu Items
            </button>
          </div>

          {/* Lista de platos en la orden */}
          <div className="flex-1 overflow-y-auto p-4">
            {order.items.length > 0 ? (
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start">
                        <div className="w-16 h-16 rounded-md overflow-hidden mr-3">
                          <img
                            src={item.menuItem.image || "/placeholder.svg"}
                            alt={item.menuItem.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-white font-medium">{item.menuItem.name}</h3>
                          <p className="text-gray-400 text-sm mt-1">${item.menuItem.price.toFixed(2)}</p>

                          {/* Ingredientes removidos */}
                          {item.removedIngredients && item.removedIngredients.length > 0 && (
                            <div className="mt-2">
                              <p className="text-red-500 text-xs">
                                No:{" "}
                                {item.removedIngredients
                                  .map((id) => {
                                    const ingredient = item.menuItem.ingredients.find((ing) => ing.id === id)
                                    return ingredient ? ingredient.name : ""
                                  })
                                  .join(", ")}
                              </p>
                            </div>
                          )}

                          {/* Addons añadidos */}
                          {item.addedAddons && item.addedAddons.length > 0 && (
                            <div className="mt-1">
                              <p className="text-green-500 text-xs">
                                Add:{" "}
                                {item.addedAddons
                                  .map((id) => {
                                    const addon = item.menuItem.addons.find((a) => a.id === id)
                                    return addon ? `${addon.name} (+$${addon.price.toFixed(2)})` : ""
                                  })
                                  .join(", ")}
                              </p>
                            </div>
                          )}

                          {/* Instrucciones especiales */}
                          {item.specialInstructions && (
                            <div className="mt-1">
                              <p className="text-amber-500 text-xs">Note: {item.specialInstructions}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-end">
                        <div className="flex items-center mb-2">
                          <button className="text-gray-400 hover:text-white" onClick={() => handleRemoveItem(index)}>
                            <X className="h-5 w-5" />
                          </button>
                          <button
                            className="text-gray-400 hover:text-white ml-2"
                            onClick={() => handleEditItem(item, index)}
                          >
                            <Edit2 className="h-5 w-5" />
                          </button>
                        </div>

                        <div className="flex items-center bg-gray-700 rounded-md">
                          <button className="px-2 py-1 text-white">
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-2 text-white">{item.quantity}</span>
                          <button className="px-2 py-1 text-white">
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-gray-400 mb-4">No hay platos en esta orden</p>
                <button
                  className="bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded"
                  onClick={handleAddItem}
                >
                  Añadir Platos
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Panel derecho - Información del cliente y detalles de la orden */}
        <div className="w-full md:w-1/3 bg-gray-800 p-4 overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-white text-lg font-medium mb-2">Customer Information</h2>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white">{order.name}</p>
                <p className="text-gray-400 text-sm">
                  {order.table} / {order.type}
                </p>
                <p className="text-gray-400 text-sm">{order.date}</p>
              </div>
              <div className="w-10 h-10 rounded-md bg-amber-500 flex items-center justify-center">
                <span className="text-black font-bold">{order.id}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-white text-lg font-medium mb-2">Order Details</h2>
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-white">
                    {item.menuItem.name} <span className="text-gray-400">x{item.quantity}</span>
                  </p>
                  {(item.removedIngredients && item.removedIngredients.length > 0) ||
                  (item.addedAddons && item.addedAddons.length > 0) ||
                  item.specialInstructions ? (
                    <button
                      className="text-amber-500 text-xs flex items-center"
                      onClick={() => handleEditItem(item, index)}
                    >
                      <span>notes</span>
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </button>
                  ) : null}
                </div>
                <p className="text-white">
                  ${item.itemTotal ? item.itemTotal.toFixed(2) : (item.menuItem.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-700 pt-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-400">Items ({order.items.length})</p>
              <p className="text-white">${order.subtotal ? order.subtotal.toFixed(2) : "0.00"}</p>
            </div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-400">Tax (5%)</p>
              <p className="text-white">${order.tax ? order.tax.toFixed(2) : "0.00"}</p>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-4 mb-6">
            <div className="flex justify-between items-center">
              <p className="text-white font-medium">Total</p>
              <p className="text-white font-medium">${order.total ? order.total.toFixed(2) : "0.00"}</p>
            </div>
          </div>

          <button
            className="w-full bg-amber-500 hover:bg-amber-600 text-black font-medium py-3 px-4 rounded transition-colors flex items-center justify-center"
            onClick={handleProceedOrder}
          >
            {order.status === "ready" || order.items.length > 0 ? (
              <>
                <DollarSign className="h-5 w-5 mr-2" />
                Pay Now
              </>
            ) : (
              <>
                <Check className="h-5 w-5 mr-2" />
                Proceed Order
              </>
            )}
          </button>
        </div>
      </div>

      {/* Modal para seleccionar platos del menú */}
      {showMenuModal && (
        <MenuSelectionModal
          orderId={orderId}
          onClose={() => {
            setShowMenuModal(false)
            setOrder(getOrderById(orderId))
          }}
        />
      )}

      {/* Modal para personalizar platos */}
      {showCustomizeModal && selectedItem && (
        <ItemCustomizationModal
          orderId={orderId}
          item={selectedItem}
          itemIndex={selectedItemIndex}
          onClose={() => {
            setShowCustomizeModal(false)
            setSelectedItem(null)
            setSelectedItemIndex(null)
            setOrder(getOrderById(orderId))
          }}
        />
      )}

      {/* Modal de pago */}
      {showPaymentModal && (
        <PaymentModal
          order={order}
          onClose={() => setShowPaymentModal(false)}
          onPaymentComplete={handlePaymentComplete}
        />
      )}

      {/* Modal de pago exitoso */}
      {showPaymentSuccess && paymentDetails && (
        <PaymentSuccessModal paymentDetails={paymentDetails} onClose={handlePaymentSuccessDone} />
      )}
    </div>
  )
}

export default OrderDetailPage
