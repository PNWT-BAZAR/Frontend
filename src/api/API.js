import axios from 'axios';

const API =  axios.create({
  baseURL: process.env.REACT_APP_SERVER_API_URL,
});

API.interceptors.request.use(function (config) {
  config.headers.Authorization = "Bearer " + localStorage.getItem("access_token");
  return config;
});

export default API;