import axios from "axios";
import { API_ROOT } from "../constants";
import { getAccessToken } from "../storage";
import { logoutUser } from "../logoutUser";

const axiosInstance = axios.create({
  baseURL: `${API_ROOT}/api/v1`,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle token expiration or unauthorized access
      logoutUser();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
