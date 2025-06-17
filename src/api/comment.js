import api from ".";

const API = api.create({
  baseURL: "https://backend-b7ar.onrender.com",
});

export const createComment = (data, token) => {
  console.log("📦 Gửi comment:", data);
  return API.post("/api/comments", data, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
};

export const getCommentsByProductId = (productId) =>
  api.get(`/api/comments/${productId}`);
