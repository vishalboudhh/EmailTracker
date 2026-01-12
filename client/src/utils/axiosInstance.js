import axios from "axios";

// Ensure we always hit the backend `/api` prefix even if VITE_API_URL
// is provided without it (common cause of 404s in dev/prod).
const rawBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
const baseURL = rawBaseUrl.endsWith("/api")
  ? rawBaseUrl
  : `${rawBaseUrl.replace(/\/$/, "")}/api`;

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

// Attach token before every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle auth errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Force logout
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
