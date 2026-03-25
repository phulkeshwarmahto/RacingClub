import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
const normalizedApiUrl = apiUrl.replace(/\/$/, "");
const baseURL = normalizedApiUrl.endsWith("/api") ? normalizedApiUrl : `${normalizedApiUrl}/api`;

export const http = axios.create({
  baseURL,
  withCredentials: true
});
