"use client"

const OrderDetailCard = ({ id, name, table, type, status, statusText, detail, date, items, total }) => {
  const getStatusColor = () => {
    switch (status) {
      case "ready":
        return "bg-green-500"
      case "inProgress":
        return "bg-amber-500"
      case "completed":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusTextColor = () => {
    switch (status) {
      case "ready":
        return "text-green-500"
      case "inProgress":
        return "text-amber-500"
      case "completed":
        return "text-gray-400"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-md ${getStatusColor()} flex items-center justify-center mr-3`}>
            <span className="text-black font-bold">{id}</span>
          </div>

          <div>
            <h3 className="text-white text-sm font-medium">{name}</h3>
            <p className="text-gray-400 text-xs">
              {table} / {type}
            </p>
          </div>
        </div>

        <div className={`px-2 py-1 rounded-md flex items-center ${status === "ready" ? "bg-green-500/10" : ""}`}>
          <span className={`text-xs font-medium ${getStatusTextColor()}`}>• {statusText}</span>
        </div>
      </div>

      <p className="text-gray-400 text-xs mb-3">{date}</p>

      <div className="flex justify-between items-center border-t border-gray-700 pt-3">
        <div>
          <p className="text-gray-400 text-xs">Total</p>
          <p className="text-white font-medium">${total.toFixed(2)}</p>
        </div>

        <div className="flex items-center">
          {detail && <span className="text-gray-400 text-xs mr-3">• {detail}</span>}
          <span className="text-gray-400 text-xs">{items} items</span>
        </div>
      </div>
    </div>
  )
}

export default OrderDetailCard

