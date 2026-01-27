import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true
});

api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      const refreshRes = await api.post("/auth/refresh");
      localStorage.setItem(
        "accessToken",
        refreshRes.data.accessToken
      );
      error.config.headers.Authorization =
        `Bearer ${refreshRes.data.accessToken}`;
      return api(error.config);
    }
    return Promise.reject(error);
  }
);

export default api;
