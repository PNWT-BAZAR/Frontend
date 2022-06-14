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
      console.log(window.location.href);
      let urlWordsArray = window.location.href.split("/");
      if(urlWordsArray[urlWordsArray.length - 1] !== "login"){
        window.location.href = "/login";
      }
    }
    console.log(error);
  }
);

export default API;
