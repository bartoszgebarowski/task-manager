import axios from "axios";
import { setupInterceptorsTo } from "./axiosAuth";

if (process.env.REACT_APP_API_ACCESS === "LOCAL") {
  axios.defaults.baseURL = "http://127.0.0.1:8000/api";
} else {
  axios.defaults.baseURL = "https://pp5-drf-task-api.herokuapp.com/api";
}

const api = setupInterceptorsTo(
  axios.create({
    headers: {
      "Content-Type": "application/json",
    },
  })
);

export default api;
