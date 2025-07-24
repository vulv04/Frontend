import api from ".";

export const createProduct = (data) => api.post("/api/products", data);

export const getProducts = (params) => api.get("/api/products", { params });

export const getProductById = (id) => api.get(`/api/products/${id}`);

export const updateProduct = (id, data) =>
  api.patch(`/api/products/${id}`, data);

export const deleteProduct = (id) =>
  api.patch(`/api/products/${id}/soft-delete`);

export const hardDeleteProduct = (id) =>
  api.delete(`/api/products/${id}/force`);

export const restoreProduct = (id) => api.patch(`/api/products/${id}/restore`);


