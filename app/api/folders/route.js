// app/api/folders/route.js
import FolderService from '../../../services/FolderService';
import { NextResponse } from 'next/server';
import ConnectMongoDB from '../../../libs/mongodb';

export async function GET() {
    await ConnectMongoDB();
    const folders = await FolderService.getAll();
    return NextResponse.json(folders);
}

export async function POST(request) {
    await ConnectMongoDB();
    const { name, profileId, parentId } = await request.json();
    const folder = await FolderService.createFolder({ name, profileId});
    const updatedParentFolder = await FolderService.addFolderToParent(parentId, folder);
    folder.parentId = updatedParentFolder._id;
    await folder.save();
    return NextResponse.json({folder, updatedParentFolder});
}
