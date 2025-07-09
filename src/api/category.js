import api from ".";

// Danh sách hàm API cho category
export const createCategory = (data) => api.post("/api/categories", data);
export const getCategories = () => api.get("/api/categories");
export const getCategoryById = (id) => api.get(`/api/categories/${id}`);
export const updateCategory = (id, data) =>
  api.patch(`/api/categories/${id}`, data);
export const deleteCategory = (id) => api.delete(`/api/categories/${id}`);
