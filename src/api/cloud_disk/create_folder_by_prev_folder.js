import request from '@/utils/request/v1';

export function createFolderByPrevFolder(folderId, folderName) {
    return request({
        url: `/cloud_disk/createFolderByPrevFolder`,
        method: 'POST',
        data: {
            folderId,
            folderName
        }
    });
}
