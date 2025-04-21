"use client"

const OrderCard = ({ id, name, items, status, statusText, detail }) => {
  const getStatusColor = () => {
    switch (status) {
      case "ready":
        return "bg-green-500"
      case "inProgress":
        return "bg-amber-500"
      case "waiting":
        return "bg-blue-500"
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
      case "waiting":
        return "text-blue-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className="bg-gray-800 rounded-lg p-3 flex items-center">
      <div className={`w-10 h-10 rounded-md ${getStatusColor()} flex items-center justify-center mr-3`}>
        <span className="text-black font-bold">{id}</span>
      </div>

      <div className="flex-1">
        <div className="flex justify-between">
          <h3 className="text-white text-sm font-medium">{name}</h3>
          <span className="text-gray-400 text-xs">{items} items</span>
        </div>

        <div className="flex items-center mt-1">
          <span className={`text-xs font-medium ${getStatusTextColor()}`}>• {statusText}</span>
          {detail && <span className="text-gray-400 text-xs ml-2">• {detail}</span>}
        </div>
      </div>
    </div>
  )
}

export default OrderCard

