import mongoose, { Schema } from "mongoose"

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise

const ProfileSchema = new mongoose.Schema(
    {
        auth0Id: { type: String, required: true, unique: true},
        name: {type: String, required: true},
        email: {type: String, required: true},
        rootFolderId: {type: mongoose.Schema.Types.ObjectId, ref: 'Folder'},
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    }
);

const Profile = mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);
export default Profile;