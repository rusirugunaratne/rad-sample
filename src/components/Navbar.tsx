import { Link, useNavigate, useLocation, Navigate } from "react-router-dom"
import logo from "../assets/easy-pos-logo.svg"
import { useAuth } from "../context/useAuth"
import { FaCartShopping } from "react-icons/fa6"
import { useCart } from "../context/useCart"

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isLoggedIn, logout } = useAuth()
  const { cart } = useCart()

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ]

  const logoutHandler = () => {
    logout()
    navigate("/login")
  }

  const isActive = (path: string) => location.pathname === path || (path !== "/" && location.pathname.startsWith(path))

  return (
    <nav className='relative bg-white shadow-md px-6 py-3 flex items-center'>
      {/* Logo on the left */}
      <div className='flex-shrink-0'>
        <img src={logo} height={150} width={150} alt='easy pos logo' className='object-contain' />
      </div>

      {/* Centered navigation links */}
      <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <div className='flex space-x-8 text-gray-700 font-medium'>
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`transition-colors duration-300 px-2 py-1 rounded ${
                isActive(item.to) ? "text-blue-700 font-bold bg-blue-100" : "hover:text-blue-600"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Login and Dashboard buttons on the right */}
      <div className='flex flex-row justify-end ml-auto space-x-1'>
        {isLoggedIn && (
          <div className='text-green-600 flex'>
            <Link to='/dashboard/orders/new'>
              <FaCartShopping size={30} /> ({cart.length})
            </Link>
          </div>
        )}
        {isLoggedIn && (
          <button
            onClick={() => navigate("/dashboard")}
            className='bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-300'
          >
            Dashboard
          </button>
        )}
        {!isLoggedIn && (
          <button
            onClick={() => navigate("/login")}
            className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300'
          >
            Login
          </button>
        )}
        {isLoggedIn && (
          <button
            onClick={logoutHandler}
            className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300'
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
