import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_MOVIEDB_BASE_URI,
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Accept = "application/json";
    config.headers.Authorization = `Bearer ${
      import.meta.env.VITE_MOVIEDB_ACCESS_TOKEN
    }`;
    return config;
  },
  (error) => new Promise.reject(error)
);

export default axiosInstance;
