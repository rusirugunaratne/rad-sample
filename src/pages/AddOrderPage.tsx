import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import type { Customer } from "./CustomerPage"
import type { Stock } from "../types/Stock"
import { useCart } from "../context/useCart"

// Sample data (replace with your data source)
const customers: Customer[] = [
  { id: 1, name: "Alice", address: "123 Main St", dateOfBirth: "1990-01-01" },
  { id: 2, name: "Bob", address: "456 Oak Ave", dateOfBirth: "1985-06-12" },
]
const stocks: Stock[] = [
  { id: 1, name: "Rice", unitPrice: 40, availableQty: 100, unit: "kg" },
  { id: 2, name: "Milk", unitPrice: 60, availableQty: 200, unit: "litre" },
  { id: 3, name: "Oil", unitPrice: 120, availableQty: 50, unit: "litre" },
]

const AddOrderPage: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [selectedStockId, setSelectedStockId] = useState<number | "">("")
  const [quantity, setQuantity] = useState<number>(1)
  const { cart, addItem, removeItem, updateQuantity, clearCart } = useCart()
  const navigate = useNavigate()

  const handleAddToCart = () => {
    if (!selectedStockId) return
    const stock = stocks.find((s) => s.id === selectedStockId)
    if (!stock) return
    if (quantity < 1 || quantity > stock.availableQty) {
      alert(`Quantity must be between 1 and ${stock.availableQty}`)
      return
    }
    addItem(stock, quantity)
    setSelectedStockId("")
    setQuantity(1)
  }

  const handleNext = () => {
    if (!selectedCustomer) {
      alert("Please select a customer.")
      return
    }
    if (cart.length === 0) {
      alert("Cart is empty.")
      return
    }
    // Save selected customer in sessionStorage for next page
    sessionStorage.setItem("order_customer", JSON.stringify(selectedCustomer))
    navigate("/dashboard/orders/review")
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8'>
      <div className='max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6'>
        <h1 className='text-2xl font-bold text-blue-700 mb-6'>New Order: Add Items</h1>

        {/* Customer Selection */}
        <div className='mb-6'>
          <label className='block font-medium mb-1'>Select Customer</label>
          <select
            className='w-full border rounded px-3 py-2'
            value={selectedCustomer?.id || ""}
            onChange={(e) => {
              const id = Number(e.target.value)
              setSelectedCustomer(customers.find((c) => c.id === id) || null)
            }}
          >
            <option value=''>-- Select customer --</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.address})
              </option>
            ))}
          </select>
        </div>

        {/* Stock Selection */}
        <div className='mb-6 flex gap-2 items-end'>
          <div className='flex-1'>
            <label className='block font-medium mb-1'>Stock</label>
            <select
              className='w-full border rounded px-3 py-2'
              value={selectedStockId}
              onChange={(e) => setSelectedStockId(Number(e.target.value))}
            >
              <option value=''>-- Select stock --</option>
              {stocks.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} (₹{s.unitPrice} per {s.unit}, {s.availableQty} left)
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className='block font-medium mb-1'>Quantity</label>
            <input
              type='number'
              min={1}
              max={selectedStockId ? stocks.find((s) => s.id === selectedStockId)?.availableQty || 1 : 1}
              className='w-24 border rounded px-3 py-2'
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              disabled={!selectedStockId}
            />
          </div>
          <button
            onClick={handleAddToCart}
            className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors'
            disabled={!selectedStockId}
          >
            Add to Cart
          </button>
        </div>

        {/* Cart Table */}
        <div className='mb-6'>
          <h2 className='text-lg font-semibold mb-2'>Cart</h2>
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
                  <th className='px-4 py-2 border-b'></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.stock.id}>
                    <td className='px-4 py-2 border-b'>{item.stock.name}</td>
                    <td className='px-4 py-2 border-b text-right'>₹{item.stock.unitPrice}</td>
                    <td className='px-4 py-2 border-b text-right'>
                      <input
                        type='number'
                        min={1}
                        max={item.stock.availableQty}
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.stock.id, Number(e.target.value))}
                        className='w-16 border rounded px-2 py-1'
                      />
                    </td>
                    <td className='px-4 py-2 border-b text-right'>₹{item.stock.unitPrice * item.quantity}</td>
                    <td className='px-4 py-2 border-b text-center'>
                      <button onClick={() => removeItem(item.stock.id)} className='text-red-500 hover:underline'>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Next Button */}
        <div className='flex justify-end'>
          <button
            onClick={handleNext}
            className='bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors'
            disabled={!selectedCustomer || cart.length === 0}
          >
            Next: Review Order
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddOrderPage
