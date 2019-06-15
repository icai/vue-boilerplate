import axios from "axios";

let baseURL = process.env.NODE_ENV === 'production'
  ? '/api/'
  : '/api/';

const inc = axios.create({ baseURL });

inc.interceptors.request.use(function (config) {
  return config
})

inc.interceptors.response.use(function (res) {
  return res
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
})



export default inc;
