import dbConnect from "../../../lib/dbConnect";
import File from '../../(models)/File'
import Folder from '../../(models)/Folder'
import { NextResponse } from "next/server";
import { NextResponse } from 'next/server'

export async function POST(req) {
    try {
        await dbConnect();

        const { name, content, folderId } = await req.json();

        const folder = await Folder.findById(folderId);

        if (!folder) {
            return NextResponse.json({ error: 'Invalid folder ID' }, { status: 400 });
        }

        const newFile = await File.create({ name, content, folderId });

        return NextResponse.json({ file: newFile }, { status: 200 });

    } catch (error) {

        return NextResponse.json({ error: 'Error creating file' }, { status: 400 });
    }
}
