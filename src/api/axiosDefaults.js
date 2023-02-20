import axios from "axios";

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "http://127.0.0.1:8000/api";
} else {
  axios.defaults.baseURL = "https://pp5-drf-task-api.herokuapp.com/api";
}

axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = false;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
