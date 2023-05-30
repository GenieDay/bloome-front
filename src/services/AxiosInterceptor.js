import axios from "axios";

const TokenInterceptor = axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
  timeout: 15000,
});

// request interceptors
TokenInterceptor.interceptors.request.use(
  function (config) {
    if (localStorage.getItem("userInfo")) {
      config.headers.Authorization =
        "Bearer " + JSON.parse(localStorage.getItem("userInfo")).accessToken;
    } 
    else {
      config.headers.Authorization ="Bearer 0.0.0";
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

TokenInterceptor.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const status = error.response.status;

    switch (status) {
      case 401: {
        window.location.href = "/";
        return Promise.reject(error.message);
      }

      case 403: {
        window.location.href = "/";
        return Promise.reject(error.message);
      }

      default: {
        return Promise.reject(error);
      }
    }
  }
);

export default TokenInterceptor;
