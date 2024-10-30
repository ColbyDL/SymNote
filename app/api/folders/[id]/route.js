import connectMongoDB from "../../../../libs/mongodb";
import Folder from "../../../../models/folder"
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { newName: name, newParentId: parentId} = await request.json();
    await connectMongoDB();
    await Folder.findByIdAndUpdate(id, { name, parentId });
    return NextResponse.json({message: "Folder updated"}, { status: 200 });
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const folder = await Folder.findOne({_id: id});
    return NextResponse.json({ folder }, { status: 200 });
}

export async function DELETE(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    await Folder.findByIdAndDelete({ _id: id });
    return NextResponse.json({ message: "folder deleted "}, { status: 200 });
}

export async function POST(request) {
    const { name, rootFolderId } = await request.json();
    await connectMongoDB();

    // Create the new folder
    const newFolder = await Folder.create({ name, parentId: rootFolderId, folders: [], files: [] });

    // Find the parent folder and add the new folder to its folders array
    const parentFolder = await Folder.findById(rootFolderId);
    if (parentFolder) {
        parentFolder.folders.push(newFolder._id); // Add new folder ID to the parent's folders array
        await parentFolder.save(); // Save the updated parent folder
    } else {
        throw new Error("Parent folder not found");
    }

    return NextResponse.json({ message: "Folder added", folderId: newFolder._id }, { status: 201 });
}
