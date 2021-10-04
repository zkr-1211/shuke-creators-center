import { MessageBox } from 'element-ui';

const localStoragePrefix = 'redirect_limit';

export default async (domain) => {
    if (!domain) {
        throw '未传入域名';
    }
    const storageName = `${localStoragePrefix}:${domain}`;

    let getLocalStorage = localStorage.getItem(storageName);
    const data = [];
    if (!Array.isArray(getLocalStorage)) {
        try {
            getLocalStorage = JSON.parse(getLocalStorage);
            if (!Array.isArray(getLocalStorage)) {
                throw '数据解析失败';
            }
        } catch (error) {
            getLocalStorage = [];
        }
    }

    for (let key in getLocalStorage) {
        const item = parseInt(getLocalStorage[key]);
        // 保留10秒内的数据
        if (item && new Date().getTime() - item < 10000) {
            data.push(item);
        }
    }
    data.push(new Date().getTime());
    localStorage.setItem(storageName, JSON.stringify(data));
    // 数组内超过3次请求，就提醒用户是否跳转
    if (data.length >= 3) {
        await MessageBox({
            title: '跳转提示',
            message: `即将打开“${domain}”`,
            confirmButtonText: '允许',
            showCancelButton: true,
            type: 'info'
        });
    }
};
