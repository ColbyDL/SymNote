import mongoose, { Schema } from "mongoose"

const profileSchema = new Schema(
    {
        auth0Id: { type: String, required: true, unique: true},
        name: { type: String, required: true },
        email: { type: String, required: true },
        rootFolderId: { type: Schema.Types.ObjectId, ref: 'Folder' },
    },
    {
        timestamps: true,
    }
);

const Profile = mongoose.models.Profile || mongoose.model("Profile", profileSchema);

export default Profile;