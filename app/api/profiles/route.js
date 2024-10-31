// app/api/profiles/route.js
import ProfileService from '../../../services/ProfileService';
import { NextResponse } from 'next/server';
import ConnectMongoDB from '../../../libs/mongodb'

export async function GET() {
    await ConnectMongoDB();
    const profiles = await ProfileService.findAllProfiles();
    return NextResponse.json(profiles);
}

export async function POST(request) {
    await ConnectMongoDB();
    const { auth0Id, name, email } = await request.json();
    const profile = await ProfileService.createProfile(auth0Id, name, email);
    return NextResponse.json(profile, { status: 201 });
}
