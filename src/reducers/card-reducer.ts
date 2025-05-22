import type { Stock } from "../types/Stock"
import type { CartItem } from "../types/Order"

export type CartAction =
  | { type: "ADD_ITEM"; payload: { stock: Stock; quantity: number } }
  | { type: "REMOVE_ITEM"; payload: { stockId: number } }
  | { type: "UPDATE_QUANTITY"; payload: { stockId: number; quantity: number } }
  | { type: "CLEAR" }

export type CartState = CartItem[]

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const idx = state.findIndex((item) => item.stock.id === action.payload.stock.id)
      if (idx !== -1) {
        return state.map((item, i) =>
          i === idx ? { ...item, quantity: item.quantity + action.payload.quantity } : item
        )
      }
      return [...state, { stock: action.payload.stock, quantity: action.payload.quantity }]
    }
    case "REMOVE_ITEM":
      return state.filter((item) => item.stock.id !== action.payload.stockId)
    case "UPDATE_QUANTITY":
      return state.map((item) =>
        item.stock.id === action.payload.stockId ? { ...item, quantity: action.payload.quantity } : item
      )
    case "CLEAR":
      return []
    default:
      return state
  }
}
