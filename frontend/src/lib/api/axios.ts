import Axios from 'axios';

const axios = Axios.create({
  baseURL: process.env.REACT_APP_API_SERVER,
});
axios.defaults.headers.common['Content-Type'] = 'application/json';

export default axios;
