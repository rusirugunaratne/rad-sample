import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/useAuth"
import Sidebar from "../components/Sidebar" // Adjust the path as needed

const PrivateRoutes = () => {
  const { isLoggedIn } = useAuth()

  if (!isLoggedIn) return <Navigate to='/login' />

  return (
    <div className='flex min-h-screen'>
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content area */}
      <div className='flex-1  bg-gray-50'>
        <Outlet />
      </div>
    </div>
  )
}

export default PrivateRoutes
