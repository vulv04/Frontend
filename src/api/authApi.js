import api from ".";

export const loginApi = (data) => api.post("/api/auth/login", data);
export const registerApi = (data) => api.post("/api/auth/register", data);
