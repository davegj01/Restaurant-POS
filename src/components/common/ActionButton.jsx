"use client"

const ActionButton = ({ icon, onClick }) => {
  return (
    <button
      className="fixed bottom-16 right-4 w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center shadow-lg z-20"
      onClick={onClick}
    >
      {icon}
    </button>
  )
}

export default ActionButton

