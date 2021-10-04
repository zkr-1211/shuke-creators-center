import request from '@/utils/request/v1';

export function deleteItem(item_type, id) {
    let submitData = {};
    if (item_type == 'file') {
        submitData.fileId = id;
    } else if (item_type == 'folder') {
        submitData.folderId = id;
    } else {
        throw new Error('不支持的项目类型');
    }
    return request({
        url: `/cloud_disk/delete/${item_type}`,
        method: 'POST',
        data: submitData
    });
}
