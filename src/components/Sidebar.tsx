import { useNavigate } from "react-router-dom"

const Sidebar = () => {
  const navigate = useNavigate()

  return (
    <div className='sidebar bg-gray-100 p-4 h-full w-48 flex flex-col space-y-4'>
      <button
        onClick={() => navigate("/dashboard")}
        className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300'
      >
        Dashboard
      </button>
      <button
        onClick={() => navigate("/dashboard/customers")}
        className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300'
      >
        Customers
      </button>
      <button
        onClick={() => navigate("/dashboard/stocks")}
        className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300'
      >
        Stocks
      </button>
      <button
        onClick={() => navigate("/dashboard/orders")}
        className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300'
      >
        Orders
      </button>
    </div>
  )
}

export default Sidebar
