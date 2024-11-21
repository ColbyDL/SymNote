'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const FileNav = () => {
  const [files, setFiles] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [parent, setParent] = useState(null);
  const [parentName, setParentName] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Get current path to determine the folder ID

  // Extract fileId from pathname. Assuming the fileId is the last part of the URL.
  const fileId = pathname.split('/').pop();

  // Fetch the file details based on fileId
  useEffect(() => {
    const fetchFile = async () => {
      if (isFetching || !fileId) return; // Prevent multiple requests

      setIsFetching(true);
      console.log("fileNav: fileId", fileId); // Debugging

      try {
        const res = await fetch(`/api/files/${fileId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const data = await res.json();
          console.log("filenav parent", data.folderId)
          setParent(data.folderId); // Assuming file has folderId as a field
        } else {
          console.error('Error fetching file:', res.status);
        }
      } catch (error) {
        console.error('Error fetching file:', error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchFile();
  }, [fileId]); // Trigger only when fileId changes

  // Fetch files for the parent folder once parent is set
  useEffect(() => {
    if (!parent) return;

    const fetchFiles = async () => {
      try {
        const res = await fetch(`/api/folders/${parent}`);
        if (res.ok) {
          const data = await res.json();
          setParentName(data.name)
          console.log("file nav", data.files)
          setFiles(data.files); // Assuming the API returns only the files in the folder
        } else {
          console.error('Failed to fetch files:', res.status);
        }
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, [parent]); // Only fetch files when parent is set

  const tabClick = () => {
    setIsActive(!isActive);
  };

  const navigateToFile = (fileId) => {
    router.push(`/documents/${fileId}`);
  };

  return (
    <div id="editor-file-nav" className={isActive ? 'file-nav-active' : ''}>
      <div id="nav-tab">
        <button onClick={tabClick}>{isActive ? '→' : '←'}</button>
      </div>
      <ul>
        <li className="whitespace-nowrap text-lg px-2">{parentName !== null ? `Folder: ${parentName}` : `Loading`}</li>
        {files.length > 0 ? (
          files.map((file) => (
            <li className="py-2" key={file._id} id="file">
              <button
                onClick={() => navigateToFile(file._id)}
                className="file-name whitespace-nowrap"
              >
                {`-> ${file.name}`}
              </button>
            </li>
          ))
        ) : (
          <p className='pt-4'>No files available in this folder.</p>
        )}
      </ul>
    </div>
  );
};

export default FileNav;






/*
'use client';


import { useState } from 'react';

const FileNav = () => {
    const[isActive, setIsActive] = useState(false);

    const tabClick = () => {
      setIsActive(!isActive);
    }

    return (
        <div id="editor-file-nav" className={isActive ? 'file-nav-active' : ''}>
        <div id="nav-tab">
          <button onClick={tabClick}>
            →
          </button>
        </div>
        <ul>
          <li id="folder">
            folder 1
            <button id="file">
              file 1
            </button>
            <button id="file">
              file 2
            </button>
          </li>
          <li id="folder">
            folder 2
            <button id="file">
              file 1
            </button>
          </li>
        </ul>
      </div>
    );
};

export default FileNav;
*/