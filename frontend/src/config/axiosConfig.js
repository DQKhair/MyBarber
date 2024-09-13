import axios from "axios";
import { API_URL } from "../constants/constants";

// config axios JWT req http(s) method with token
const axiosRoot = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

axiosRoot.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken !== "null" && accessToken !== null) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosRoot.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // handle expire token
    if (error.response && error.response.status === 401) {
      window.location.href = "/login";
    }
    
    return Promise.reject(error);
  }
);

export default axiosRoot;
