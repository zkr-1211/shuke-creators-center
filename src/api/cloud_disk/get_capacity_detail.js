import request from '@/utils/request/v1';

export function getCapacityDetail() {
    return request({
        url: '/cloud_disk/capacity/detail',
        method: 'GET'
    });
}
