// app/api/folders/move/route.js
import { NextResponse } from 'next/server';
import FolderService from '@/services/FolderService';

export async function POST(req) {
    try {
        const { folderId, oldParentId, newParentId } = await req.json();

        // Validate the input
        if (!folderId || !oldParentId || !newParentId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Call the moveFolder method from FolderService
        const updatedFolder = await FolderService.moveFolder(folderId, oldParentId, newParentId);

        return NextResponse.json({ message: 'Folder moved successfully', folder: updatedFolder });
    } catch (error) {
        console.error('Error moving folder:', error);
        return NextResponse.json({ error: 'Error moving folder' }, { status: 500 });
    }
}
