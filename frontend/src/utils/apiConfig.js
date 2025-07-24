import axios from "axios";

export const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
export const EMPLOYEES_PATH = `/employees`;
export const NOVELTIES_PATH = `/novelties`;
export const CONCEPTS_PATH = `/concepts`;
export const AUTH_PATH = `/auth`;
export const SETTLEMENTS_PATH = `/settlements`;
export const PERIODS_PATH = `/periods`;
export const USERS_PATH = `/users`;

// Instancia de Axios con interceptor para manejar expiración de sesión
const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;