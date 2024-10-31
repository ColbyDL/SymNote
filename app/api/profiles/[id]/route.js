// app/api/profiles/[id]/route.js
import ProfileService from '../../../../services/ProfileService';
import { NextResponse } from 'next/server';
import ConnectMongoDB from '../../../../libs/mongodb'

export async function GET(request, { params }) {
    await ConnectMongoDB();
    const { id } = params;
    const profile = await ProfileService.findProfile(id);
    return NextResponse.json(profile);
}

export async function PUT(request, { params }) {
    await ConnectMongoDB();
    const { id } = params;
    const data = await request.json();
    const updatedProfile = await ProfileService.updateProfile(id, data);
    return NextResponse.json(updatedProfile);
}

export async function DELETE(request, { params }) {
    await ConnectMongoDB();
    const { id } = params;
    await ProfileService.deleteProfile(id);
    return NextResponse.json({ message: 'Profile deleted' });
}
