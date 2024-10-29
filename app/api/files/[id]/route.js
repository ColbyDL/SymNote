import connectMongoDB from "../../../../libs/mongodb";
import File from "../../../../models/file"
import { NextResponse } from "next/server";

export async function PUT(request, { params }){
    const { id } = params;
    const { newName: name, newContent: content, newFolderId: folderId } = await request.json();
    await connectMongoDB();
    await File.findByIdAndUpdate(id, {name, content, folderId});
    return NextResponse.json({ message: "File updated"}, { status: 200 });
}


export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const file = File.findOne({_id: id});
    return NextResponse.json({ file }, { status: 200 });
}

export async function DELETE(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    await File.findByIdAndDelete({ _id: id });
    return NextResponse.json({ message: "file deleted "}, { status: 200 });
}