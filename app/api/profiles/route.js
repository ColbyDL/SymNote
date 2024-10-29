import connectMongoDB from "../../../libs/mongodb";
import Profile from "../../../models/profile";
import Folder from "../../../models/folder"
import { NextResponse } from "next/server";

export async function POST(request) {
    const  { auth0Id, name, email } = await request.json();
    console.log("request.json")
    await connectMongoDB();
    console.log("connectMongodb()")
    const rootFolder = await Folder.create({ name: "Root Folder" });
    //const profile = await Profile.create({name, email, rootFolderId: rootFolder._id });
    const profile = await Profile.findOneAndUpdate(
        { auth0Id },
        { auth0Id, name, email, rootFolderId: rootFolder._id },
        { new: true, upsert: true }
    );
    console.log(profile)
    rootFolder.profileId = profile._id
    await rootFolder.save();
    console.log("profile create")

    return NextResponse.json({ profile, message: "Profile created or found"}, { status: 201 })
}

export async function GET() {

    await connectMongoDB();
    console.log("connectedMongodb()")
    const profiles = await Profile.find();
    console.log("find profiles")
    return NextResponse.json({ profiles });
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Profile.findByIdAndDelete(id);
    return NextResponse.json({ message: "Profile deleted" }, { status: 200 });
}