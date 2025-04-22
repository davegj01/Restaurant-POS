"use client"

import { useState, useEffect } from "react"
import { X, Check } from "lucide-react"
import { useApp } from "../context/AppContext"
import PaymentKeypad from "./PaymentKeypad"
import PaymentMethodSelector from "./PaymentMethodSelector"
import CardDetailsForm from "./CardDetailsForm"
import SplitPaymentForm from "./SplitPaymentForm"

const PAYMENT_METHODS = {
  CASH: "cash",
  CARD: "card",
  SPLIT: "split",
}

const PaymentModal = ({ order, onClose, onPaymentComplete }) => {
  const { updateOrderStatus } = useApp()
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS.CASH)
  const [cashAmount, setCashAmount] = useState("")
  const [cardType, setCardType] = useState("credit")
  const [cardLastFour, setCardLastFour] = useState("")
  const [splitCashAmount, setSplitCashAmount] = useState("")
  const [splitCardAmount, setSplitCardAmount] = useState("")
  const [splitCardType, setSplitCardType] = useState("credit")
  const [splitCardLastFour, setSplitCardLastFour] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState("")
  const [change, setChange] = useState(0)

  // Valores predefinidos para selección rápida
  const quickAmounts = [10, 20, 50, 100]

  // Calcular el cambio cuando se ingresa efectivo
  useEffect(() => {
    if (paymentMethod === PAYMENT_METHODS.CASH && cashAmount) {
      const cashValue = Number.parseFloat(cashAmount)
      if (!isNaN(cashValue) && cashValue >= order.total) {
        setChange(cashValue - order.total)
      } else {
        setChange(0)
      }
    }
  }, [cashAmount, order.total, paymentMethod])

  // Validar el pago dividido
  useEffect(() => {
    if (paymentMethod === PAYMENT_METHODS.SPLIT) {
      const cashValue = Number.parseFloat(splitCashAmount) || 0
      const cardValue = Number.parseFloat(splitCardAmount) || 0
      const total = cashValue + cardValue

      if (Math.abs(total - order.total) < 0.01) {
        setError("")
      } else if (total > order.total) {
        const overpayment = (total - order.total).toFixed(2)
        setError(`El total excede por $${overpayment}. Ajuste los montos.`)
      } else if (total < order.total) {
        const remaining = (order.total - total).toFixed(2)
        setError(`Faltan $${remaining} para completar el pago.`)
      }
    }
  }, [splitCashAmount, splitCardAmount, order.total, paymentMethod])

  const handleCashInput = (value) => {
    if (value === "clear") {
      setCashAmount("")
      setChange(0)
    } else if (value === "backspace") {
      setCashAmount((prev) => prev.slice(0, -1))
    } else if (value === ".") {
      if (!cashAmount.includes(".")) {
        setCashAmount((prev) => prev + ".")
      }
    } else {
      // Si ya hay un punto, solo permitir 2 decimales
      if (cashAmount.includes(".")) {
        const parts = cashAmount.split(".")
        if (parts[1] && parts[1].length >= 2) return
      }
      setCashAmount((prev) => prev + value)
    }
  }

  const handleQuickAmount = (amount) => {
    setCashAmount(amount.toString())
  }

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method)
    setError("")
  }

  const validatePayment = () => {
    if (paymentMethod === PAYMENT_METHODS.CASH) {
      const cashValue = Number.parseFloat(cashAmount)
      if (isNaN(cashValue) || cashValue < order.total) {
        setError("El monto en efectivo debe ser igual o mayor al total.")
        return false
      }
    } else if (paymentMethod === PAYMENT_METHODS.CARD) {
      if (cardLastFour.length !== 4 || !/^\d{4}$/.test(cardLastFour)) {
        setError("Ingrese los últimos 4 dígitos de la tarjeta.")
        return false
      }
    } else if (paymentMethod === PAYMENT_METHODS.SPLIT) {
      const cashValue = Number.parseFloat(splitCashAmount) || 0
      const cardValue = Number.parseFloat(splitCardAmount) || 0

      if (Math.abs(cashValue + cardValue - order.total) > 0.01) {
        setError("La suma de los pagos debe ser igual al total.")
        return false
      }

      if (cardValue > 0 && (splitCardLastFour.length !== 4 || !/^\d{4}$/.test(splitCardLastFour))) {
        setError("Ingrese los últimos 4 dígitos de la tarjeta.")
        return false
      }
    }

    return true
  }

  const handlePayNow = async () => {
    if (!validatePayment()) return

    setIsProcessing(true)
    setError("")

    try {
      // Simular procesamiento de pago
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Crear objeto con detalles del pago
      const paymentDetails = {
        method: paymentMethod,
        timestamp: new Date().toISOString(),
        total: order.total,
      }

      if (paymentMethod === PAYMENT_METHODS.CASH) {
        paymentDetails.cashReceived = Number.parseFloat(cashAmount)
        paymentDetails.change = change
      } else if (paymentMethod === PAYMENT_METHODS.CARD) {
        paymentDetails.cardType = cardType
        paymentDetails.lastFour = cardLastFour
      } else if (paymentMethod === PAYMENT_METHODS.SPLIT) {
        paymentDetails.cashAmount = Number.parseFloat(splitCashAmount) || 0
        paymentDetails.cardAmount = Number.parseFloat(splitCardAmount) || 0
        paymentDetails.cardType = splitCardType
        paymentDetails.lastFour = splitCardLastFour
      }

      // Actualizar estado de la orden
      updateOrderStatus(
        order.id,
        "completed",
        "Paid",
        `Paid with ${paymentMethod === PAYMENT_METHODS.SPLIT ? "split payment" : paymentMethod}`,
      )

      // Notificar que el pago se completó
      onPaymentComplete(paymentDetails)
    } catch (error) {
      console.error("Error processing payment:", error)
      setError("Ocurrió un error al procesar el pago. Inténtelo de nuevo.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
      <div className="bg-gray-900 w-full max-w-3xl rounded-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-800">
          <h2 className="text-white text-lg font-medium">Payment</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Left side - Order details */}
          <div className="w-full md:w-1/2 p-4 border-r border-gray-800">
            <div className="mb-4">
              <h3 className="text-white text-sm font-medium mb-2">Customer Information</h3>
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-md bg-amber-500 flex items-center justify-center mr-3">
                  <span className="text-black font-bold">{order.id}</span>
                </div>
                <div>
                  <p className="text-white">{order.name}</p>
                  <p className="text-gray-400 text-xs">
                    {order.table} / {order.type}
                  </p>
                  <p className="text-gray-400 text-xs">{order.date}</p>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-white text-sm font-medium mb-2">Transaction Details</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <div>
                      <p className="text-white text-sm">{item.menuItem.name}</p>
                      <p className="text-gray-400 text-xs">${item.menuItem.price.toFixed(2)}</p>
                    </div>
                    <p className="text-white text-sm">{item.quantity}x</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <div className="flex justify-between">
                <p className="text-gray-400 text-sm">Items ({order.items.length})</p>
                <p className="text-white text-sm">${order.subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-400 text-sm">Tax (5%)</p>
                <p className="text-white text-sm">${order.tax.toFixed(2)}</p>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-800">
                <p className="text-white font-medium">Total</p>
                <p className="text-white font-medium">${order.total.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Right side - Payment options */}
          <div className="w-full md:w-1/2 p-4">
            <div className="mb-4">
              <PaymentMethodSelector selectedMethod={paymentMethod} onChange={handlePaymentMethodChange} />
            </div>

            {paymentMethod === PAYMENT_METHODS.CASH && (
              <div>
                <div className="mb-4">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-400 text-sm">Amount</p>
                    <p className="text-white text-2xl font-medium">${cashAmount || "0"}</p>
                  </div>

                  {change > 0 && (
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-gray-400 text-sm">Change</p>
                      <p className="text-green-500 text-lg">${change.toFixed(2)}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {quickAmounts.map((amount) => (
                    <button
                      key={amount}
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        cashAmount === amount.toString() ? "bg-amber-500 text-black" : "bg-gray-800 text-white"
                      }`}
                      onClick={() => handleQuickAmount(amount)}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>

                <PaymentKeypad onKeyPress={handleCashInput} />
              </div>
            )}

            {paymentMethod === PAYMENT_METHODS.CARD && (
              <CardDetailsForm
                cardType={cardType}
                setCardType={setCardType}
                cardLastFour={cardLastFour}
                setCardLastFour={setCardLastFour}
              />
            )}

            {paymentMethod === PAYMENT_METHODS.SPLIT && (
              <SplitPaymentForm
                total={order.total}
                cashAmount={splitCashAmount}
                setCashAmount={setSplitCashAmount}
                cardAmount={splitCardAmount}
                setCardAmount={setSplitCardAmount}
                cardType={splitCardType}
                setCardType={setSplitCardType}
                cardLastFour={splitCardLastFour}
                setCardLastFour={setSplitCardLastFour}
              />
            )}

            {error && (
              <div className="mt-4 p-2 bg-red-500/20 border border-red-500 rounded-md">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}

            <button
              className={`w-full mt-4 py-3 px-4 rounded-md flex items-center justify-center ${
                isProcessing
                  ? "bg-gray-700 text-gray-300 cursor-not-allowed"
                  : "bg-amber-500 hover:bg-amber-600 text-black"
              }`}
              onClick={handlePayNow}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <span>Processing...</span>
              ) : (
                <>
                  <Check className="h-5 w-5 mr-2" />
                  Pay Now
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentModal
