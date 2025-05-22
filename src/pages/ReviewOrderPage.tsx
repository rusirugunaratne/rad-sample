import React from "react"
import { useNavigate } from "react-router-dom"
import type { Customer } from "./CustomerPage"
import { useCart } from "../context/useCart"

const ReviewOrderPage: React.FC = () => {
  const { cart, clearCart } = useCart()
  const navigate = useNavigate()
  const customer: Customer | null = React.useMemo(() => {
    const c = sessionStorage.getItem("order_customer")
    return c ? JSON.parse(c) : null
  }, [])

  const total = cart.reduce((sum, item) => sum + item.stock.unitPrice * item.quantity, 0)

  const handleCheckout = () => {
    if (!customer) return
    // Here you would send the order to your backend or state
    alert(
      `Order placed for ${customer.name}!\nTotal: ₹${total}\nItems: ${cart
        .map((item) => `${item.stock.name} x${item.quantity}`)
        .join(", ")}`
    )
    clearCart()
    sessionStorage.removeItem("order_customer")
    navigate("/dashboard/orders/new")
  }

  if (!customer) {
    return (
      <div className='p-8 text-center text-red-600'>
        No customer selected.{" "}
        <button className='underline' onClick={() => navigate("/orders/new")}>
          Go back
        </button>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8'>
      <div className='max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6'>
        <h1 className='text-2xl font-bold text-blue-700 mb-6'>Review & Checkout</h1>
        <div className='mb-4'>
          <div className='font-medium'>Customer:</div>
          <div>
            {customer.name} ({customer.address})
          </div>
        </div>
        <div className='mb-6'>
          <h2 className='text-lg font-semibold mb-2'>Items</h2>
          {cart.length === 0 ? (
            <div className='text-gray-400'>Cart is empty.</div>
          ) : (
            <table className='min-w-full bg-white border border-gray-200 rounded'>
              <thead>
                <tr>
                  <th className='px-4 py-2 border-b'>Stock</th>
                  <th className='px-4 py-2 border-b'>Unit Price</th>
                  <th className='px-4 py-2 border-b'>Quantity</th>
                  <th className='px-4 py-2 border-b'>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.stock.id}>
                    <td className='px-4 py-2 border-b'>{item.stock.name}</td>
                    <td className='px-4 py-2 border-b text-right'>₹{item.stock.unitPrice}</td>
                    <td className='px-4 py-2 border-b text-right'>{item.quantity}</td>
                    <td className='px-4 py-2 border-b text-right'>₹{item.stock.unitPrice * item.quantity}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={3} className='px-4 py-2 border-b text-right font-bold'>
                    Total
                  </td>
                  <td className='px-4 py-2 border-b text-right font-bold'>₹{total}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
        <div className='flex justify-between'>
          <button
            onClick={() => navigate("/orders/new")}
            className='bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400 transition-colors'
          >
            Back
          </button>
          <button
            onClick={handleCheckout}
            className='bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors'
            disabled={cart.length === 0}
          >
            Checkout & Place Order
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReviewOrderPage
