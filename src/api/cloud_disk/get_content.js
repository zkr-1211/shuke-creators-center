import request from '@/utils/request/v1';

export function getContent(folderId) {
    return request({
        url: '/cloud_disk/getContent',
        method: 'POST',
        data: {
            folderId
        }
    });
}
