import dbConnect from '../../../lib/dbConnect'
import Profile from "../../(models)/Profile"
import Folder from "../../(models)/Folder"
import File from "../../(models)/File"

import { NextResponse } from "next/server"

export async function POST(req, res){
    try {
        await dbConnect();

        const {name, email } = await req.json()

        const newProfile = await Profile.create({ name, email });

        const rootFolder = await Folder.create({
            name: 'Root Folder',
            profileId: newProfile._id,
            parentFolderId: null,
        });

        newProfile.rootFolderId = rootFolder._id;

        await newProfile.save();
        
        return NextResponse.json({message: "Profile Created" }, {status: 201});

    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500});
    }
}