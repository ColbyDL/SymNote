'use client'
import Link from 'next/link'
import FolderFileButtons from '../../components/folderFileButtons'
import Folders from '../../components/folders'
import FileTable from '../../components/fileTable'
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
        { rootFolder ? (
        <FolderFileButtons rootFolder={rootFolder} />
        ):(
          <></>
        )}
      </div>
      <div>
        {rootFolder ? (
          <Folders rootFolder={rootFolder}  />
        ): (
          <></>
        )}
      </div>
      <div className="pt-40">
        {rootFolder ? (
        <FileTable rootFolder={rootFolder}  />
        ):(
          <></>
        )}
      </div>
    </div>
  )
}

export default ProfilePage