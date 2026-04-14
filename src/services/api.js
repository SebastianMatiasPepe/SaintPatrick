import axios from 'axios';

// Create an axios instance with the base URL of the API
const api = axios.create({
  baseURL: 'https://apibanktest.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add a request interceptor to handle authentication
api.interceptors.request.use(
  (config) => {
    // Try to get the full token first
    const fullToken = localStorage.getItem('fullToken');
    if (fullToken) {
      config.headers.Authorization = `${fullToken}`;
    } else {
      // Fall back to the regular token if full token is not available
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;