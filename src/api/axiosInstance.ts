import axios from "axios";

export const axiosInstance = axios.create({
  withCredentials: false,
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use((res) => {
  return Promise.resolve(res);
}, handleRepositoryError);

async function handleRepositoryError(error: Error) {
  // custom error for more type of error
  return Promise.reject(error);
}

export default axiosInstance;
