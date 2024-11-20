import { NextResponse } from "next/server";
import FileService from '../../../../services/FileService'

export async function POST(req) {
    try {
        const { fileId, oldFolderId, newFolderId } = await req.json();

        if (!fileId || !oldFolderId || !newFolderId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const { updatedFile, oldFolder, newFolder } = await FileService.moveFile(fileId, oldFolderId, newFolderId);

        return NextResponse.json({
            message: 'File moved successfully',
            file: updatedFile,
            oldFolder,
            newFolder
        });
    } catch (error) {
        console.error('Error moving file:', error);
        return NextResponse.json({ error: 'Error moving file' }, { status: 500 });
    }
}
