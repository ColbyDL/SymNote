import mongoose, { Schema } from "mongoose"

const folderSchema = new Schema(
    {
        name: { type: String, required: true },
        profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
        parendId: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', default: null },
    },
    {
        timestamps: true,
    }
);

const Folder = mongoose.models.Folder || mongoose.model("Folder", folderSchema);

export default Folder;