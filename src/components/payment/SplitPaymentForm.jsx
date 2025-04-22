"use client"

import { useState, useEffect } from "react"

const SplitPaymentForm = ({
  total,
  cashAmount,
  setCashAmount,
  cardAmount,
  setCardAmount,
  cardType,
  setCardType,
  cardLastFour,
  setCardLastFour,
}) => {
  const [cardNumber, setCardNumber] = useState("")

  // Actualizar el monto de tarjeta cuando cambia el monto en efectivo
  useEffect(() => {
    const cashValue = Number.parseFloat(cashAmount) || 0
    if (cashValue <= total) {
      const remaining = total - cashValue
      setCardAmount(remaining.toFixed(2))
    } else {
      setCardAmount("0.00")
    }
  }, [cashAmount, total, setCardAmount])

  // Actualizar los últimos 4 dígitos cuando se ingresa el número de tarjeta
  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "")
    setCardNumber(value)

    if (value.length >= 4) {
      setCardLastFour(value.slice(-4))
    } else {
      setCardLastFour("")
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="text-gray-400 text-sm block mb-2">Cash Amount</label>
        <input
          type="text"
          value={cashAmount}
          onChange={(e) => {
            const value = e.target.value.replace(/[^\d.]/g, "")
            if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
              setCashAmount(value)
            }
          }}
          placeholder="Enter cash amount"
          className="w-full bg-gray-800 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
      </div>

      <div>
        <label className="text-gray-400 text-sm block mb-2">Card Amount</label>
        <input type="text" value={cardAmount} readOnly className="w-full bg-gray-700 text-white rounded-md py-2 px-3" />
      </div>

      <div>
        <label className="text-gray-400 text-sm block mb-2">Card Type</label>
        <div className="flex space-x-2">
          <button
            className={`flex-1 py-2 px-4 rounded-md ${
              cardType === "credit" ? "bg-amber-500 text-black" : "bg-gray-800 text-white"
            }`}
            onClick={() => setCardType("credit")}
          >
            Credit
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-md ${
              cardType === "debit" ? "bg-amber-500 text-black" : "bg-gray-800 text-white"
            }`}
            onClick={() => setCardType("debit")}
          >
            Debit
          </button>
        </div>
      </div>

      <div>
        <label className="text-gray-400 text-sm block mb-2">Card Number</label>
        <input
          type="text"
          value={cardNumber}
          onChange={handleCardNumberChange}
          placeholder="Enter card number"
          maxLength={16}
          className="w-full bg-gray-800 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
        <p className="text-gray-400 text-xs mt-1">Only the last 4 digits will be saved</p>
      </div>

      <div>
        <label className="text-gray-400 text-sm block mb-2">Last 4 Digits</label>
        <input
          type="text"
          value={cardLastFour}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "")
            if (value.length <= 4) {
              setCardLastFour(value)
            }
          }}
          placeholder="Last 4 digits"
          maxLength={4}
          className="w-full bg-gray-800 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
      </div>
    </div>
  )
}

export default SplitPaymentForm
