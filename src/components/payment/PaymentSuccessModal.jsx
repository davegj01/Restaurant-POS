"use client"

import { Check } from "lucide-react"

const PaymentSuccessModal = ({ paymentDetails, onClose }) => {
  const formatPaymentMethod = () => {
    if (paymentDetails.method === "cash") {
      return "Cash"
    } else if (paymentDetails.method === "card") {
      return `${paymentDetails.cardType === "credit" ? "Credit" : "Debit"} Card (${paymentDetails.lastFour})`
    } else if (paymentDetails.method === "split") {
      return "Split Payment"
    }
    return "Unknown"
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
      <div className="bg-gray-900 w-full max-w-md rounded-lg overflow-hidden p-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
            <Check className="h-8 w-8 text-white" />
          </div>

          <h2 className="text-white text-xl font-medium mb-2">Payment Successful!</h2>
          <p className="text-gray-400 mb-6">The payment has been processed successfully.</p>

          <div className="w-full space-y-4 mb-6">
            <div className="flex justify-between">
              <p className="text-gray-400">Amount:</p>
              <p className="text-white font-medium">${paymentDetails.total.toFixed(2)}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-400">Method:</p>
              <p className="text-white">{formatPaymentMethod()}</p>
            </div>

            {paymentDetails.method === "cash" && (
              <>
                <div className="flex justify-between">
                  <p className="text-gray-400">Cash Received:</p>
                  <p className="text-white">${paymentDetails.cashReceived.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-400">Change:</p>
                  <p className="text-green-500">${paymentDetails.change.toFixed(2)}</p>
                </div>
              </>
            )}

            {paymentDetails.method === "split" && (
              <>
                <div className="flex justify-between">
                  <p className="text-gray-400">Cash Amount:</p>
                  <p className="text-white">${paymentDetails.cashAmount.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-400">Card Amount:</p>
                  <p className="text-white">${paymentDetails.cardAmount.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-400">Card Type:</p>
                  <p className="text-white">{paymentDetails.cardType === "credit" ? "Credit" : "Debit"}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-400">Card Number:</p>
                  <p className="text-white">XXXX-XXXX-XXXX-{paymentDetails.lastFour}</p>
                </div>
              </>
            )}

            <div className="flex justify-between">
              <p className="text-gray-400">Date:</p>
              <p className="text-white">{formatDate(paymentDetails.timestamp)}</p>
            </div>
          </div>

          <button
            className="w-full bg-amber-500 hover:bg-amber-600 text-black font-medium py-3 px-4 rounded transition-colors"
            onClick={onClose}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccessModal
