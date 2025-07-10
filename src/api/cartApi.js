import api from ".";

export const getCart = () => api.get("/api/carts");

export const addToCart = (data) => api.post("/api/carts", data);

export const removeFromCart = (productId) =>
  api.delete(`/api/carts/${productId}`);

export const updateCartQuantity = (productId, quantity) =>
  api.patch(`/api/carts/${productId}`, { quantity });
