import mongoose, { Schema } from "mongoose"

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise

const FolderSchema = new Schema(
    {
       name: { type: String, required: true },
       profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
       parentFolderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', default: null },
       subfolders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Folder' }],
       files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
       createdAt: { type: Date, default: Date.now},
       updatedAt: { type: Date, default: Date.now}
    }
);

const Folder = mongoose.models.Folder || mongoose.model("Folder", FolderSchema);
export default Folder;