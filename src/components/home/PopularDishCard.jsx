"use client"

const PopularDishCard = ({ id, name, orders, available, image, outOfStock }) => {
  return (
    <div className="min-w-[150px] bg-gray-800 rounded-lg p-3 flex items-start">
      <img src={image || "/placeholder.svg"} alt={name} className="w-10 h-10 rounded-md mr-3 object-cover" />
      <div className="flex-1">
        <h3 className="text-white text-sm font-medium mb-1">{name}</h3>
        {outOfStock ? (
          <p className="text-gray-400 text-xs">{available}</p>
        ) : (
          <p className="text-gray-400 text-xs">Orders: {orders}</p>
        )}
      </div>
    </div>
  )
}

export default PopularDishCard

