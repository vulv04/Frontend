import api from ".";

export const createVariant = (data) => api.post("/api/variants", data);
export const getVariants = () => api.get("/api/variants");
export const getVariantsByProductId = (productId) =>
  api.get(`/api/variants/product/${productId}`);

export const getVariantById = (id) => api.get(`/api/variants/${id}`);
export const updateVariant = (id, data) =>
  api.patch(`/api/variants/${id}`, data);
export const deleteVariant = (id) => api.delete(`/api/variants/${id}`);
