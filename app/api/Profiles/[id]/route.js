import dbConnect from '../../../../lib/dbConnect'
import Profile from '../../../../(models)/Profile'
import { NextResponse } from 'next/server'
import { profileEnd } from 'console';


export async function GET(req) {
    await dbConnect();
    const { id } = req.params;
    try {
      const profile = await Profile.findById(id);
      if (!profile) {
        return NextResponse.json({ success: false, error: 'Profile not found' });
      }
      return NextResponse.json({ success: true, data: profile });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message });
    }
  }
  
  export async function PUT(req) {
    await dbConnect();
    const { id } = req.params;
    try {
      const body = await req.json();
      const profile = await Profile.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
      });
      if (!profile) {
        return NextResponse.json({ success: false, error: 'Profile not found' });
      }
      return NextResponse.json({ success: true, data: profile });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message });
    }
  }
  
  export async function DELETE(req) {
    await dbConnect();
    const { id } = req.params;
    try {
      const deletedProfile = await Profile.findByIdAndDelete(id);
      if (!deletedProfile) {
        return NextResponse.json({ success: false, error: 'Profile not found' });
      }
      return NextResponse.json({ success: true, data: {} });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message });
    }
  }

