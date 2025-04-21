"use client"

import { useState } from "react"
import Logo from "../common/Logo"
import PinInput from "../login/pinInput"
import Keypad from "../login/keypad"
import RestaurantBackground from "../login/RestaurantBackground"
import Quote from "../login/Quote"

const LoginPage = ({ onLogin }) => {
  const [pin, setPin] = useState("")
  const [error, setError] = useState("")
  const correctPin = "123456"

  const handleKeyPress = (key) => {
    if (key === "clear") {
      setPin("")
      setError("")
    } else if (key === "backspace") {
      setPin((prev) => prev.slice(0, -1))
    } else if (pin.length < 6) {
      setPin((prev) => prev + key)

      // Auto-submit when pin reaches 6 digits
      if (pin.length === 5) {
        const newPin = pin + key
        if (newPin === correctPin) {
          console.log("PIN correct, calling onLogin")
          setTimeout(() => {
            onLogin()
          }, 300)
        } else {
          setTimeout(() => {
            setError("PIN incorrecto. Inténtalo de nuevo.")
            setPin("")
          }, 300)
        }
      }
    }
  }

  const handleLoginClick = () => {
    console.log("Login button clicked")
    if (pin === correctPin) {
      console.log("PIN correct, calling onLogin from button")
      onLogin()
    } else {
      setError("PIN incorrecto. Inténtalo de nuevo.")
      setPin("")
    }
  }

  return (
    <div className="flex h-screen w-full">
      {/* Left side - Restaurant background and quote */}
      <RestaurantBackground>
        <Quote />
      </RestaurantBackground>

      {/* Right side - Login form */}
      <div className="w-full md:w-2/5 bg-gray-900 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-md flex flex-col items-center">
          <Logo />

          <h1 className="text-xl font-bold text-amber-500 mb-8 mt-4">Employee Login</h1>

          <PinInput value={pin} maxLength={6} />

          {error && <p className="text-red-500 text-xs mt-1 mb-2 text-center">{error}</p>}

          <Keypad onKeyPress={handleKeyPress} />

          <button
            className="w-full bg-amber-500 hover:bg-amber-600 text-black font-medium py-3 px-4 rounded mt-6 transition-colors"
            onClick={handleLoginClick}
          >
            Start Shift
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
