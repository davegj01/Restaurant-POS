const RestaurantBackground = ({ children }) => {
    return (
      <div className="hidden md:block md:w-3/5 relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/restaurant-background.jpg')",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-12">{children}</div>
        </div>
      </div>
    )
  }
  
  export default RestaurantBackground
  
  