import { Notification } from 'element-ui';

export default () => {
    if (!window.navigator.cookieEnabled) {
        Notification({
            title: 'Cookie已被禁用',
            message:
                '您的浏览器已禁用Cookie，为了您的安全，您需要启用Cookie后才可正常登录',
            type: 'error',
            duration: 0,
            offset: 70,
            position: 'top-left'
        });
    }
};
