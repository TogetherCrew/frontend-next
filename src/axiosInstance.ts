import axios from 'axios';
import { Envs, ensureEnvironments } from './config';

const env: Envs = ensureEnvironments();

// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: env.VITE_API_BASE_URL, // Set your base URL here
  // Other configuration options for the instance
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify the request config if needed (e.g., add headers, tokens, etc.)
    console.log('Request interceptor triggered:', config);
    return config;
  },
  (error) => {
    // Handle request error
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Modify the response data if needed
    console.log('Response interceptor triggered:', response);
    return response;
  },
  (error) => {
    // Handle response error
    console.error('Response interceptor error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
