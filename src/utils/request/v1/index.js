import axios from 'axios';
import RequestInterceptors from './interceptors/request';
import ResponseInterceptors from './interceptors/response';

const instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 8000
});

RequestInterceptors(instance);
ResponseInterceptors(instance);

export default instance;
