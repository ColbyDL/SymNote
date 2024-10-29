import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import File from "../../../models/file"

export async function POST(request) {
    const { name, content, folderId } = await request.json();
    await connectMongoDB();
    await File.create({ name, content, folderId });
    return NextResponse.json({message: "File Created"}, { status: 201 });
}

export async function GET() {
    await connectMongoDB();
    const file = await File.find();
    return NextResponse({ file });
}

export async function DELETE(request){
    const { id } = await request.json();
    await connectMongoDB();
    await File.findByIdAndDelete(id);
    return NextResponse.json( {message: "File Deleted "}, { status: 200 });
}