import request from '@/utils/request/v1';

export function getSearch(keyword) {
    return request({
        url: `/cloud_disk/getSearch`,
        method: 'POST',
        data: {
            keyword
        }
    });
}
