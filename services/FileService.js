// services/FileService.js
import File from '../models/file';
import Folder from '../models/folder'
import GenericService from './GenericService';

class FileService extends GenericService {
    async createFile(data) {
        return await this.create(data);
    }

    async moveFile(fileId, oldFolderId, newFolderId) {
        // Remove the file from the old folder
        const oldFolder = await Folder.findByIdAndUpdate(oldFolderId, { 
            $pull: { files: fileId } 
        }, { new: true });
    
        // Add the file to the new folder
        const newFolder = await Folder.findByIdAndUpdate(newFolderId, { 
            $push: { files: fileId } 
        }, { new: true });
    
        // Update the file's folder reference
        const updatedFile = await File.findByIdAndUpdate(fileId, { 
            folderId: newFolderId 
        }, { new: true });
    
        return { updatedFile, oldFolder, newFolder };
    }
     
}

export default new FileService(File);

