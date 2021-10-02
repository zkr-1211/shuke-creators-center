import request from '@/utils/request/v4';
export function getColumnList() {
    return request({
        url: '/api/v1/mqtt/list',
        method: 'GET'
    });
}