"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, X } from "lucide-react"

// Definición de las zonas y mesas
const ZONES = {
  SALON: { name: "Salón", tables: Array.from({ length: 23 }, (_, i) => i + 1) },
  CARPA: { name: "Carpa", tables: Array.from({ length: 8 }, (_, i) => i + 24) },
  VIP: { name: "VIP", tables: Array.from({ length: 8 }, (_, i) => i + 54) },
}

// Estado simulado de las mesas (disponible, ocupado, reservado)
const getTableStatus = (tableId) => {
  // Simulamos algunos estados aleatorios para las mesas
  const randomStatus = Math.random()
  // Usamos tableId para hacer el estado más determinista basado en el número de mesa
  const seed = (tableId % 10) * 0.1

  if ((randomStatus + seed) % 1 < 0.7) return "available" // 70% disponibles
  if ((randomStatus + seed) % 1 < 0.9) return "occupied" // 20% ocupadas
  return "reserved" // 10% reservadas
}

const TableSelectionModal = ({ onClose, onSelectTable, guestCount }) => {
  const [activeZone, setActiveZone] = useState("SALON")
  const [selectedTable, setSelectedTable] = useState(null)
  const [activeFloor, setActiveFloor] = useState("1st Floor")
  const scrollContainerRef = useRef(null)

  // Generar estado de las mesas
  const tableStatuses = {}
  Object.values(ZONES).forEach((zone) => {
    zone.tables.forEach((tableId) => {
      tableStatuses[tableId] = getTableStatus(tableId)
    })
  })

  // Manejar selección de mesa
  const handleTableClick = (tableId) => {
    if (tableStatuses[tableId] === "available") {
      setSelectedTable(tableId)
    }
  }

  // Confirmar selección
  const confirmSelection = () => {
    if (selectedTable) {
      onSelectTable(selectedTable)
    }
  }

  // Permitir desplazamiento horizontal con el mouse
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    let isDown = false
    let startX
    let scrollLeft

    const handleMouseDown = (e) => {
      isDown = true
      startX = e.pageX - container.offsetLeft
      scrollLeft = container.scrollLeft
    }

    const handleMouseLeave = () => {
      isDown = false
    }

    const handleMouseUp = () => {
      isDown = false
    }

    const handleMouseMove = (e) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - container.offsetLeft
      const walk = (x - startX) * 2 // Velocidad de desplazamiento
      container.scrollLeft = scrollLeft - walk
    }

    container.addEventListener("mousedown", handleMouseDown)
    container.addEventListener("mouseleave", handleMouseLeave)
    container.addEventListener("mouseup", handleMouseUp)
    container.addEventListener("mousemove", handleMouseMove)

    return () => {
      container.removeEventListener("mousedown", handleMouseDown)
      container.removeEventListener("mouseleave", handleMouseLeave)
      container.removeEventListener("mouseup", handleMouseUp)
      container.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col">
      {/* Header */}
      <div className="p-4 flex justify-between items-center">
        <button className="flex items-center text-white" onClick={onClose}>
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>Select Table</span>
        </button>

        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
            <span className="text-white text-sm">
              Available: {Object.values(tableStatuses).filter((s) => s === "available").length}
            </span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
            <span className="text-white text-sm">
              Occupied: {Object.values(tableStatuses).filter((s) => s === "occupied").length}
            </span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
            <span className="text-white text-sm">
              Reserved: {Object.values(tableStatuses).filter((s) => s === "reserved").length}
            </span>
          </div>
        </div>

        <button onClick={onClose}>
          <X className="h-5 w-5 text-white" />
        </button>
      </div>

      {/* Floor selector */}
      <div className="flex justify-end space-x-2 px-4">
        {["1st Floor", "2nd Floor", "3rd Floor"].map((floor) => (
          <button
            key={floor}
            className={`px-4 py-1 rounded-md text-sm ${
              activeFloor === floor ? "bg-gray-700 text-white" : "bg-gray-800 text-gray-400"
            }`}
            onClick={() => setActiveFloor(floor)}
          >
            {floor}
          </button>
        ))}
      </div>

      {/* Zone selector */}
      <div className="flex justify-center space-x-2 p-2">
        {Object.keys(ZONES).map((zone) => (
          <button
            key={zone}
            className={`px-4 py-2 rounded-md ${
              activeZone === zone ? "bg-gray-700 text-white" : "bg-gray-800 text-gray-400"
            }`}
            onClick={() => setActiveZone(zone)}
          >
            {ZONES[zone].name}
          </button>
        ))}
      </div>

      {/* Tables grid */}
      <div ref={scrollContainerRef} className="flex-1 overflow-x-auto overflow-y-auto p-4">
        <div className="grid grid-cols-5 gap-4 min-w-max">
          {ZONES[activeZone].tables.map((tableId) => {
            const status = tableStatuses[tableId]
            let bgColor = "bg-gray-800"
            let textColor = "text-white"
            let borderColor = ""

            if (status === "available") {
              bgColor = "bg-gray-800"
              textColor = "text-green-500"
            } else if (status === "occupied") {
              bgColor = "bg-red-500/30"
              textColor = "text-red-500"
            } else if (status === "reserved") {
              bgColor = "bg-blue-500/30"
              textColor = "text-blue-500"
            }

            if (selectedTable === tableId) {
              borderColor = "border-2 border-green-500"
            }

            return (
              <div key={tableId} className="relative">
                <button
                  className={`w-24 h-24 ${bgColor} ${borderColor} rounded-md flex flex-col items-center justify-center ${
                    status !== "available" ? "opacity-80" : ""
                  }`}
                  onClick={() => handleTableClick(tableId)}
                  disabled={status !== "available"}
                >
                  <div
                    className={`w-10 h-10 rounded-md ${textColor === "text-green-500" ? "bg-green-500/20" : bgColor} flex items-center justify-center mb-2`}
                  >
                    <span className={`text-sm font-bold ${textColor}`}>A{tableId}</span>
                  </div>

                  {/* Mesa y sillas (representación visual) */}
                  <div className="w-12 h-2 bg-gray-700 rounded-sm mb-1"></div>
                  <div className="flex justify-between w-16">
                    <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
                  </div>
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 flex justify-between items-center bg-gray-900">
        <div className="flex items-center">
          {selectedTable && (
            <>
              <X className="h-5 w-5 text-amber-500 mr-2" onClick={() => setSelectedTable(null)} />
              <span className="text-white">{guestCount} Guest</span>
              <span className="mx-2 text-gray-400">•</span>
              <span className="text-white">A{selectedTable}</span>
            </>
          )}
        </div>

        <button
          className={`px-6 py-2 rounded-md ${selectedTable ? "bg-amber-500 text-black" : "bg-gray-700 text-gray-400"}`}
          onClick={confirmSelection}
          disabled={!selectedTable}
        >
          Select Table
        </button>
      </div>
    </div>
  )
}

export default TableSelectionModal

