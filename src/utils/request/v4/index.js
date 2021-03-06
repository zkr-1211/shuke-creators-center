import RequestInterceptors from './interceptors/request';
import ResponseInterceptors from './interceptors/response';
import axios from 'axios';
import api from '../../../config/api';

const instance = axios.create({
    // baseURL: process.env.VUE_APP_BASE_API,
    baseURL: api.systemURL,
    timeout: 8000
});

RequestInterceptors(instance);
ResponseInterceptors(instance);

export default instance;
