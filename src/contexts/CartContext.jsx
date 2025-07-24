import { createContext, useContext, useState, useEffect } from "react";
import { getCart, removeFromCart } from "../api/cartApi";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Lấy giỏ hàng từ API
  const fetchCart = async () => {
    try {
      const res = await getCart();
      setCartItems(res.data.items || []);
    } catch (err) {
      console.error("Lỗi khi lấy giỏ hàng:", err);
      setCartItems([]);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Cập nhật số lượng và tổng tiền mỗi khi cartItems thay đổi
  useEffect(() => {
    const calcTotalQuantity = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    const calcTotalPrice = cartItems.reduce((total, item) => {
      const price = item.variantId?.price || item.productId?.price || 0;
      return total + price * item.quantity;
    }, 0);

    setTotalQuantity(calcTotalQuantity);  
    setTotalPrice(calcTotalPrice);
  }, [cartItems]);

  const addItem = (newItem) => {
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
      setCartItems((prev) => [...prev, { ...newItem }]);
    }
  };

  const removeCartContext = async (productId, color, size) => {
    try {
      await removeFromCart(productId, color, size);
      fetchCart(); // cập nhật lại cart sau khi xóa
    } catch (err) {
      console.error("Lỗi khi xóa sản phẩm:", err);
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

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addItem,
        removeCartContext,
        updateCartQuantity,
        totalQuantity,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
