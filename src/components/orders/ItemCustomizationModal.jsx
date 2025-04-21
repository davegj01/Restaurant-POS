"use client"

import { useState, useEffect } from "react"
import { X, Check } from "lucide-react"
import { useApp } from "../context/AppContext"

const ItemCustomizationModal = ({ orderId, item, itemIndex, onClose }) => {
  const { updateItemInOrder } = useApp()

  const [quantity, setQuantity] = useState(item.quantity)
  const [removedIngredients, setRemovedIngredients] = useState(item.removedIngredients || [])
  const [addedAddons, setAddedAddons] = useState(item.addedAddons || [])
  const [specialInstructions, setSpecialInstructions] = useState(item.specialInstructions || "")

  // Calcular el precio total del ítem
  const calculateItemTotal = () => {
    let total = item.menuItem.price * quantity

    // Añadir el precio de los addons
    addedAddons.forEach((addonId) => {
      const addon = item.menuItem.addons.find((a) => a.id === addonId)
      if (addon) {
        total += addon.price * quantity
      }
    })

    return total
  }

  const [itemTotal, setItemTotal] = useState(calculateItemTotal())

  // Actualizar el precio total cuando cambian las selecciones
  useEffect(() => {
    setItemTotal(calculateItemTotal())
  }, [quantity, addedAddons])

  const handleToggleIngredient = (ingredientId) => {
    if (removedIngredients.includes(ingredientId)) {
      setRemovedIngredients(removedIngredients.filter((id) => id !== ingredientId))
    } else {
      setRemovedIngredients([...removedIngredients, ingredientId])
    }
  }

  const handleToggleAddon = (addonId) => {
    if (addedAddons.includes(addonId)) {
      setAddedAddons(addedAddons.filter((id) => id !== addonId))
    } else {
      setAddedAddons([...addedAddons, addonId])
    }
  }

  const handleSave = () => {
    const updatedItem = {
      ...item,
      quantity,
      removedIngredients,
      addedAddons,
      specialInstructions,
      itemTotal,
    }

    updateItemInOrder(orderId, itemIndex, updatedItem)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col">
      {/* Header */}
      <div className="p-4 flex justify-between items-center bg-gray-900">
        <h2 className="text-white text-lg font-medium">Customize Item</h2>
        <button onClick={onClose}>
          <X className="h-5 w-5 text-white" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto bg-gray-900 p-4">
        {/* Item info */}
        <div className="bg-gray-800 rounded-lg p-4 mb-4">
          <div className="flex items-start">
            <div className="w-20 h-20 rounded-md overflow-hidden mr-3">
              <img
                src={item.menuItem.image || "/placeholder.svg"}
                alt={item.menuItem.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-white font-medium">{item.menuItem.name}</h3>
              <p className="text-gray-400 text-sm mt-1">${item.menuItem.price.toFixed(2)}</p>
              <p className="text-gray-400 text-xs mt-1">{item.menuItem.description}</p>
            </div>
          </div>
        </div>

        {/* Quantity */}
        <div className="bg-gray-800 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center">
            <h3 className="text-white font-medium">Quantity</h3>
            <div className="flex items-center">
              <button
                className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="mx-4 text-white">{quantity}</span>
              <button
                className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-black"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Ingredients */}
        {item.menuItem.ingredients && item.menuItem.ingredients.length > 0 && (
          <div className="bg-gray-800 rounded-lg p-4 mb-4">
            <h3 className="text-white font-medium mb-3">Remove Ingredients</h3>
            <div className="space-y-2">
              {item.menuItem.ingredients.map((ingredient) => (
                <div
                  key={ingredient.id}
                  className={`flex justify-between items-center p-2 rounded ${
                    removedIngredients.includes(ingredient.id) ? "bg-red-500/20" : "bg-gray-700"
                  }`}
                >
                  <span className="text-white">{ingredient.name}</span>
                  {ingredient.removable ? (
                    <button
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        removedIngredients.includes(ingredient.id)
                          ? "bg-red-500 text-white"
                          : "bg-gray-600 text-gray-300"
                      }`}
                      onClick={() => handleToggleIngredient(ingredient.id)}
                    >
                      {removedIngredients.includes(ingredient.id) ? "✓" : ""}
                    </button>
                  ) : (
                    <span className="text-gray-400 text-xs">No removable</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Addons */}
        {item.menuItem.addons && item.menuItem.addons.length > 0 && (
          <div className="bg-gray-800 rounded-lg p-4 mb-4">
            <h3 className="text-white font-medium mb-3">Add Extras</h3>
            <div className="space-y-2">
              {item.menuItem.addons.map((addon) => (
                <div
                  key={addon.id}
                  className={`flex justify-between items-center p-2 rounded ${
                    addedAddons.includes(addon.id) ? "bg-green-500/20" : "bg-gray-700"
                  }`}
                >
                  <div>
                    <span className="text-white">{addon.name}</span>
                    <span className="text-gray-400 text-xs ml-2">+${addon.price.toFixed(2)}</span>
                  </div>
                  <button
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      addedAddons.includes(addon.id) ? "bg-green-500 text-white" : "bg-gray-600 text-gray-300"
                    }`}
                    onClick={() => handleToggleAddon(addon.id)}
                  >
                    {addedAddons.includes(addon.id) ? "✓" : ""}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Special instructions */}
        <div className="bg-gray-800 rounded-lg p-4 mb-4">
          <h3 className="text-white font-medium mb-3">Special Instructions</h3>
          <textarea
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            placeholder="Add any special instructions here..."
            className="w-full bg-gray-700 text-white rounded-md py-2 px-3 text-sm focus:outline-none min-h-[80px]"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 bg-gray-900 border-t border-gray-800">
        <div className="flex justify-between items-center mb-4">
          <span className="text-white">Total</span>
          <span className="text-white font-medium">${itemTotal.toFixed(2)}</span>
        </div>
        <button
          className="w-full bg-amber-500 hover:bg-amber-600 text-black font-medium py-3 px-4 rounded transition-colors flex items-center justify-center"
          onClick={handleSave}
        >
          <Check className="h-5 w-5 mr-2" />
          Save Changes
        </button>
      </div>
    </div>
  )
}

export default ItemCustomizationModal

