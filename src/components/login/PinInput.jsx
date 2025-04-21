"use client"

const PinInput = ({ value, maxLength = 6 }) => {
  const dots = Array.from({ length: maxLength }, (_, i) => i)

  return (
    <div className="w-full mb-6 flex flex-col items-center">
      <p className="text-gray-400 text-base mb-4">Please input your PIN to validate yourself.</p>
      <div className="flex items-center space-x-5">
        {dots.map((index) => (
          <div
            key={index}
            className="w-10 h-10 rounded-lg border-2 border-gray-500 flex items-center justify-center"
          >
            {index < value.length && <div className="w-4 h-4 bg-white rounded-full" />}
          </div>
        ))}
      </div>
    </div>
  )
}

export default PinInput
