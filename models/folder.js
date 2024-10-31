import mongoose, { Schema } from "mongoose"

const folderSchema = new Schema(
    {
        name: { type: String, required: true },
        profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
        parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', default: null },
        folders: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Folder'}], default: [] },
        files:  { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File'}], default: [] },
    },
    {
        timestamps: true,
    }
);

const Folder = mongoose.models.Folder || mongoose.model("Folder", folderSchema);

export default Folder;