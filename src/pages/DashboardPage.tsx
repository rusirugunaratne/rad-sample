import React from "react"
import { Bar, Pie } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from "chart.js"

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend)

// --- Type Definitions ---
interface Customer {
  id: number
  name: string
  address: string
  dateOfBirth: string
}

interface Stock {
  name: string
  unitPrice: number
  availableQty: number
  unit: string
}

interface OrderItem {
  stockName: string
  quantity: number
}

interface Order {
  createdAt: string
  items: OrderItem[]
  customerId: number
}

interface OrderWithPrice extends Order {
  finalPrice: number
}

// --- Hardcoded Data ---
const customers: Customer[] = [
  { id: 1, name: "Alice", address: "123 Main St", dateOfBirth: "1990-01-01" },
  { id: 2, name: "Bob", address: "456 Oak Ave", dateOfBirth: "1985-06-12" },
  { id: 3, name: "Charlie", address: "789 Pine Rd", dateOfBirth: "1992-11-23" },
]

const stocks: Stock[] = [
  { name: "Rice", unitPrice: 40, availableQty: 100, unit: "kg" },
  { name: "Milk", unitPrice: 60, availableQty: 200, unit: "litre" },
  { name: "Oil", unitPrice: 120, availableQty: 50, unit: "litre" },
]

const orders: Order[] = [
  {
    createdAt: "2025-05-21T10:30:00",
    items: [
      { stockName: "Rice", quantity: 2 },
      { stockName: "Milk", quantity: 1 },
    ],
    customerId: 1,
  },
  {
    createdAt: "2025-05-22T12:15:00",
    items: [
      { stockName: "Oil", quantity: 1 },
      { stockName: "Milk", quantity: 3 },
    ],
    customerId: 2,
  },
  {
    createdAt: "2025-05-22T15:45:00",
    items: [{ stockName: "Rice", quantity: 5 }],
    customerId: 3,
  },
]

// --- Helper Functions ---
const getOrderTotal = (order: Order): number =>
  order.items.reduce((sum, item) => {
    const stock = stocks.find((s) => s.name === item.stockName)
    return sum + (stock ? stock.unitPrice * item.quantity : 0)
  }, 0)

const ordersWithPrice: OrderWithPrice[] = orders.map((order) => ({
  ...order,
  finalPrice: getOrderTotal(order),
}))

// --- Chart Data ---

// Orders per customer (Pie)
const ordersPerCustomer = customers.map((c) => orders.filter((o) => o.customerId === c.id).length)
const ordersPerCustomerData = {
  labels: customers.map((c) => c.name),
  datasets: [
    {
      data: ordersPerCustomer,
      backgroundColor: ["#60a5fa", "#34d399", "#fbbf24"],
    },
  ],
}

// Stock quantities (Bar)
const stockQtyData = {
  labels: stocks.map((s) => s.name),
  datasets: [
    {
      label: "Available Quantity",
      data: stocks.map((s) => s.availableQty),
      backgroundColor: ["#60a5fa", "#34d399", "#fbbf24"],
    },
  ],
}

// Sales per stock (Bar)
const salesPerStock = stocks.map((stock) =>
  ordersWithPrice.reduce((sum, order) => {
    const item = order.items.find((i) => i.stockName === stock.name)
    return sum + (item ? item.quantity : 0)
  }, 0)
)
const salesPerStockData = {
  labels: stocks.map((s) => s.name),
  datasets: [
    {
      label: "Total Sold",
      data: salesPerStock,
      backgroundColor: ["#60a5fa", "#34d399", "#fbbf24"],
    },
  ],
}

// Total revenue
const totalRevenue = ordersWithPrice.reduce((sum, o) => sum + o.finalPrice, 0)

// --- Components ---
const DashboardPage: React.FC = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8'>
      <h1 className='text-4xl font-extrabold text-blue-700 mb-8 drop-shadow-lg text-center'>Dashboard</h1>

      {/* Statistics */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-10'>
        <StatCard label='Customers' value={customers.length} color='bg-blue-500' />
        <StatCard label='Stocks' value={stocks.length} color='bg-green-500' />
        <StatCard label='Orders' value={orders.length} color='bg-yellow-500' />
        <StatCard label='Total Revenue' value={`$${totalRevenue.toLocaleString()}`} color='bg-purple-500' />
      </div>

      {/* Charts */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <ChartCard title='Orders per Customer'>
          <Pie data={ordersPerCustomerData} />
        </ChartCard>
        <ChartCard title='Stock Quantities'>
          <Bar data={stockQtyData} options={{ responsive: true }} />
        </ChartCard>
        <ChartCard title='Sales per Stock'>
          <Bar data={salesPerStockData} options={{ responsive: true }} />
        </ChartCard>
      </div>
    </div>
  )
}

export default DashboardPage

// --- Helper Components ---
interface StatCardProps {
  label: string
  value: string | number
  color: string
}
function StatCard({ label, value, color }: StatCardProps) {
  return (
    <div className={`rounded-lg shadow-md p-6 flex flex-col items-center ${color} text-white`}>
      <div className='text-3xl font-bold'>{value}</div>
      <div className='text-lg mt-2'>{label}</div>
    </div>
  )
}

interface ChartCardProps {
  title: string
  children: React.ReactNode
}
function ChartCard({ title, children }: ChartCardProps) {
  return (
    <div className='bg-white rounded-xl shadow-lg p-6 flex flex-col items-center'>
      <h2 className='text-xl font-semibold mb-4'>{title}</h2>
      <div className='w-full h-64'>{children}</div>
    </div>
  )
}
