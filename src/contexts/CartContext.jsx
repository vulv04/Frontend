// contexts/CartContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { getCart } from "../api/cartApi";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await getCart();
      setCartItems(res.data.items);
    } catch (err) {
      console.error("Lỗi khi lấy giỏ hàng:", err);
    }
  };

  const addItem = (newItem) => {
    // Nếu sản phẩm đã tồn tại, cập nhật số lượng
    const exists = cartItems.find(
      (item) =>
        item.productId._id === newItem.productId &&
        item.color === newItem.color &&
        item.size === newItem.size
    );
    if (exists) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.productId._id === newItem.productId &&
          item.color === newItem.color &&
          item.size === newItem.size
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        )
      );
    } else {
      setCartItems((prev) => [
        ...prev,
        { ...newItem, quantity: newItem.quantity },
      ]);
    }
  };
  const updateCartQuantity = (productId, color, size, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId._id === productId &&
        item.color === color &&
        item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromCart = (productId, color, size) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.productId._id === productId &&
            item.color === color &&
            item.size === size
          )
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addItem,
        removeFromCart,
        updateCartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
