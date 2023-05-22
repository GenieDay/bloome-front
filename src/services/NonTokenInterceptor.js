import axios from "axios";

const NonTokenInterceptor = axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
  timeout: 15000,
});

// request interceptors
NonTokenInterceptor.interceptors.request.use(

  function (config) {
    return config;
    
  },
  function (error) {
    return Promise.reject(error);
  }
);

NonTokenInterceptor.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // const status = error.response.status;

    // switch (status) {

    //   case 401: {
    //     window.location.href = '/';
    //     return Promise.reject(error.message);
    //   }

    //   case 403: {
    //     window.location.href = "/";
    //     return Promise.reject(error.message);
    //   }

    //   default : {
    //     return Promise.reject(error.message);
    //   }
    // }
    return Promise.reject(error);
  }
);

export default NonTokenInterceptor;
