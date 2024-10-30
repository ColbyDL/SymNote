import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Folder from "../../../models/folder"


export async function POST(request) {
    const { name, parentId, profileId } = await request.json(); // Include profileId if applicable
    await connectMongoDB();

    // Create the new folder
    const newFolder = await Folder.create({ name, parentId, profileId, folders: [], files: [] });

    // If there's a parentId, update the parent folder's `folders` array
    if (parentId) {
        const parentFolder = await Folder.findById(parentId);
        if (parentFolder) {
            parentFolder.folders.push(newFolder._id);
            await parentFolder.save();
        } else {
            throw new Error("Parent folder not found");
        }
    }

    return NextResponse.json({ message: "Folder created", folderId: newFolder._id }, { status: 201 });
}



export async function GET() {
    await connectMongoDB();
    const folders = await Folder.find();
    return NextResponse.json({ folders });

}

export async function DELETE(request){
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Folder.findByIdAndDelete(id);
    return NextResponse.json({ message: "Folder deleted " }, { status: 200 });
}