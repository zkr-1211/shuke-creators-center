import request from '@/utils/request/v1';

export function processFile(fileId, autoRename = 'false') {
    return request({
        url: `/cloud_disk/processFile`,
        method: 'POST',
        data: {
            fileId,
            autoRename
        }
    });
}
