// app/api/folders/route.js
import FolderService from '../../../services/FolderService';
import { NextResponse } from 'next/server';
import ConnectMongoDB from '../../../libs/mongodb';
import Folder from '../../../models/folder';

/*
export async function GET() {

    await ConnectMongoDB();
    const folders = await FolderService.getAll();
    return NextResponse.json(folders);
}
*/

export async function GET() {
    await ConnectMongoDB();
    
    try {
      // Fetch all top-level folders (where `parentId` is null)
      const rootFolders = await FolderService.getRootFolders();
      return NextResponse.json(rootFolders);
    } catch (error) {
      console.error('Error fetching folders:', error);
      return NextResponse.json({ error: 'Failed to fetch folders' }, { status: 500 });
    }
  }
export async function POST(request) {
    await ConnectMongoDB();
    const { name, profileId, parentId } = await request.json();
    const folder = await FolderService.createFolder({ name, profileId});
    const updatedParentFolder = await FolderService.addFolderToParent(parentId, folder);
    folder.parentId = updatedParentFolder._id;
    await folder.save();
    const updatedParent = await FolderService.getById(updatedParentFolder._id)
    return NextResponse.json({folder, updatedParent});
}
