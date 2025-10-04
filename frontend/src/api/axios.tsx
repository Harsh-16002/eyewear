import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // root of your backend API
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: automatically attach token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
