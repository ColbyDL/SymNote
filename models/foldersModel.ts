import mongoose, { Document, Model } from "mongoose";

export interface IFolders {
    files: string[];
    folder_description: string;
    folder_last_modified: Date;
    folder_name: string;
    sub_folders: string[];
}

export interface IFoldersDocument extends IFolders, Document {
    createdAt: Date;
    updatedAt: Date;
}

const foldersSchema = new mongoose.Schema<IFoldersDocument>(
    {
        files: { type: [String], required: true },
        folder_description: { type: String, required: true },
        folder_last_modified: { type: Date, required: true },
        folder_name: { type: String, required: true },
        sub_folders: { type: [String], required: true },
    },
    { timestamps: true }
);

const Folders: Model<IFoldersDocument> = 
    mongoose.models?.Folders || mongoose.model("Folders", foldersSchema);

export default Folders;