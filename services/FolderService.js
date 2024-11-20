// services/FolderService.js
import Folder from '../models/folder';
import File from '../models/file';
import GenericService from './GenericService';

class FolderService extends GenericService {
    async createFolder(data) {
        const folder = await this.create(data);
        return folder;
    }

    async getRootFolders() {
        // Fetch all top-level folders (parentId = null) and populate recursively
        return await Folder.find({ parentId: null })
          .populate({
            path: 'folders',
            populate: { path: 'folders', populate: 'folders' }, // Recursive population
          })
          .populate('files');
    }

    async addFolderToParent(parentId, folderId) {
        return await Folder.findByIdAndUpdate(parentId, { $push: { folders: folderId } }, { new: true });
    }

    async addFileToFolder(folderId, fileId) {
        return await Folder.findByIdAndUpdate(folderId, { $push: { files: fileId } }, { new: true });
    }

    async getById(id) {
        return await Folder.findById(id).populate('folders').populate('files');
    }

    async moveFolder(folderId, oldParentId, newParentId) {

        await Folder.findByIdAndUpdate(oldParentId, { $pull: { folders: folderId }});

        await Folder.findByIdAndUpdate(newParentId, { $push: { folders: folderId }});

        return await Folder.findByIdAndUpdate(folderId, { parentId: newParentId }, { new: true });
    }
}

export default new FolderService(Folder);
