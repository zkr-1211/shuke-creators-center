import request from '@/utils/request/v4';
import qs from 'qs'
export function RegisterApi(data) {
    return request({
        url: '/api/v1/account/register',
        method: 'POST',
        data:qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    });
}
export function LoginApi(data) {
    return request({
        url: '/api/v1/account/login',
        method: 'POST',
        data:qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    });
}