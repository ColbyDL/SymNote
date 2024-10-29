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