import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API_URL,
});

API.interceptors.request.use(function (config) {
  config.headers.Authorization = localStorage.getItem("access_token");
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/login";
    }
    console.log(error);
  }
);

export default API;
