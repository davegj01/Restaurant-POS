"use client"

import { useNavigate } from "react-router-dom"
import { useApp, ENVIRONMENTS } from "../context/AppContext"
import Header from "../common/Header"
import { User, Truck, ShoppingBag } from "lucide-react"

const DashboardPage = ({ onLogout }) => {
  const navigate = useNavigate()
  const { changeEnvironment } = useApp()

  const handleEnvironmentSelect = (environment) => {
    changeEnvironment(environment)
    navigate("/home")
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header onLogout={onLogout} />

      <main className="container mx-auto p-6">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-6 text-white">Bienvenido a ZestyCafe</h2>
          <p className="text-gray-400 mb-6">Selecciona el ambiente en el que deseas trabajar para comenzar tu turno.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Waiter Environment */}
          <div
            className="bg-gray-800 rounded-lg p-6 cursor-pointer hover:bg-gray-700 transition-colors"
            onClick={() => handleEnvironmentSelect(ENVIRONMENTS.WAITER)}
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mr-4">
                <User className="h-6 w-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-white">Mesero</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Gestiona mesas, toma pedidos y brinda un excelente servicio a los clientes en el restaurante.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-amber-500 text-sm">Acceso completo</span>
              <button
                className="bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded text-sm font-medium"
                onClick={() => handleEnvironmentSelect(ENVIRONMENTS.WAITER)}
              >
                Seleccionar
              </button>
            </div>
          </div>

          {/* Delivery Environment */}
          <div
            className="bg-gray-800 rounded-lg p-6 cursor-pointer hover:bg-gray-700 transition-colors"
            onClick={() => handleEnvironmentSelect(ENVIRONMENTS.DELIVERY)}
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                <Truck className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-white">Delivery</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Gestiona pedidos a domicilio, asigna repartidores y controla el estado de las entregas.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-blue-500 text-sm">Acceso limitado</span>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-black px-4 py-2 rounded text-sm font-medium"
                onClick={() => handleEnvironmentSelect(ENVIRONMENTS.DELIVERY)}
              >
                Seleccionar
              </button>
            </div>
          </div>

          {/* Takeaway Environment */}
          <div
            className="bg-gray-800 rounded-lg p-6 cursor-pointer hover:bg-gray-700 transition-colors"
            onClick={() => handleEnvironmentSelect(ENVIRONMENTS.TAKEAWAY)}
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mr-4">
                <ShoppingBag className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-white">Para Llevar</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Gestiona pedidos para llevar, prepara los paquetes y controla los tiempos de entrega.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-green-500 text-sm">Acceso limitado</span>
              <button
                className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded text-sm font-medium"
                onClick={() => handleEnvironmentSelect(ENVIRONMENTS.TAKEAWAY)}
              >
                Seleccionar
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">Estadísticas del día</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Ventas totales</p>
              <p className="text-white text-2xl font-bold">$1,245.89</p>
              <p className="text-green-500 text-xs">+12% que ayer</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Pedidos completados</p>
              <p className="text-white text-2xl font-bold">48</p>
              <p className="text-green-500 text-xs">+5% que ayer</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Tiempo promedio</p>
              <p className="text-white text-2xl font-bold">18 min</p>
              <p className="text-red-500 text-xs">+2 min que ayer</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default DashboardPage

