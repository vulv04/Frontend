import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i._id === item._id);
      if (existing) {
        return prev.map((i) =>
          i._id === item._id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, { ...item }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) => (item._id === id ? { ...item, quantity } : item))
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
