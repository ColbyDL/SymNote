// services/FileService.js
import File from '../models/file';
import Folder from '../models/folder'
import GenericService from './GenericService';

class FileService extends GenericService {
    async createFile(data) {
        return await this.create(data);
    }

    async moveFile(fileId, oldFolderId, newFolderId) {

        await Folder.findByIdAndUpdate(oldFolderId, { $pull: { files: fileId }});

        await Folder.findByIdAndUpdate(newFolderId, { $push: { files: fileId }});

        return await File.findByIdAndUpdate(fileId, { folderId: newFolderId }, { new: true });
    }
}

export default new FileService(File);

