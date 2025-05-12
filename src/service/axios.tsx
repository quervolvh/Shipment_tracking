import Axios from 'axios';

const axios = Axios.create({
  withCredentials: true,
});

axios.interceptors.request.use(function (config) {

  config.headers = {
    'Content-Type': 'application/json',
  } as any;

  return config;

});

export default axios;
