import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

// Automatic token addition through an interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const renewAccessToken = async () => {
  try {
    const response = await axios.post(`${API_URL}/auth/refresh`, null, {
      withCredentials: true, // Sends httpOnly cookies if used (No idea what this does)
    });
    const { accessToken } = response.data;
    localStorage.setItem("accessToken", accessToken);
    return accessToken;
  } catch (error) {
    console.error("Error renovando el Access Token:", error);
    throw error;
  }
};

// Interceptor for response
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response && error.response.status === 401 
      && !originalRequest._retry // Negate the retry to avoid infinite loops
    ) {
      originalRequest._retry = true; //Change retry to true

      try {
        const newAccessToken = await renewAccessToken();
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest); // Retry the original request
      } catch (renewError) {
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return Promise.reject(renewError);
      }
    }

    // Reject other errors
    return Promise.reject(error);
  }
);

export default axiosInstance;
