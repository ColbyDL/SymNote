'use client'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

const ProfilePage = () => {

  const { rootFolderId } = useParams();
  const [rootFolder, setRootFolder] = useState();

  const findFolder = async () => {
    
    try {

      const res = await fetch(`/api/folders/${rootFolderId}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        }
      });
      console.log("Fetching Folder...")

      if (res.ok) {
        console.log("res.ok folder");
        const data = await res.json();
        setRootFolder(data.folder)
        console.log(data.folder)
      } else {
        throw new Error("Error finding folder");
      }

    } catch (error) {
      console.error("fetch error:", error);
    }

  }

  useEffect(() => {
    if (rootFolderId) {
      console.log(rootFolderId)
      findFolder();
    }
  }, [rootFolderId]);


  return (
    <div>
      <div className="h-40">
      </div>
      <div>
      </div>
      <div className="pt-40">
      </div>
    </div>
  )
}

export default ProfilePage