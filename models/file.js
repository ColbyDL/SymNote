import mongoose, { Schema } from "mongoose"


const fileSchema = new Schema(
    {
        name: { type: String, required: true },
        content: { type: String, required: false},
        folderId: { type: mongoose.Schema.Types.ObjectId, ref: "Folder" },
    },
    {
        timestamps: true,
    }
); 

const File = mongoose.models.File || mongoose.model('File', fileSchema);

export default File;