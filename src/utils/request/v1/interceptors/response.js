import { MessageBox } from 'element-ui';
import store from '@/store';
import router from '@/router';

async function errorHandler(res) {
    switch (res.data.code) {
        case 401: {
            if (!store.getters.getToken) {
                return;
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
            return;
        }
        case 300: {
            return res.data.msg || '发生未知错误，请稍后再试';
        }
        case 403: {
            return res.data.msg || '您没有权限访问该页面';
        }
        case 405: {
            return (
                res.data.msg ||
                '您还未完成身份认证，请现在小程序中完成认证后再次尝试'
            );
        }
        default: {
            return '发生未知错误，请稍后再试';
        }
    }
}

export default (axios) => {
    axios.interceptors.response.use(
        async (res) => {
            if (res.data.status == 'success') {
                return res.data;
            } else {
                const msg = await errorHandler(res);
                throw msg;
            }
        },
        (error) => {
            throw error;
        }
    );
};
