import api from ".";

export const createOrder = (data) => api.post("/api/orders", data);

export const getOrders = () => api.get("/api/orders");

export const getOrderById = (id) => api.get(`/api/orders/${id}`);

export const updateOrder = (id, data) => api.put(`/api/orders/${id}`, data);

export const deleteOrder = (id) => api.delete(`/api/orders/${id}`);
