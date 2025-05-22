import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import type { Customer } from "./CustomerPage"
import type { OrderWithPrice } from "../types/Order"
import OrderTable from "../components/tables/OrderTable"

// Sample data
const customers: Customer[] = [
  { id: 1, name: "Alice", address: "123 Main St", dateOfBirth: "1990-01-01" },
  { id: 2, name: "Bob", address: "456 Oak Ave", dateOfBirth: "1985-06-12" },
]

const ordersSample: OrderWithPrice[] = [
  {
    createdAt: "2025-05-21T10:30:00",
    customer: customers[0],
    items: [
      { stockName: "Rice", quantity: 2 },
      { stockName: "Milk", quantity: 1 },
    ],
    finalPrice: 140,
  },
  {
    createdAt: "2025-05-22T12:15:00",
    customer: customers[1],
    items: [
      { stockName: "Oil", quantity: 1 },
      { stockName: "Milk", quantity: 3 },
    ],
    finalPrice: 300,
  },
]

const OrderPage: React.FC = () => {
  const navigate = useNavigate()
  // You can replace this with useState/useEffect if you want to fetch orders from API or context
  const [orders] = useState<OrderWithPrice[]>(ordersSample)

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8'>
      <div className='max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6'>
        <div className='flex items-center justify-between mb-6'>
          <h1 className='text-2xl font-bold text-blue-700'>Orders</h1>
          <button
            onClick={() => navigate("/dashboard/orders/new")}
            className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors'
          >
            + Add Order
          </button>
        </div>
        <OrderTable orders={orders} />
      </div>
    </div>
  )
}

export default OrderPage
