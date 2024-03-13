import axios from 'axios';
import queryString from 'query-string';
export const axiosClient = axios.create({
  paramsSerializer: params => queryString.stringify(params),
  baseURL: 'http://192.168.1.17:3000',
});
// Add a request interceptor
axios.interceptors.request.use(
  function (config: any) {
    // Do something before request is sent
    config.headers = {
      Authorization: '',
      Accept: 'application/json',
      ...config.headers,
    };
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);
