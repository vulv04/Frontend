import api from ".";

export const createOrder = (data) => api.post("/api/orders", data);

export const getAllOrders = (params = {}) => {
  return instance.get("/orders", { params });
};

export const updateOrderStatus = (id, status) => {
  return instance.put(`/orders/${id}/status`, { status });
};

export const getOrderById = (id) => api.get(`/api/orders/${id}`);

export const deleteOrder = (id) => api.delete(`/api/orders/${id}`);

export const getMyOrders = () => {
  return api.get("/orders/my-orders");
};
