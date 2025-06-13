// src/api/cart.js
import api from ".";

export const cartApi = (data) => api.post("/cart", data);
