"use client"

import { useState } from "react"
import Header from "../common/Header"
import Navigation from "../common/Navigation"
import ActionButton from "../common/ActionButton"
import { Plus } from "lucide-react"
import { useApp } from "../context/AppContext"
import TableSelectionModal from "../orders/TableSelectionModal"
import CreateOrderModal from "../orders/CreateOrderModal"


const TablePage = ({ onLogout }) => {
  const { currentEnvironment } = useApp()
  const [showTableSelection, setShowTableSelection] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedTable, setSelectedTable] = useState(null)
  const [guestCount] = useState(1)
  console.log(selectedTable)
  const tableZones = [
    {
      name: "Salón",
      tables: Array.from({ length: 23 }, (_, i) => ({
        id: i + 1,
        status: Math.random() < 0.7 ? "available" : Math.random() < 0.5 ? "occupied" : "reserved",
      })),
    },
    {
      name: "Carpa",
      tables: Array.from({ length: 8 }, (_, i) => ({
        id: i + 24,
        status: Math.random() < 0.6 ? "available" : Math.random() < 0.5 ? "occupied" : "reserved",
      })),
    },
    {
      name: "VIP",
      tables: Array.from({ length: 8 }, (_, i) => ({
        id: i + 54,
        status: Math.random() < 0.5 ? "available" : Math.random() < 0.5 ? "occupied" : "reserved",
      })),
    },
  ]

  // Contadores de estado de mesas
  const tableCounts = {
    available: tableZones.reduce(
      (count, zone) => count + zone.tables.filter((table) => table.status === "available").length,
      0,
    ),
    occupied: tableZones.reduce(
      (count, zone) => count + zone.tables.filter((table) => table.status === "occupied").length,
      0,
    ),
    reserved: tableZones.reduce(
      (count, zone) => count + zone.tables.filter((table) => table.status === "reserved").length,
      0,
    ),
  }

  const handleSelectTable = (tableId) => {
    setSelectedTable(tableId)
    setShowTableSelection(false)
    setShowCreateModal(true)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-green-500"
      case "occupied":
        return "bg-red-500"
      case "reserved":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "available":
        return "Available"
      case "occupied":
        return "Occupied"
      case "reserved":
        return "Reserved"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <Header onLogout={onLogout} />

      {/* Title */}
      <div className="px-4 py-3">
        <h1 className="text-white text-xl font-medium">Tables</h1>
        <p className="text-gray-400 text-sm">Manage restaurant tables</p>
      </div>

      {/* Table status cards */}
      <div className="px-4 py-2 grid grid-cols-3 gap-3">
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400 text-sm">Available</span>
            <div className="w-8 h-8 rounded-md bg-green-500 flex items-center justify-center">
              <span className="text-white font-bold">{tableCounts.available}</span>
            </div>
          </div>
          <p className="text-xs text-gray-400">Ready to serve</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400 text-sm">Occupied</span>
            <div className="w-8 h-8 rounded-md bg-red-500 flex items-center justify-center">
              <span className="text-white font-bold">{tableCounts.occupied}</span>
            </div>
          </div>
          <p className="text-xs text-gray-400">Currently in use</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400 text-sm">Reserved</span>
            <div className="w-8 h-8 rounded-md bg-blue-500 flex items-center justify-center">
              <span className="text-white font-bold">{tableCounts.reserved}</span>
            </div>
          </div>
          <p className="text-xs text-gray-400">Upcoming reservations</p>
        </div>
      </div>

      {/* Table zones */}
      <div className="px-4 py-2 flex-1 overflow-y-auto">
        {tableZones.map((zone, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-white text-lg font-medium mb-3">{zone.name}</h2>
            <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
              {zone.tables.map((table) => (
                <button
                  key={table.id}
                  className={`bg-gray-800 rounded-lg p-3 flex flex-col items-center ${
                    table.status !== "available" ? "opacity-80" : ""
                  }`}
                  onClick={() => table.status === "available" && setShowTableSelection(true)}
                  disabled={table.status !== "available"}
                >
                  <div
                    className={`w-12 h-12 rounded-full ${getStatusColor(table.status)} flex items-center justify-center mb-2`}
                  >
                    <span className="text-white font-bold">{table.id}</span>
                  </div>
                  <span className="text-white text-sm">Table {table.id}</span>
                  <span
                    className={`text-xs ${
                      table.status === "available"
                        ? "text-green-500"
                        : table.status === "occupied"
                          ? "text-red-500"
                          : "text-blue-500"
                    }`}
                  >
                    {getStatusText(table.status)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Navigation active="table" />
      <ActionButton icon={<Plus className="h-6 w-6" />} onClick={() => setShowCreateModal(true)} />

      {/* Modales */}
      {showTableSelection && (
        <TableSelectionModal
          onClose={() => setShowTableSelection(false)}
          onSelectTable={handleSelectTable}
          guestCount={guestCount}
        />
      )}

      {showCreateModal && (
        <CreateOrderModal onClose={() => setShowCreateModal(false)} environment={currentEnvironment} />
      )}
    </div>
  )
}

export default TablePage
