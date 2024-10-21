import mongoose, { Schema } from "mongoose"

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise

const ProfileSchema = new Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true},
        rootFolderId: {type: mongoose.Schema.Types.ObjectId, ref: 'Folder'},
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    }
);

const Profile = mongoose.models.Profile || mongoose.models("Profile", ProfileSchema);
export default Profile;