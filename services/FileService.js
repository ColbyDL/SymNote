// services/FileService.js
import File from '../models/file';
import GenericService from './GenericService';

class FileService extends GenericService {
    async createFile(data) {
        return await this.create(data);
    }
}

export default new FileService(File);

