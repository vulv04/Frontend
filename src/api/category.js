import api from ".";

// Tạo danh mục mới
export const createCategory = (data) => api.post("/api/categories", data);

// Lấy tất cả danh mục
export const getCategories = () => api.get("/api/categories");

// Lấy chi tiết danh mục theo ID
export const getCategoryById = (id) => api.get(`/api/categories/${id}`);

// Cập nhật danh mục
export const updateCategory = (id, data) =>
  api.patch(`/api/categories/${id}`, data);

// Xóa cứng danh mục
export const deleteCategory = (id) => api.delete(`/api/categories/${id}`);

// Xóa mềm danh mục
export const softDeleteCategory = (id) =>
  api.delete(`/api/categories/soft-delete/${id}`);

// Khôi phục danh mục đã xóa mềm
export const restoreCategory = (id) =>
  api.patch(`/api/categories/restore/${id}`);

// Lấy danh sách danh mục xóa mềm
export const getDeletedCategories = () => api.get("/api/categories/trash");
