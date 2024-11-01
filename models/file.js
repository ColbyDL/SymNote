import mongoose, { Schema } from "mongoose"


const fileSchema = new Schema(
    {
        name: { type: String, required: true },
        content: {
            type: [
                {
                    id: { type: String, required: true },
                    type: { type: String, required: true },
                    data: {
                        type: Object,
                        required: true,
                        default: {}
                    }
                }
            ],
            required: false,
            default: [],
        },
        folderId: { type: mongoose.Schema.Types.ObjectId, ref: "Folder" },
    },
    {
        timestamps: true,
    }
); 

const File = mongoose.models.File || mongoose.model('File', fileSchema);

export default File;