import api from ".";

export const getAllBrands = () => api.get("/api/brands");
export const deleteBrand = (id) => api.delete(`/api/brands/${id}`); // xoá cứng
export const softDeleteBrand = (id) =>
  api.patch(`/api/brands/${id}/soft-delete`);
export const toggleBrandStatus = (id) => api.patch(`/api/brands/${id}/toggle`);
export const restoreBrand = (id) => api.patch(`/api/brands/${id}/restore`);
export const getBrandById = (id) => api.get(`/api/brands/${id}`);
export const updateBrand = (id, data) => api.patch(`/api/brands/${id}`, data);
export const createBrand = (data) => api.post("/api/brands", data);
export const getBrandsTrash = () => api.get("/api/brands/trash");
