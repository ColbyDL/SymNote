import mongoose, { Schema } from "mongoose"

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise

const FileSchema = new Schema(
    {
       name: { type: String, required: true },
       FolderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder' },
       size: {type: Double, required: true },
       content: {type: String, required: true },
       createdAt: {type: Date, default: Date.now },
       updatedAt: {type: Date, default: Date.now }
    }
);

const File = mongoose.models.File || mongoose.models("File", FileSchema);
export default File;