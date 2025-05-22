import { createContext } from "react"
import type { Stock } from "../types/Stock"
import type { CartItem } from "../types/Order"

export type CartContextType = {
  cart: CartItem[]
  addItem: (stock: Stock, quantity: number) => void
  removeItem: (stockId: number) => void
  updateQuantity: (stockId: number, quantity: number) => void
  clearCart: () => void
}

export const CartContext = createContext<CartContextType | undefined>(undefined)
