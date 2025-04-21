"use client"

import { useState } from "react"
import { X, Search, ChevronRight } from "lucide-react"
import { useApp } from "../context/AppContext"

const MenuSelectionModal = ({ orderId, onClose }) => {
  const { menuItems, addItemToOrder } = useApp()
  const [activeCategory, setActiveCategory] = useState("breakfast")
  const [searchTerm, setSearchTerm] = useState("")

  // Todas las categorías disponibles
  const categories = [
    { id: "all", name: "All Menu", count: Object.values(menuItems).flat().length },
    { id: "breakfast", name: "Breakfast", count: menuItems.breakfast.length },
    { id: "fastfood", name: "Fastfood", count: menuItems.fastfood.length },
    { id: "seafood", name: "Seafood", count: menuItems.seafood.length },
    { id: "dessert", name: "Dessert", count: menuItems.dessert.length },
    { id: "drink", name: "Drink", count: menuItems.drink.length },
  ]

  // Filtrar platos según la categoría activa y el término de búsqueda
  const getFilteredItems = () => {
    let items = []

    if (activeCategory === "all") {
      items = Object.values(menuItems).flat()
    } else {
      items = menuItems[activeCategory] || []
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      items = items.filter(
        (item) => item.name.toLowerCase().includes(term) || item.description.toLowerCase().includes(term),
      )
    }

    return items
  }

  const filteredItems = getFilteredItems()

  const handleAddItem = (item) => {
    addItemToOrder(orderId, item)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col">
      {/* Header */}
      <div className="p-4 flex justify-between items-center bg-gray-900">
        <h2 className="text-white text-lg font-medium">Choose Menu</h2>
        <button onClick={onClose}>
          <X className="h-5 w-5 text-white" />
        </button>
      </div>

      {/* Search bar */}
      <div className="p-4 bg-gray-900">
        <div className="relative">
          <input
            type="text"
            placeholder="Search here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800 text-white rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>
      </div>

      {/* Categories */}
      <div className="bg-gray-900 overflow-x-auto">
        <div className="flex p-2 min-w-max">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-md mr-2 text-sm ${
                activeCategory === category.id ? "bg-gray-700 text-white" : "bg-gray-800 text-gray-400"
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
              <span className="ml-2 text-xs">{category.count} items</span>
            </button>
          ))}
        </div>
      </div>

      {/* Menu items */}
      <div className="flex-1 overflow-y-auto bg-gray-900 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="relative">
                <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-32 object-cover" />
                {item.category === "breakfast" && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">Popular</div>
                )}
              </div>
              <div className="p-3">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-white font-medium">{item.name}</h3>
                  <p className="text-white font-medium">${item.price.toFixed(2)}</p>
                </div>
                <p className="text-gray-400 text-xs mb-3 line-clamp-2">{item.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <button className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-white">
                      -
                    </button>
                    <span className="mx-2 text-white">0</span>
                    <button
                      className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-black"
                      onClick={() => handleAddItem(item)}
                    >
                      +
                    </button>
                  </div>
                  <button className="text-amber-500 text-sm flex items-center" onClick={() => handleAddItem(item)}>
                    Add to Order
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-gray-400 mb-4">No se encontraron platos</p>
            {searchTerm && (
              <button
                className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded"
                onClick={() => setSearchTerm("")}
              >
                Limpiar búsqueda
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default MenuSelectionModal

