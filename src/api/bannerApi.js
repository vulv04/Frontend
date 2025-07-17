import api from ".";

export const getBanners = () => api.get("/api/banners");
export const getBannerById = (id) => api.get(`/api/banners/${id}`);
export const createBanner = (data) => api.post("/api/banners", data);
export const updateBanner = (id, data) => api.put(`/api/banners/${id}`, data);
export const deleteBanner = (id) => api.delete(`/api/banners/${id}`);
