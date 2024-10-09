import mongoose, { Document, Model } from "mongoose";

export interface IFiles {
    file_name: string;
    file_description: string;
    file_last_modified: Date;
    file_text: string;
}

export interface IFilesDocument extends IFiles, Document {
    createdAt: Date;
    updatedAt: Date;
}

const filesSchema = new mongoose.Schema<IFilesDocument>(
    {
        file_name: { type: String, required: true },
        file_description: { type: String, required: true },
        file_last_modified: { type: Date, required: true },
        file_text: { type: String, required: true },
    },
    { timestamps: true }
);

const Files: Model<IFilesDocument> = 
    mongoose.models?.Files || mongoose.model("Files", filesSchema);

export default Files;