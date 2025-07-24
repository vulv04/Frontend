// src/api/orderApi.js
import api from ".";

export const createOrder = async (orderData) => {
  const res = await api.post("/api/orders", orderData);
  return res.data;
};

export const createPayosPayment = (data) => {
  return api.post("/api/payment", data);
};

export const getOrderById = (id) => {
  return api.get(`/api/orders/${id}`);
};

export const getAllOrders = () => {
  return api.get("/api/orders");
};

export const updateOrderStatus = (id, status) => {
  return api.put(`/api/orders/${id}`, { status });
};

export const deleteOrder = (id) => {
  return api.delete(`/api/orders/${id}`);
};
export const cancelOrder = (orderId, data) =>
  axios.put(`/orders/${orderId}/cancel`, data);
