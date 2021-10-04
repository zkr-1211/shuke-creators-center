import {
    AuthException,
    PermissionException,
    SystemException,
    UserException
} from '@/utils/request/exception';

import { MessageBox } from 'element-ui';
import router from '@/router';
import store from '@/store';

async function errorHandler(res) {
    if (!res.status) {
        throw new Error('网络连接失败，请稍后再试');
    }
    switch (res.status) {
        case 401: {
            if (res.data.errcode === 'AUTH_REQUIRE_REALNAME_VERIFY') {
                throw new UserException(
                    '您还未完成身份认证，请现在小程序中完成认证后再次尝试',
                    res.data.errcode
                );
            }
            if (!store.getters.getToken) {
                throw new AuthException('登录过期，请重新登录', res);
            }
            store.commit('clearToken');
            // 当前路由不在主页时, 弹出过期提示框
            if (
                router.currentRoute &&
                router.currentRoute.name &&
                router.currentRoute.name != 'home'
            ) {
                await MessageBox.alert('登录已过期，请重新登录', '提示', {
                    type: 'error',
                    confirmButtonText: '重新登录',
                    showClose: false
                });
                router
                    .replace({
                        name: 'home'
                    })
                    .catch((e) => e);
            }
            throw new AuthException('登录过期，请重新登录', res);
        }
        case 400: {
            throw new UserException(
                res.data.message || '发生未知错误，请稍后再试',
                res.data.errcode
            );
        }
        case 403: {
            throw new PermissionException(
                res.data.message || '您没有权限访问该页面',
                res.data.errcode
            );
        }
        case 413: {
            throw new UserException('传输内容超过最大限制', res.data.errcode);
        }
        case 502:
        case 404: {
            throw new SystemException(
                `服务器开小差了，请稍后再试[${res.status}]`,
                res.data.errcode
            );
        }
        default: {
            throw new SystemException(
                '发生未知错误，请稍后再试',
                res.data.errcode
            );
        }
    }
}

export default (axios) => {
    axios.interceptors.response.use(
        async (res) => {
            if (res.status >= 200 && res.status < 300) {
                return res.data.data || {};
            } else {
                await errorHandler(res);
            }
        },
        async (error) => {
            if (!error.response) {
                throw new Error('网络连接失败，请稍后再试');
            }
            await errorHandler(error.response);
        }
    );
};
