import api from ".";

export const createNews = async (data) => {
  const res = await api.post("/api/news", data);
  return res.data;
};

export const getAllNews = async () => {
  const res = await api.get("/api/news");
  return res.data;
};

export const getNewsById = async (id) => {
  const res = await api.get(`/api/news/${id}`);
  return res.data;
};

export const getNewsBySlug = async (slug) => {
  const res = await api.get(`/api/news/${slug}`);
  return res.data;
};
export const updateNews = async (id, data) => {
  const res = await api.put(`/api/news/${id}`, data);
  return res.data;
};
export const deleteNews = async (id) => {
  const res = await api.delete(`/api/news/${id}`);
  return res.data;
};
