import Vue from 'vue';
import { processFile } from '@/api/cloud_disk/process_file';
import { overallUploadFile } from '@/api/cloud_disk/overall_upload_file';

export class CloudDisk {
    static async uploadLocalImage({ folderId = 0, saveToCloudDisk = false }) {
        const chooseImageRes = await CloudDisk._uniChooseImage();
        return await CloudDisk.handelResourceChoose({
            chooseImageRes,
            folderId,
            autoRename: true,
            saveToCloudDisk
        });
    }
    static async uploadOneLocalImage({
        folderId = 0,
        saveToCloudDisk = false
    }) {
        const chooseImageRes = await CloudDisk._uniChooseImage(1);
        let tempFilePath = chooseImageRes.tempFilePaths[0];
        return await CloudDisk.doFileUpload({
            filePath: tempFilePath,
            index: 0,
            folderId,
            saveToCloudDisk
        });
    }
    static async uploadLocalVideo({ folderId = 0, saveToCloudDisk = false }) {
        const chooseVideoRes = await CloudDisk._uniChooseVideo();
        let tempFilePath = chooseVideoRes.tempFilePath;
        return await CloudDisk.doFileUpload({
            filePath: tempFilePath,
            index: 0,
            folderId,
            autoRename: true,
            saveToCloudDisk
        });
    }
    static async handelResourceChoose({
        chooseImageRes,
        folderId,
        autoRename = true,
        saveToCloudDisk = false
    }) {
        let tempFilePaths = chooseImageRes.tempFilePaths;
        let competeList = [];
        let errorMessage = '文件上传出错:\n';
        const fileIdList = [];
        for (let index in tempFilePaths) {
            try {
                let name = '';
                if (chooseImageRes.name && chooseImageRes.name[index]) {
                    name = chooseImageRes.name[index];
                }
                let filePath = tempFilePaths[index];
                const fileId = await CloudDisk.doFileUpload({
                    filePath,
                    index,
                    autoRename,
                    name,
                    folderId,
                    saveToCloudDisk
                });
                fileIdList.push(fileId);
                competeList.push(index);
            } catch (e) {
                if (tempFilePaths.length === 1) {
                    throw e;
                } else {
                    errorMessage += `${e.message || e}\n`;
                }
            }
        }
        if (competeList.length != tempFilePaths.length) {
            throw new Error(errorMessage);
        }
        return fileIdList;
    }
    static async doFileUpload({
        filePath,
        index,
        autoRename = true,
        name = '',
        folderId = 0,
        saveToCloudDisk = false
    }) {
        index = parseInt(index) + 1;
        uni.showLoading({
            title: `正在上传第${index}项`,
            mask: true
        });
        const res = await overallUploadFile({
            fieldName: 'file',
            filePath,
            cloudFolderId: folderId,
            fileName: name,
            autoRename,
            saveToCloudDisk
        });
        uni.hideLoading();
        return {
            fileId: res.result.file_id,
            fileLocalPath: filePath,
            fileRemotePath: res.result.url
        };
    }
    // #ifdef MP-WEIXIN
    static async selectMessageFile({ folderId = 0, saveToCloudDisk = false }) {
        try {
            const result = await this._wxChooseMessageFile();
            let chooseRes = {};
            chooseRes.tempFilePaths = [];
            chooseRes.name = [];
            for (let res of result.tempFiles) {
                chooseRes.tempFilePaths.push(res.path);
                chooseRes.name.push(res.name);
            }
            return await CloudDisk.handelResourceChoose({
                chooseImageRes: chooseRes,
                folderId,
                autoRename: false,
                saveToCloudDisk
            });
        } catch (e) {
            throw e;
        }
    }
    static _wxChooseMessageFile() {
        return new Promise((resolve, reject) => {
            wx.chooseMessageFile({
                count: 10,
                success: (result) => {
                    resolve(result);
                },
                fail: () => {
                    reject('');
                }
            });
        });
    }
    // #endif
    static _uniChooseImage(count = 9) {
        return new Promise((resolve, reject) => {
            uni.chooseImage({
                count,
                success: (chooseImageRes) => {
                    resolve(chooseImageRes);
                },
                fail: (e) => {
                    reject('');
                }
            });
        });
    }
    static _uniChooseVideo() {
        return new Promise((resolve, reject) => {
            uni.chooseVideo({
                success: (chooseVideoRes) => {
                    resolve(chooseVideoRes);
                },
                fail: (e) => {
                    reject('');
                }
            });
        });
    }
}
