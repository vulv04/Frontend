// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { getCart } from "../api/cartApi";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    try {
      const res = await getCart();
      setCartItems(res.data.items);
    } catch (err) {
      console.error("Lỗi lấy giỏ hàng:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
