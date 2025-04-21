"use client"

import { createContext, useContext, useState } from "react"

// Definición de ambientes
export const ENVIRONMENTS = {
  WAITER: "waiter",
  DELIVERY: "delivery",
  TAKEAWAY: "takeaway",
}

// Datos iniciales de platos
const initialMenuItems = {
  breakfast: [
    {
      id: "b1",
      name: "Southwest Scramble Bowl",
      description: "Perfectly seasoned, scrambled eggs with sausage, served with a side of warm toast",
      price: 16.99,
      image: "/placeholder.svg?height=120&width=180",
      category: "breakfast",
      ingredients: [
        { id: "i1", name: "Scrambled eggs", removable: true },
        { id: "i2", name: "Sausage", removable: true },
        { id: "i3", name: "Bell peppers", removable: true },
        { id: "i4", name: "Onions", removable: true },
        { id: "i5", name: "Cheese", removable: true },
        { id: "i6", name: "Toast", removable: true },
      ],
      addons: [
        { id: "a1", name: "Extra cheese", price: 1.5 },
        { id: "a2", name: "Avocado", price: 2.0 },
        { id: "a3", name: "Bacon", price: 2.5 },
      ],
    },
    {
      id: "b2",
      name: "Croissant French Toast",
      description: "Two pieces of light, flaky croissants, grilled to perfection topped with sugar",
      price: 14.29,
      image: "/placeholder.svg?height=120&width=180",
      category: "breakfast",
      ingredients: [
        { id: "i7", name: "Croissant", removable: false },
        { id: "i8", name: "Egg batter", removable: false },
        { id: "i9", name: "Powdered sugar", removable: true },
        { id: "i10", name: "Maple syrup", removable: true },
      ],
      addons: [
        { id: "a4", name: "Fresh berries", price: 2.5 },
        { id: "a5", name: "Whipped cream", price: 1.0 },
        { id: "a6", name: "Chocolate drizzle", price: 1.0 },
      ],
    },
    {
      id: "b3",
      name: "Oatmeal Breakfast",
      description: "A harmonious blend of brown sugar, raisins, and a side of seasonal fruit",
      price: 16.49,
      image: "/placeholder.svg?height=120&width=180",
      category: "breakfast",
      ingredients: [
        { id: "i11", name: "Steel-cut oats", removable: false },
        { id: "i12", name: "Brown sugar", removable: true },
        { id: "i13", name: "Raisins", removable: true },
        { id: "i14", name: "Seasonal fruit", removable: true },
        { id: "i15", name: "Cinnamon", removable: true },
      ],
      addons: [
        { id: "a7", name: "Honey", price: 0.75 },
        { id: "a8", name: "Nuts", price: 1.5 },
        { id: "a9", name: "Banana slices", price: 1.0 },
      ],
    },
    {
      id: "b4",
      name: "Western Omelette",
      description: "Omelette with cheddar cheese, ham, mushrooms, green onions, & bacon",
      price: 19.36,
      image: "/placeholder.svg?height=120&width=180",
      category: "breakfast",
      ingredients: [
        { id: "i16", name: "Eggs", removable: false },
        { id: "i17", name: "Cheddar cheese", removable: true },
        { id: "i18", name: "Ham", removable: true },
        { id: "i19", name: "Mushrooms", removable: true },
        { id: "i20", name: "Green onions", removable: true },
        { id: "i21", name: "Bacon", removable: true },
      ],
      addons: [
        { id: "a10", name: "Avocado", price: 2.0 },
        { id: "a11", name: "Extra cheese", price: 1.5 },
        { id: "a12", name: "Toast", price: 1.25 },
      ],
    },
    {
      id: "b5",
      name: "Belgian Waffle",
      description: "Crispy on the outside, fluffy on the inside, served with maple syrup",
      price: 12.99,
      image: "/placeholder.svg?height=120&width=180",
      category: "breakfast",
      ingredients: [
        { id: "i22", name: "Waffle batter", removable: false },
        { id: "i23", name: "Powdered sugar", removable: true },
        { id: "i24", name: "Maple syrup", removable: true },
        { id: "i25", name: "Butter", removable: true },
      ],
      addons: [
        { id: "a13", name: "Fresh berries", price: 2.5 },
        { id: "a14", name: "Whipped cream", price: 1.0 },
        { id: "a15", name: "Chocolate chips", price: 1.25 },
      ],
    },
  ],
  fastfood: [
    {
      id: "f1",
      name: "Classic Burger",
      description: "Juicy beef patty with lettuce, tomato, onion, and our special sauce",
      price: 14.99,
      image: "/placeholder.svg?height=120&width=180",
      category: "fastfood",
      ingredients: [
        { id: "i26", name: "Beef patty", removable: false },
        { id: "i27", name: "Lettuce", removable: true },
        { id: "i28", name: "Tomato", removable: true },
        { id: "i29", name: "Onion", removable: true },
        { id: "i30", name: "Special sauce", removable: true },
        { id: "i31", name: "Bun", removable: false },
      ],
      addons: [
        { id: "a16", name: "Cheese", price: 1.0 },
        { id: "a17", name: "Bacon", price: 2.5 },
        { id: "a18", name: "Extra patty", price: 3.5 },
      ],
    },
    {
      id: "f2",
      name: "Chicken Tenders",
      description: "Crispy breaded chicken tenders served with your choice of dipping sauce",
      price: 12.99,
      image: "/placeholder.svg?height=120&width=180",
      category: "fastfood",
      ingredients: [
        { id: "i32", name: "Chicken tenders", removable: false },
        { id: "i33", name: "Breading", removable: false },
        { id: "i34", name: "Dipping sauce", removable: true },
      ],
      addons: [
        { id: "a19", name: "Extra sauce", price: 0.75 },
        { id: "a20", name: "Fries", price: 3.5 },
        { id: "a21", name: "Coleslaw", price: 2.5 },
      ],
    },
  ],
  seafood: [
    {
      id: "s1",
      name: "Grilled Salmon",
      description: "Fresh salmon fillet grilled to perfection with lemon and herbs",
      price: 22.99,
      image: "/placeholder.svg?height=120&width=180",
      category: "seafood",
      ingredients: [
        { id: "i35", name: "Salmon fillet", removable: false },
        { id: "i36", name: "Lemon", removable: true },
        { id: "i37", name: "Herbs", removable: true },
        { id: "i38", name: "Olive oil", removable: true },
      ],
      addons: [
        { id: "a22", name: "Garlic butter", price: 1.5 },
        { id: "a23", name: "Side salad", price: 3.5 },
        { id: "a24", name: "Steamed vegetables", price: 3.0 },
      ],
    },
  ],
  dessert: [
    {
      id: "d1",
      name: "Chocolate Cake",
      description: "Rich chocolate cake with a layer of ganache and chocolate frosting",
      price: 8.99,
      image: "/placeholder.svg?height=120&width=180",
      category: "dessert",
      ingredients: [
        { id: "i39", name: "Chocolate cake", removable: false },
        { id: "i40", name: "Ganache", removable: true },
        { id: "i41", name: "Chocolate frosting", removable: true },
      ],
      addons: [
        { id: "a25", name: "Ice cream", price: 2.0 },
        { id: "a26", name: "Whipped cream", price: 1.0 },
        { id: "a27", name: "Chocolate sauce", price: 0.75 },
      ],
    },
  ],
  drink: [
    {
      id: "dr1",
      name: "Fresh Orange Juice",
      description: "Freshly squeezed orange juice",
      price: 4.99,
      image: "/placeholder.svg?height=120&width=180",
      category: "drink",
      ingredients: [
        { id: "i42", name: "Orange juice", removable: false },
        { id: "i43", name: "Ice", removable: true },
      ],
      addons: [
        { id: "a28", name: "Mint leaves", price: 0.5 },
        { id: "a29", name: "Honey", price: 0.75 },
      ],
    },
  ],
}

// Datos iniciales de órdenes
const initialOrders = [
  {
    id: "A9",
    name: "Adam Hamzah",
    items: [
      {
        menuItem: initialMenuItems.breakfast[0], // Southwest Scramble Bowl
        quantity: 1,
        removedIngredients: [],
        addedAddons: [],
        specialInstructions: "",
        itemTotal: 16.99,
      },
    ],
    status: "ready",
    statusText: "Ready to serve",
    table: "#289",
    type: "Dine In",
    date: new Date().toLocaleString(),
    total: 16.99,
    subtotal: 16.99,
    tax: 0,
  },
  {
    id: "A5",
    name: "Nina Renard",
    items: [
      {
        menuItem: initialMenuItems.breakfast[1], // Croissant French Toast
        quantity: 2,
        removedIngredients: [],
        addedAddons: [],
        specialInstructions: "",
        itemTotal: 28.58,
      },
    ],
    status: "ready",
    statusText: "Ready to serve",
    table: "#286",
    type: "Dine In",
    date: new Date().toLocaleString(),
    total: 28.58,
    subtotal: 28.58,
    tax: 0,
  },
]

// Contexto inicial
const AppContext = createContext({
  currentEnvironment: ENVIRONMENTS.WAITER,
  changeEnvironment: () => {},
  currentUser: { name: "Jenny", role: "Waiter" },
  orders: [],
  menuItems: {},
  addOrder: () => {},
  updateOrderStatus: () => {},
  getOrderById: () => {},
  addItemToOrder: () => {},
  removeItemFromOrder: () => {},
  updateItemInOrder: () => {},
  calculateOrderTotal: () => {},
})

// Proveedor del contexto
export const AppProvider = ({ children }) => {
  const [currentEnvironment, setCurrentEnvironment] = useState(ENVIRONMENTS.WAITER)
  const [currentUser] = useState({ name: "Jenny", role: "Waiter" })
  const [orders, setOrders] = useState(initialOrders)
  const [menuItems] = useState(initialMenuItems)
  const [orderIdCounter, setOrderIdCounter] = useState(16) // Empezamos desde un número alto para evitar colisiones

  const changeEnvironment = (environment) => {
    setCurrentEnvironment(environment)
  }

  // Función para añadir una nueva orden
  const addOrder = (orderData) => {
    const newOrderId = orderIdCounter
    setOrderIdCounter((prev) => prev + 1)

    // Generar un ID de orden basado en el tipo y contador
    let orderId
    if (orderData.type === "Takeaway") {
      orderId = `TA${newOrderId}`
    } else {
      orderId = `A${newOrderId}`
    }

    // Crear la nueva orden
    const newOrder = {
      id: orderId,
      name: orderData.customerName,
      items: [],
      status: "inProgress",
      statusText: "In Progress",
      detail: "Just Created",
      table: orderData.table ? `#${orderData.table}` : "N/A",
      type: orderData.type || "Dine In",
      date: new Date().toLocaleString(),
      total: 0,
      subtotal: 0,
      tax: 0,
      phone: orderData.customerPhone || "",
      guestCount: orderData.guestCount || 1,
    }

    // Añadir la orden al estado
    setOrders((prevOrders) => [newOrder, ...prevOrders])

    return newOrder
  }

  // Función para actualizar el estado de una orden
  const updateOrderStatus = (orderId, newStatus, newStatusText, detail = null) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus,
              statusText: newStatusText,
              detail: detail || order.detail,
            }
          : order,
      ),
    )
  }

  // Función para obtener una orden por su ID
  const getOrderById = (orderId) => {
    return orders.find((order) => order.id === orderId) || null
  }

  // Función para añadir un ítem a una orden
  const addItemToOrder = (
    orderId,
    menuItem,
    quantity = 1,
    removedIngredients = [],
    addedAddons = [],
    specialInstructions = "",
  ) => {
    // Calcular el precio total del ítem
    let itemTotal = menuItem.price * quantity

    // Añadir el precio de los addons
    addedAddons.forEach((addon) => {
      const addonInfo = menuItem.addons.find((a) => a.id === addon)
      if (addonInfo) {
        itemTotal += addonInfo.price * quantity
      }
    })

    const newItem = {
      menuItem,
      quantity,
      removedIngredients,
      addedAddons,
      specialInstructions,
      itemTotal,
    }

    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.id === orderId) {
          const updatedItems = [...order.items, newItem]
          const { subtotal, tax, total } = calculateOrderTotal(updatedItems)

          return {
            ...order,
            items: updatedItems,
            subtotal,
            tax,
            total,
          }
        }
        return order
      }),
    )
  }

  // Función para eliminar un ítem de una orden
  const removeItemFromOrder = (orderId, itemIndex) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.id === orderId) {
          const updatedItems = order.items.filter((_, index) => index !== itemIndex)
          const { subtotal, tax, total } = calculateOrderTotal(updatedItems)

          return {
            ...order,
            items: updatedItems,
            subtotal,
            tax,
            total,
          }
        }
        return order
      }),
    )
  }

  // Función para actualizar un ítem en una orden
  const updateItemInOrder = (orderId, itemIndex, updatedItem) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.id === orderId) {
          const updatedItems = [...order.items]
          updatedItems[itemIndex] = updatedItem

          const { subtotal, tax, total } = calculateOrderTotal(updatedItems)

          return {
            ...order,
            items: updatedItems,
            subtotal,
            tax,
            total,
          }
        }
        return order
      }),
    )
  }

  // Función para calcular el total de una orden
  const calculateOrderTotal = (items) => {
    const subtotal = items.reduce((sum, item) => sum + item.itemTotal, 0)
    const taxRate = 0.05 // 5% de impuesto
    const tax = subtotal * taxRate
    const total = subtotal + tax

    return {
      subtotal: Number.parseFloat(subtotal.toFixed(2)),
      tax: Number.parseFloat(tax.toFixed(2)),
      total: Number.parseFloat(total.toFixed(2)),
    }
  }

  return (
    <AppContext.Provider
      value={{
        currentEnvironment,
        changeEnvironment,
        currentUser,
        orders,
        menuItems,
        addOrder,
        updateOrderStatus,
        getOrderById,
        addItemToOrder,
        removeItemFromOrder,
        updateItemInOrder,
        calculateOrderTotal,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

// Hook personalizado para usar el contexto
export const useApp = () => useContext(AppContext)

