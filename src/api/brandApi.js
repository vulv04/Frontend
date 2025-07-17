import api from ".";

export const getBrands = () => api.get("/api/brands");
export const getBrandById = (id) => api.get(`/api/brands/${id}`);
export const createBrand = (data) => api.post("/api/brands", data);
export const updateBrand = (id, data) => api.put(`/api/brands/${id}`, data);
export const deleteBrand = (id) => api.delete(`/api/brands/${id}`);
