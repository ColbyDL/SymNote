import dbConnect from "../../../lib/dbConnect";
import Profile from "../../../models/Profile";
import Folder from "../../../models/Folder";
import File from "../../../models/File";

import { NextResponse } from "next/server";

export async function GET(req) {
    console.log("GET /api/profiles called");
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const auth0Id = searchParams.get('auth0Id');
    console.log("auth0Id:", auth0Id);
    
    try {
      let profile = await Profile.findOne({ auth0Id });
      if (!profile) {
        console.log("Profile not found, creating new profile");
        // Create a root folder
        const rootFolder = await Folder.create({ name: 'Root Folder' });
  
        // Create the new profile with root folder reference
        profile = await Profile.create({
          auth0Id,
          email: "default@example.com", // Replace with actual email if available
          name: "Default Name", // Replace with actual name if available
          rootFolderId: rootFolder._id,
        });
  
        // Associate the profile with the root folder
        rootFolder.profileId = profile._id;
        await rootFolder.save();
  
        console.log("Profile and root folder successfully created.");
      } else {
        console.log("Profile found.");
      }
  
      return NextResponse.json({ success: true, data: profile });
    } catch (error) {
      console.error("Error in GET /api/profiles:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }
  }
  export async function POST(req) {
    console.log("POST /api/profiles called");
    await dbConnect();
    try {
        const body = await req.json();
        console.log("Request body:", body);

        // Validate input
        if (!body.auth0Id) {
            return NextResponse.json(
                { success: false, error: "auth0Id is required" },
                { status: 400 }
            );
        }

        const existingProfile = await Profile.findOne({ auth0Id: body.auth0Id });
        if (existingProfile) {
            console.log("Profile already exists:", existingProfile);
            return NextResponse.json({ success: true, data: existingProfile });
        }

        // Create a root folder
        const rootFolder = await Folder.create({ name: 'Root Folder', profileId: null }); // Initialize profileId as null

        // Create a new profile and associate it with the root folder
        const profile = await Profile.create({
            ...body,
            rootFolderId: rootFolder._id,
        });

        // Associate the profile with the root folder
        rootFolder.profileId = profile._id; // Set the profileId
        await rootFolder.save(); // Save the updated folder

        console.log("New profile created:", profile);
        return NextResponse.json({ success: true, data: profile }, { status: 201 });
    } catch (error) {
        console.error("Error in POST /api/profiles:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
  } 
  





/*
export async function GET(req) {
  console.log("GET /api/profiles called");
  await dbConnect();
  console.log(`Received request: ${req.url}`);
  const { searchParams } = new URL(req.url);
  const auth0Id = searchParams.get("auth0Id");
  console.log(`auth0Id: ${auth0Id}`);

  try {
    console.log(`Attempting to find profile with auth0Id: ${auth0Id}`);

    // Check if the profile exists
    let profile = await Profile.findOne({ auth0Id });
    if (!profile) {
      console.log("Profile not found. Creating a new profile...");

      // Create a root folder for the user
      const rootFolder = await Folder.create({ name: "Root Folder" });

      // Create the new profile with root folder reference
      profile = await Profile.create({
        auth0Id,
        email: "default@example.com", // Replace with actual email if available
        name: "Default Name", // Replace with actual name if available
        rootFolderId: rootFolder._id,
      });

      // Associate the profile with the root folder
      rootFolder.profileId = profile._id;
      await rootFolder.save();

      console.log("Profile and root folder successfully created.");
    } else {
      console.log("Profile found.");
    }

    return NextResponse.json({ success: true, data: profile });
  } catch (error) {
    console.error("Error in GET /api/profiles:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();

    // Check if the profile already exists
    const existingProfile = await Profile.findOne({ auth0Id: body.auth0Id });
    if (existingProfile) {
      return NextResponse.json({ success: true, data: existingProfile });
    }

    // Create a root folder
    const rootFolder = await Folder.create({ name: "Root Folder" });

    // Create a new profile and associate it with the root folder
    const profile = await Profile.create({
      ...body,
      rootFolderId: rootFolder._id,
    });

    // Update the root folder with the profile ID
    rootFolder.profileId = profile._id;
    await rootFolder.save();

    return NextResponse.json({ success: true, data: profile });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

*/