// services/FolderService.js
import Folder from '../models/folder';
import GenericService from './GenericService';

class FolderService extends GenericService {
    async createFolder(data) {
        const folder = await this.create(data);
        return folder;
    }

    async addFolderToParent(parentId, folderId) {
        return await Folder.findByIdAndUpdate(parentId, { $push: { folders: folderId } }, { new: true });
    }

    async addFileToFolder(folderId, fileId) {
        return await Folder.findByIdAndUpdate(folderId, { $push: { files: fileId } }, { new: true });
    }
}

export default new FolderService(Folder);
