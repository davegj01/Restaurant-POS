"use client"

const PaymentKeypad = ({ onKeyPress }) => {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "backspace"]

  return (
    <div className="grid grid-cols-3 gap-3">
      {keys.map((key) => (
        <button
          key={key}
          className={`
            h-14 rounded-md flex items-center justify-center text-xl font-medium
            ${
              key === "clear" || key === "backspace"
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-800 hover:bg-gray-700 text-white"
            }
            transition-colors
          `}
          onClick={() => onKeyPress(key)}
        >
          {key === "backspace" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
              />
            </svg>
          ) : key === "clear" ? (
            "C"
          ) : (
            key
          )}
        </button>
      ))}
    </div>
  )
}

export default PaymentKeypad
