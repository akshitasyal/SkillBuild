import axios from "axios";
import { HOST } from "./constants";

const api = axios.create({
  baseURL: HOST,
  withCredentials: true,
});

// Request interceptor to add the JWT to headers if available in cookies
api.interceptors.request.use((config) => {
  // In a real scenario, we might want to get this from a more reliable source,
  // but for now, we'll let the withCredentials handle it if it's HttpOnly,
  // or the caller can pass it.
  return config;
});

export default api;
