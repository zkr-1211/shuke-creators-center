import request from '@/utils/request/v1';

export function overallUploadFile({
    fieldName,
    filePath,
    cloudFolderId,
    fileName,
    saveToCloudDisk = false,
    autoRename = false
}) {
    if (!saveToCloudDisk) {
        saveToCloudDisk = 'false';
    } else {
        saveToCloudDisk = 'true';
    }
    if (!autoRename) {
        autoRename = 'false';
    } else {
        autoRename = 'true';
    }
    return request({
        url: `/upload/overall`,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        name: fieldName,
        filePath,
        method: 'POST',
        data: {
            cloudFolderId,
            fileName,
            saveToCloudDisk,
            autoRename
        },
        transformRequest: [
            (data) => {
                return data;
            }
        ]
    });
}
