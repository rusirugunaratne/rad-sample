import type { OrderItem } from "../components/tables/OrderTable"
import type { Customer } from "./Customer"
import type { Stock } from "./Stock"

export type CartItem = {
  stock: Stock
  quantity: number
}

export type Order = {
  customer: Customer
  items: CartItem[]
  total: number
}

export type OrderWithPrice = {
  createdAt: string;
  customer: Customer;
  items: OrderItem[];
  finalPrice: number;
};