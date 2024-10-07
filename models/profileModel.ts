import mongoose, { Document, Model } from "mongoose";

export interface IProfile {
    profile_name: string;
    profile_email: string;
    root_folder: string;
}

export interface IProfileDocument extends IProfile, Document {
    createdAt: Date;
    updatedAt: Date;
}

const profileSchema = new mongoose.Schema<IProfileDocument>(
    {
        profile_name: { type: String, required: true },
        profile_email: { type: String, required: true },
        root_folder: { type: String, required: true },
    },
    { timestamps: true }
);

const Profile: Model<IProfileDocument> = 
    mongoose.models?.Profile || mongoose.model("Profile", profileSchema);

export default Profile;