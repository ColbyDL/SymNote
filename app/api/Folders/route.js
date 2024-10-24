import dbConnect from "../../../lib/dbConnect";
import Folder from '../../(models)/Folder'
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await dbConnect();

        const {name, userId, parentFolderId } = await req.json();

        if (!name || !userId) {
            return NextResponse.json({ error: 'Name and userId are required' }, { status: 400 });
        }

        if (parentFolderId) {
            const parentFolder = await Folder.findById(parentFolderId);
            if (!parentFolder) {
                return NextResponse.json({ error: 'Parent folder not found' }, { status: 400 });
            }
        }

        const newFolder = await Folder.create({ name, userId, parentFolderId });

        return NextResponse.json({ folder: newFolder }, { status: 201 });
    } catch (error) {
        console.error('Error creating folder: ', error);
        return NextResponse.json({ error: 'Error creating folder' }, { status: 500 });
    }
}