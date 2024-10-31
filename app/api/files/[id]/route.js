// app/api/files/[id]/route.js
import FileService from '../../../../services/FileService';
import { NextResponse } from 'next/server';
import ConnectMongoDB from '../../../../libs/mongodb';

export async function GET(request, { params }) {
    await ConnectMongoDB();
    const { id } = params;
    const file = await FileService.getById(id);
    return NextResponse.json(file);
}

export async function PUT(request, { params }) {
    await ConnectMongoDB();
    const { id } = params;
    const data = await request.json();
    const updatedFile = await FileService.update(id, data);
    return NextResponse.json(updatedFile);
}

export async function DELETE(request, { params }) {
    await ConnectMongoDB();
    const { id } = params;
    await FileService.delete(id);
    return NextResponse.json({ message: 'File deleted' });
}
