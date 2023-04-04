import axios from "axios";

// Define authorization header for requests
const onRequest = (config) => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    config.headers["Authorization"] = `Bearer ${token.access}`;
  }

  return config;
};

const onRequestError = (error) => {
  return Promise.reject(error);
};

const onResponse = (response) => {
  return response;
};

const onResponseError = async (error) => {
  if (error.response) {
    // Access Token expired
    if (
      error.response.status === 401 &&
      error.response.data.code === "token_not_valid"
    ) {
      const storedToken = JSON.parse(localStorage.getItem("token"));
      try {
        const originalRequest = error.config;
        const rs = await axios.post("profiles/token/refresh/", {
          refresh: storedToken.refresh,
        });
        storedToken.access = rs.data.access;
        localStorage.setItem("token", JSON.stringify(storedToken));
        // Retry request with original headers and data
        const data =
          typeof originalRequest.data === "string"
            ? JSON.parse(originalRequest.data)
            : originalRequest.data;
        return axios({
          ...originalRequest,
          data,
          headers: { Authorization: `Bearer ${rs.data.access}` },
        });
      } catch (error) {
        localStorage.removeItem("token");
        return Promise.reject(error);
      }
    }
  }
  return Promise.reject(error);
};

export const setupInterceptorsTo = (axiosInstance) => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
};
