import config from '@/config';
import qs from 'querystring';
import store from '@/store';
import RedirectLimit from './redirect_limit';

export default async (redirect_uri, isTokenCallback = false) => {
    if (!(redirect_uri && redirect_uri.length > 0)) {
        throw '域名格式错误';
    }
    let targetUrl;
    try {
        targetUrl = new window.URL(redirect_uri);
    } catch (error) {
        throw `域名 ${redirect_uri} 解析失败`;
    }
    // 跳转请求频率限制
    try {
        await RedirectLimit(targetUrl.host);
    } catch (error) {
        return;
    }
    let currentUrl;
    try {
        currentUrl = new window.URL(window.location.href);
    } catch (error) {
        throw `域名 ${window.location.href} 解析失败`;
    }
    const token = store.getters.getToken;
    if (!token) {
        throw '您还未完成登录';
    }
    // 判断是不是合法的跳转域名
    const targetHost = targetUrl.hostname.split('.').slice(1).join('.');
    const currentHost = currentUrl.hostname.split('.').slice(1).join('.');
    if (
        !(
            config.domain_list.includes(targetUrl.hostname) ||
            config.domain_list.includes(targetHost)
        )
    ) {
        throw `域名 ${redirect_uri} 不在许可列表中`;
    }
    let redirectWithToken = false;
    if (
        !(
            targetHost == currentUrl.hostname ||
            targetUrl.hostname == currentUrl.hostname ||
            currentHost == targetUrl.hostname
        ) ||
        isTokenCallback
    ) {
        redirectWithToken = true;
    }
    let url = redirect_uri;
    const baseUrl = redirect_uri.split('?')[0] || redirect_uri;
    if (redirectWithToken) {
        const params = qs.parse(targetUrl.searchParams.toString());
        params['token'] = token;
        url = `${baseUrl}?${qs.stringify(params)}`;
    }
    window.location.href = url;
};
