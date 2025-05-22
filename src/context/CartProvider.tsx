import React, { useReducer } from "react"
import { CartContext } from "./CartContext"
import type { Stock } from "../types/Stock"
import { cartReducer, type CartState } from "../reducers/card-reducer"

type Props = { children: React.ReactNode }

export const CartProvider = ({ children }: Props) => {
  const [cart, dispatch] = useReducer(cartReducer, [] as CartState)

  const addItem = (stock: Stock, quantity: number) => dispatch({ type: "ADD_ITEM", payload: { stock, quantity } })
  const removeItem = (stockId: number) => dispatch({ type: "REMOVE_ITEM", payload: { stockId } })
  const updateQuantity = (stockId: number, quantity: number) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { stockId, quantity } })
  const clearCart = () => dispatch({ type: "CLEAR" })

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}
