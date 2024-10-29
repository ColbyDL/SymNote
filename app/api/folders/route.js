import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Folder from "../../../models/folder"



export async function POST(request) {
    const { name, parentId} = await request.json();
    await connectMongoDB();
    await Folder.create({name, parentId});
    return NextResponse.json({ message: "Folder created"}, { status: 201 });
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