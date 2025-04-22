"use client"

import { CreditCard, DollarSign, Split } from "lucide-react"

const PAYMENT_METHODS = {
  CASH: "cash",
  CARD: "card",
  SPLIT: "split",
}

const PaymentMethodSelector = ({ selectedMethod, onChange }) => {
  return (
    <div className="mb-4">
      <label className="text-gray-400 text-sm block mb-2">Payment Method</label>
      <div className="grid grid-cols-3 gap-2">
        <button
          className={`flex flex-col items-center justify-center p-3 rounded-md ${
            selectedMethod === PAYMENT_METHODS.CASH ? "bg-amber-500 text-black" : "bg-gray-800 text-white"
          }`}
          onClick={() => onChange(PAYMENT_METHODS.CASH)}
        >
          <DollarSign className="h-5 w-5 mb-1" />
          <span className="text-xs font-medium">Cash</span>
        </button>

        <button
          className={`flex flex-col items-center justify-center p-3 rounded-md ${
            selectedMethod === PAYMENT_METHODS.CARD ? "bg-amber-500 text-black" : "bg-gray-800 text-white"
          }`}
          onClick={() => onChange(PAYMENT_METHODS.CARD)}
        >
          <CreditCard className="h-5 w-5 mb-1" />
          <span className="text-xs font-medium">Card</span>
        </button>

        <button
          className={`flex flex-col items-center justify-center p-3 rounded-md ${
            selectedMethod === PAYMENT_METHODS.SPLIT ? "bg-amber-500 text-black" : "bg-gray-800 text-white"
          }`}
          onClick={() => onChange(PAYMENT_METHODS.SPLIT)}
        >
          <Split className="h-5 w-5 mb-1" />
          <span className="text-xs font-medium">Split</span>
        </button>
      </div>
    </div>
  )
}

export default PaymentMethodSelector
