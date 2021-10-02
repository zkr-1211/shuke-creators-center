import RequestInterceptors from './interceptors/request';
import ResponseInterceptors from './interceptors/response';
import axios from 'axios';
import api from '@/config/api';
const instance = axios.create({
    // baseURL: process.env.VUE_APP_BASE_API,
    baseURL: api.systemURL,
    // baseURL:'http://www.blogry.cn/test',
    timeout: 8000
});

//请求拦截器
RequestInterceptors(instance);
//响应拦截器
ResponseInterceptors(instance);

export default instance;