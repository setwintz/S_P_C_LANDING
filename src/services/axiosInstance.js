import axios from 'axios';

// Create Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000', // Fallback URL
  withCredentials: true, // Include cookies for refresh token
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("SAAS_ERP1_CLIENT_TACCESS_TOKEN");

    // const token = window.accessToken; // Access token stored in memory (e.g., React context)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token expiry
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/v1/client/auth/refresh-token`,
          {},
          { withCredentials: true }
        );
        // window.accessToken = data.accessToken; // Update token in memory
        localStorage.setItem("SAAS_ERP1_CLIENT_TACCESS_TOKEN", data.accessToken);


        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest); // Retry original request
      } catch (refreshError) {
        window.accessToken = null; // Clear token
        localStorage.removeItem("SAAS_ERP1_CLIENT_TACCESS_TOKEN");
        document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        alert("Your session has exoired")
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// Function to fetch company data
export const getCompanyData = async () => {
  try {
    if (!window.accessToken) {
      throw new Error('No access token available. Please log in.');
    }
    const response = await api.get('/api/getCompanyName');
    return response.data; // Return only the data
  } catch (error) {
    if (error.response) {
      // Server responded with a status code
      const { status, data } = error.response;
      if (status === 401) {
        throw new Error('Session expired. Please log in again.');
      } else if (status === 403) {
        throw new Error('You do not have permission to access this resource.');
      } else {
        throw new Error(data.message || 'Failed to fetch company data.');
      }
    } else if (error.request) {
      // No response received
      throw new Error('Network error. Please check your connection and try again.');
    } else {
      // Error setting up the request
      throw new Error(error.message || 'An unexpected error occurred.');
    }
  }
};

export default api;