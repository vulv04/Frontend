import api from ".";

const API = api.create({
  baseURL: "http://localhost:3000",
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
