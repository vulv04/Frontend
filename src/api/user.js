import api from ".";

// Lấy thông tin user hiện tại (yêu cầu token)
export const getUserById = (id) => api.get(`/users/${id}`);
// Cập nhật thông tin user
export const updateUser = (userId, data) => {
  return api.put(`/users/${userId}`, data);
};
export const getAllUsers = () => {
  return api.get("/users");
};
