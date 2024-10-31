// app/api/files/route.js
import FileService from '../../../services/FileService';
import FolderService from '../../../services/FolderService';
import { NextResponse } from 'next/server';
import ConnectMongoDB from '../../../libs/mongodb';

export async function GET() {
    await ConnectMongoDB();
    const files = await FileService.getAll();
    return NextResponse.json(files);
}

export async function POST(request) {
    await ConnectMongoDB();
    const { name, content, folderId} = await request.json();
    const file = await FileService.createFile({ name, content, folderId });
    const updatedParentFolder = await FolderService.addFileToFolder(folderId, file._id);
    const updatedParent = await FolderService.getById(updatedParentFolder._id)

    return NextResponse.json({file, updatedParent});
}
