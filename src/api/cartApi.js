import api from ".";

export const getCart = (data) => api.get("/api/carts", data);

export const addToCart = (data) => api.post("/api/carts", data);

export const removeFromCart = (productId) =>
  api.delete(`/api/carts/${productId}`);
