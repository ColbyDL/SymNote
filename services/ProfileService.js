// services/ProfileService.js
import Profile from '../models/profile';
import FolderService from './FolderService'; // Ensure FolderService is imported

class ProfileService {
    async createProfile(auth0Id, name, email) {
        const profile = await Profile.findOne({auth0Id});
        if (!profile) {
            const rootFolder = await FolderService.createFolder({ name: 'Root Folder' });
            const profile = await Profile.create({ auth0Id, name, email, rootFolderId: rootFolder._id }); 
            rootFolder.parentId = profile._id;
            await rootFolder.save();
            return profile;
        }
        return profile;
        
    }

    async findProfile(id) {
        return await Profile.findById(id).populate('rootFolderId').exec();
    }

    async findAllProfiles() {
        return await Profile.find().populate('rootFolderId').exec();
    }

    async updateProfile(id, data) {
        return await Profile.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async deleteProfile(id) {
        return await Profile.findByIdAndDelete(id).exec();
    }
}

export default new ProfileService();
