'use client'
import Profile from '../models/profileModel';
import File from '../models/filesModel';
import Folder from '../models/foldersModel';
import { revalidatePath } from "next/cache";
import { connectToMongoDB } from './mongodb';

export const createProfile = async (formData: FormData) => {
    await connectToMongoDB();

    const profile_name = formData.get("profile_name");
    const profile_email = formData.get("profile_email");
    const root_folder = formData.get("root_folder");
    
    try {
        const newProfile = await Profile.create({
            profile_name,
            profile_email,
            root_folder,
        });
        newProfile.save();

        revalidatePath("/");

        return newProfile.toString();

    } catch (error) {
        console.log(error);
        return {message: 'error creating profile'};
    }
};

export const deleteProfile = async (id: FormData) => {

    const profileId = id.get("id");
    try {
        await Profile.deleteOne({_id: profileId});
        revalidatePath("/");
        return ('Profile deleted');
    } catch (error) {
        return {message: 'error deleting profile'};
    }
}

export const createFile = async (formData: FormData) => {
    await connectToMongoDB();

    const file_name = formData.get("file_name");   
    const file_description = formData.get("file_description");
    const file_last_modified = formData.get("file_last_modified");
    const file_text = formData.get("file_text");

    try {
        const newFile = await File.create({
            file_name,
            file_description,
            file_last_modified,
            file_text,
        });
        newFile.save();

        revalidatePath("/");

        return newFile.toString();

    } catch (error) {
        console.log(error);
        return {message: 'error creating file'};
    }
};

export const deleteFile = async (id: FormData) => {

    const fileId = id.get("id");
    try {
        await File.deleteOne({_id: fileId});
        revalidatePath("/");
        return ('File deleted');
    } catch (error) {
        return {message: 'error deleting file'};
    }
}

export const createFolder = async (formData: FormData) => {
    await connectToMongoDB();

    const folder_name = formData.get("folder_name");
    const folder_description = formData.get("folder_description");
    const folder_last_modified = formData.get("folder_last_modified");
    const files = formData.getAll("files");
    const sub_folders = formData.getAll("sub_folders");

    try {
        const newFolder = await Folder.create({
            folder_name,
            folder_description,
            folder_last_modified,
            files,
            sub_folders,
        });
        newFolder.save();

        revalidatePath("/");

        return newFolder.toString();

    } catch (error) {
        console.log(error);
        return {message: 'error creating file'};
    }
};

export const deleteFolder = async (id: FormData) => {

    const folderId = id.get("id");
    try {
        await Folder.deleteOne({_id: folderId});
        revalidatePath("/");
        return ('Folder deleted');
    } catch (error) {
        return {message: 'error deleting folder'};
    }
}