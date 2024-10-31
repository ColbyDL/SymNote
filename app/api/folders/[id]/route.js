// app/api/folders/[id]/route.js
import FolderService from '../../../../services/FolderService';
import { NextResponse } from 'next/server';
import ConnectMongoDB from '../../../../libs/mongodb';


export async function GET(request, { params }) {
    await ConnectMongoDB();
    const { id } = params;

    try {
        const folder = await FolderService.getById(id);

        if (!folder) {
            return NextResponse.json({ message: 'Folder not found' }, { status: 404 });
        }

        return NextResponse.json(folder);
    } catch (error) {
        console.error("Error retrieving folder:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    await ConnectMongoDB();
    const { id } = params;
    const data = await request.json();
    const updatedFolder = await FolderService.update(id, data);
    return NextResponse.json(updatedFolder);
}

export async function DELETE(request, { params }) {
    await ConnectMongoDB();
    const { id } = params;
    await FolderService.delete(id);
    return NextResponse.json({ message: 'Folder deleted' });
}

// New endpoint to add a folder to a parent folder
export async function POST(request, { params }) {
    await ConnectMongoDB();
    const { id } = params; // Parent folder ID
    const { folderId } = await request.json(); // The ID of the folder you want to add

    const updatedParentFolder = await FolderService.addFolderToParent(id, folderId);
    return NextResponse.json(updatedParentFolder);
}

// New endpoint to add a file to a folder
export async function POST_FILE(request, { params }) {
    await ConnectMongoDB();
    const { id } = params; // Folder ID
    const { fileId } = await request.json(); // The ID of the file you want to add

    const updatedFolder = await FolderService.addFileToFolder(id, fileId);
    return NextResponse.json(updatedFolder);

}