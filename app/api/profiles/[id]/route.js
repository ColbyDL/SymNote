import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb"
import Profile from "../../../../models/profile"


export async function PUT(request, { params }) {
    const { id } = params;
    const { newName: name, newEmail: email } = await request.json();
    await connectMongoDB();
    await Profile.findByIdAndUpdate(id, { name, email });
    return NextResponse.json({ message: "Profile updated"}, { status: 200 });
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const profile = await Profile.findOne({_id: id});
    return NextResponse.json({ profile }, {status: 200 });
}

export async function DELETE(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    await Profile.findByIdAndDelete({ _id: id });
    return NextResponse.json({ message: "profile deleted "}, { status: 200 });
}