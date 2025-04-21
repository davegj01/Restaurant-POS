"use client"

const StatusCard = ({ title, count, change, color }) => {
  const getColorClasses = () => {
    switch (color) {
      case "green":
        return "bg-green-500/20 text-green-500"
      case "amber":
        return "bg-amber-500/20 text-amber-500"
      case "blue":
        return "bg-blue-500/20 text-blue-500"
      default:
        return "bg-gray-500/20 text-gray-500"
    }
  }

  const getIconColor = () => {
    switch (color) {
      case "green":
        return "bg-green-500"
      case "amber":
        return "bg-amber-500"
      case "blue":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="bg-gray-800 rounded-lg p-3">
      <div className="flex justify-between items-center mb-2">
        <div className={`w-8 h-8 rounded-md ${getIconColor()} flex items-center justify-center`}>
          <span className="text-black font-bold">{count}</span>
        </div>
        <span className="text-white text-sm">{title}</span>
      </div>
      <p className={`text-xs ${getColorClasses()}`}>{change}</p>
    </div>
  )
}

export default StatusCard

