"use client";
import Link from "next/link";
import FolderFileButtons from "../../components/folderFileButtons";
import Folders from "../../components/folders";
import FileTable from "../../components/fileTable";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Modal from "../../components/modal";

const ProfilePage = () => {
  const { rootFolderId } = useParams();
  const [rootFolder, setRootFolder] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  
  const findFolder = async () => {
    try {
      const res = await fetch(`/api/folders/${rootFolderId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Fetching Folder...");

      if (res.ok) {
        console.log("res.ok folder");
        const data = await res.json();
        
        setRootFolder(data);
        console.log("data from the rootFolder", data);
      } else {
        throw new Error("Error finding folder");
      }
    } catch (error) {
      console.error("fetch error:", error);
    } finally {
    }
  };

  useEffect(() => {
    if (rootFolderId) {
      console.log(rootFolderId);
      findFolder();
    }
  }, [rootFolderId]);

  const addFolder = async (folderName) => {
    try {
      const res = await fetch(`/api/folders`, {
        method: "POST",
        headers: {
          "Content-Type": "applicaton/json",
        },
        body: JSON.stringify({
          name: folderName,
          profileId: rootFolder.parentId,
          parentId: rootFolderId,
        }),
      });
      console.log("Creating New Folder...");
      if (res.ok) {
        console.log("res.ok folder creation");
        const data = await res.json();
        console.log("data", data);
        const { folder, updatedParent } = data;
        console.log("new Folder", folder);
        console.log("updated Parent Folder", updatedParent);
        setRootFolder(updatedParent);
      } else {
        const errorData = await res.json();
        console.error("error creating folder", errorData);
      }
    } catch (error) {
      console.error("addFolder Error", error);
    } finally {
    }
  };

  const addFile = async (fileName) => {
    const fileContent = "";
    try {
      const res = await fetch(`/api/files`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fileName,
          content: fileContent,
          folderId: rootFolderId,
        }),
      });
      console.log("Creating New File...");
      if (res.ok) {
        console.log("res.ok file creation");
        const data = await res.json();
        const { file, updatedParent } = data;
        console.log("new file", file)
        console.log("updated parent FOlder", updatedParent)
        setRootFolder(updatedParent);
      } else {
        const errorData = await res.json();
        console.error("error creating file", errorData);
      }
    } catch (error) {
      console.error("error file creation", error);
    } finally {
    }
  };

  

 

  return (
    <div>
      <div className="h-40">
        <div className="flex items-center justify-around h-10">
          <button
            className="btn-primary w-72 h-20"
            onClick={() => {
              setModalType("folder");
              setIsModalOpen(true);
            }}
          >
            <h3 className="text-2xl">New Folder</h3>
          </button>
          <button
            className="btn-primary w-72 h-20"
            onClick={() => {
              setModalType("file");
              setIsModalOpen(true);
            }}
          >
            <h3 className="text-2xl">New File</h3>
          </button>
        </div>
      </div>
      <div>{rootFolder ? <Folders key={`${rootFolder._id}-${rootFolder.folders.length}`} rootFolder={rootFolder} /> : <></>}</div>
      <div className="pt-40">
        {rootFolder ? <FileTable key={`${rootFolder._id}-${rootFolder.files.length}`}  rootFolder={rootFolder} /> : <></>}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={modalType === "folder" ? addFolder : addFile}
        title={modalType === "folder" ? "Create New Folder" : "Create New File"}
        placeholder={
          modalType === "folder" ? "Enter folder name" : "Enter file name"
        }
      />
    </div>
  );
};

export default ProfilePage;


