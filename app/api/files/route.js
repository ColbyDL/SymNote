// app/api/files/route.js
import FileService from '../../../services/FileService';
import { NextResponse } from 'next/server';
import connectMongoDB from '../../../libs/mongodb';

export async function GET() {
    await ConnectMongoDB();
    const files = await FileService.getAll();
    return NextResponse.json(files);
}

export async function POST(request) {
    await ConnectMongoDB();
    const data = await request.json();
    const file = await FileService.createFile(data);
    return NextResponse.json(file, { status: 201 });
}
