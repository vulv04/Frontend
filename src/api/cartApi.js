import api from ".";
import axios from "axios";

export const getCart = () => api.get("/api/carts");

export const addToCart = (data) => api.post("/api/carts", data);

// ✅ Sửa để gửi body đúng chuẩn
// cartApi.js
export const removeFromCart = async ({ productId, variantId }) => {
  return await api.delete("/api/carts/delete", {
    params: { productId, variantId },
  });
};

export const clearCart = () => {
  const token = localStorage.getItem("token");
  return api.delete("/api/carts/clear", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// cartApi.js
export const updateCartQuantity = (data) => {
  return api.patch("/api/carts/update-quantity", data);
};

// cartApi.js
export const createPayosOrder = (data) => api.post("/api/orders/payos", data);
