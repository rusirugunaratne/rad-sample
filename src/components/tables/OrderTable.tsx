import React from "react"

// Types
export type OrderItem = {
  stockName: string
  quantity: number
}

export type Customer = {
  id: number
  name: string
  address: string
  dateOfBirth: string
}

export type OrderWithPrice = {
  createdAt: string
  customer: Customer
  items: OrderItem[]
  finalPrice: number
}

type OrderTableProps = {
  orders: OrderWithPrice[]
}

const OrderTable: React.FC<OrderTableProps> = ({ orders }) => (
  <div className='overflow-x-auto'>
    <table className='min-w-full bg-white border border-gray-200 rounded'>
      <thead>
        <tr>
          <th className='px-4 py-2 border-b'>Created At</th>
          <th className='px-4 py-2 border-b'>Customer</th>
          <th className='px-4 py-2 border-b'>Items</th>
          <th className='px-4 py-2 border-b'>Final Price</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          <tr key={index} className='hover:bg-gray-50'>
            <td className='px-4 py-2 border-b'>{new Date(order.createdAt).toLocaleString()}</td>
            <td className='px-4 py-2 border-b'>{order.customer.name}</td>
            <td className='px-4 py-2 border-b'>
              <ul className='list-disc list-inside'>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.stockName} x {item.quantity}
                  </li>
                ))}
              </ul>
            </td>
            <td className='px-4 py-2 border-b text-right'>₹{order.finalPrice}</td>
          </tr>
        ))}
        {orders.length === 0 && (
          <tr>
            <td colSpan={4} className='text-center py-6 text-gray-400'>
              No orders found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
)

export default OrderTable
