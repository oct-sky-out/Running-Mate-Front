import Axios from 'axios';
import { env } from 'process';

const axios = Axios.create({
  baseURL: env.REACT_APP_RUNNING_PUBLIC_API_SERVER_URL,
});

export default axios;
