import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-b7ar.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
