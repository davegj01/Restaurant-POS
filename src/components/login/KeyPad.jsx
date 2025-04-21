"use client"

const Keypad = ({ onKeyPress }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-y-6 gap-x-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            className="h-16 w-16 text-2xl font-medium text-white mx-auto bg-gray-900 
                       transition-transform duration-150 ease-in-out active:scale-90"
            onClick={() => onKeyPress(num.toString())}
          >
            {num}
          </button>
        ))}

        {/* Botón de Clear (.) */}
        <button
          className="h-16 w-16 text-xl font-medium text-gray-400 mx-auto bg-gray-900 
                     transition-transform duration-150 ease-in-out active:scale-90"
          onClick={() => onKeyPress("clear")}
        >
          .
        </button>

        {/* Botón de 0 */}
        <button
          className="h-16 w-16 text-2xl font-medium text-white mx-auto bg-gray-900 
                     transition-transform duration-150 ease-in-out active:scale-90"
          onClick={() => onKeyPress("0")}
        >
          0
        </button>

        {/* Botón de Backspace */}
        <button
          className="h-16 w-16 text-xl font-medium text-gray-400 mx-auto bg-gray-900 flex items-center justify-center 
                     transition-transform duration-150 ease-in-out active:scale-90"
          onClick={() => onKeyPress("backspace")}
        >
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
              d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Keypad
