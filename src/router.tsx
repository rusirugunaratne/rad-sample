import { createBrowserRouter } from "react-router-dom"
import Layout from "./pages/Layout"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import CustomerPage from "./pages/CustomerPage"
import ErrorPage from "./pages/ErrorPage"
import PrivateRoutes from "./pages/PrivateRoutes"
import StockPage from "./pages/StockPage"
import OrderPage from "./pages/OrderPage"
import AddOrderPage from "./pages/AddOrderPage"
import ReviewOrderPage from "./pages/ReviewOrderPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/login", element: <LoginPage /> },
      {
        element: <PrivateRoutes />,
        children: [
          { path: "/dashboard", element: <DashboardPage /> },
          { path: "/dashboard/customers", element: <CustomerPage /> },
          { path: "/dashboard/stocks", element: <StockPage /> },
          { path: "/dashboard/orders", element: <OrderPage /> },
          { path: "/dashboard/orders/new", element: <AddOrderPage /> },
          { path: "/dashboard/orders/review", element: <ReviewOrderPage /> },
        ],
      },
    ],
  },
])

export default router
