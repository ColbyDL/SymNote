"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Modal from "../../components/modal";
import MoveModal from "../../components/moveModal";
import RandomSymbols from "../../effects/randomSymbols";

import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProfilePage = () => {
  const { rootFolderId } = useParams();
  const [rootFolder, setRootFolder] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(null);

  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
  const [selectedDestinationFolder, setSelectedDestinationFolder] =
    useState("");
  const [fileToMove, setFileToMove] = useState(null);

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
    try {
      const res = await fetch(`/api/files`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fileName,
          folderId: rootFolderId,
        }),
      });
      console.log("Creating New File...");
      if (res.ok) {
        console.log("res.ok file creation");
        const data = await res.json();
        const { file, updatedParent } = data;
        console.log("new file", file);
        console.log("updated parent FOlder", updatedParent);
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

  const handleFileDelete = async (fileId) => {
    try {
      const res = await fetch(`/api/files/${fileId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Deleting File...");

      if (res.ok) {
        setRootFolder((prev) => ({
          ...prev,
          files: prev.files.filter((file) => file._id !== fileId),
        }));
        console.log("file deleted");
      } else {
        throw new Error("Error deleting file");
      }
    } catch (error) {
      console.error("fetch error:", error);
    }
  };

  const handleFolderDelete = async () => {
    if (!selectedFolder) return;

    try {
      const res = await fetch(`/api/folders/${selectedFolder}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Deleting Folder...");

      if (res.ok) {
        setRootFolder((prev) => ({
          ...prev,
          folders: prev.folders.filter((f) => f._id !== selectedFolder),
        }));
        setSelectedFolder(null);

        console.log("folder deleted");
      } else {
        throw new Error("Error deleting folder");
      }
    } catch (error) {
      console.error("fetch error:", error);
    }
  };

  const moveFile = async (fileId, newFolderId) => {
    try {
      const res = await fetch("/api/files/move", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileId,
          oldFolderId: rootFolderId,
          newFolderId,
        }),
      });
  
      if (res.ok) {
        const data = await res.json();
        console.log("File moved successfully", data);
  
        // Trigger a re-fetch of the folder data from the backend to ensure the UI is updated
        fetchRootFolderData();
      } else {
        console.error("Error moving file");
      }
    } catch (error) {
      console.error("moveFile error:", error);
    }
  };
  
  // Function to refetch folder data from the backend
  const fetchRootFolderData = async () => {
    try {
      const res = await fetch(`/api/folders/${rootFolderId}`);
      if (res.ok) {
        const updatedData = await res.json();
        setRootFolder(updatedData);
      } else {
        console.error("Error fetching folder data");
      }
    } catch (error) {
      console.error("Error fetching folder data:", error);
    }
  };
   
  

  return (
    <div className="">
      <div className="flex flex-row">
        <div className="flex flex-row justify-start items-center backdrop-blur-lg bg-white/10 w-1/2 ml-10 h-20 rounded-l-3xl">
          <div className="px-4 pl-20">
            <button>
              <FontAwesomeIcon
                icon={faFileCirclePlus}
                onClick={() => {
                  setModalType("file");
                  setIsModalOpen(true);
                }}
                className="text-4xl"
              />
            </button>
          </div>
          <div className="px-4">
            <button>
              <FontAwesomeIcon
                icon={faFolderPlus}
                onClick={() => {
                  setModalType("folder");
                  setIsModalOpen(true);
                }}
                className="text-4xl"
              />
            </button>
          </div>
        </div>
        <div className="flex flex-row justify-around items-center backdrop-blur-lg bg-white/10 w-1/2 mr-10 h-40 rounded-b-3xl rounded-r-3xl">
          {rootFolder ? (
            <div className="flex justify-start">
              <h1 className="text-5xl">{rootFolder.name}</h1>
            </div>
          ) : (
            <></>
          )}

          <div className="flex flex-col justify-end">
            <div className="self-center flex">
              <div>
                <button className="">
                  <FontAwesomeIcon
                    onClick={handleFolderDelete}
                    disabled={!selectedFolder}
                    icon={faTrashCan}
                    className="text-4xl"
                  />
                </button>
              </div>
              
            </div>

            <div className="pt-3">
              <select
                className="bg-white/20 text-black rounded-md px-4 py-2 cursor-pointer"
                value={selectedFolder || ""}
                onChange={(e) => setSelectedFolder(e.target.value)}
              >
                <option value="" disabled>
                  Select folder to delete
                </option>
                {rootFolder?.folders?.map((folder) => (
                  <option key={folder._id} value={folder._id}>
                    {folder.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="flex flex-col backdrop-blur-lg bg-white/10 w-1/2 h-96 mx-20 rounded-2xl overflow-auto p-4">
          {rootFolder && rootFolder.files ? (
            rootFolder.files.map((f) => (
              <div
                key={f._id}
                className="flex flex-row justify-stretch items-center border-b-2 p-3"
              >
                <Link
                  href={`/documents/${f._id}`}
                  className="flex flex-row justify-start items-center w-4/5"
                >
                  <FontAwesomeIcon icon={faFile} className="text-xl px-4" />
                  <h2 className="text-xl px-4">{f.name}</h2>
                </Link>
                <div className="flex flex-row justify-end items-center w-1/5">
                  <button>
                    <FontAwesomeIcon
                      onClick={() => {
                        setFileToMove(f._id);
                        setIsMoveModalOpen(true);
                      }}
                      icon={faArrowRight}
                      className="text-xl px-4"
                    />
                  </button>
                  <button onClick={() => handleFileDelete(f._id)}>
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className="text-xl px-4"
                    />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
        <div className="w-1/2 h-96 mx-20 grid grid-cols-4 overflow-auto p-4 gap-4 pt-20">
          {rootFolder && rootFolder.folders ? (
            rootFolder.folders.map((f) => (
              <div key={f._id}>
                <Link
                  href={`/profile/${f._id}`}
                  className="flex flex-col justify-center items-center"
                >
                  <FontAwesomeIcon icon={faFolder} className="text-6xl" />
                  <h5>{f.name}</h5>
                </Link>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="symbol-backdrop flex flex-row place-items-end justify-around">
        <RandomSymbols />
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
      <MoveModal
        isOpen={isMoveModalOpen}
        onClose={() => setIsMoveModalOpen(false)}
        onSubmit={() => {
          if (fileToMove && selectedDestinationFolder) {
            moveFile(fileToMove, selectedDestinationFolder);
          }
        }}
        title="Move File"
        folders={rootFolder?.folders} // Pass the list of folders here
        selectedFolder={selectedDestinationFolder}
        setSelectedFolder={setSelectedDestinationFolder}
      />
    </div>
  );
};

export default ProfilePage;







/*
import Link from "next/link";
import FolderFileButtons from "../../components/folderFileButtons";
import Folders from "../../components/folders";
import FileTable from "../../components/fileTable";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Modal from "../../components/modal";

const ProfilePage = () => {
  const { rootfolderid } = useparams();
  const [rootFolder, setRootFolder] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [moveModalOpen, setMoveModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [newParentId, setNewParentId] = useState("");
  

  
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

  const removeFolder = (folderId) => {
    setRootFolder(prev => ({
      ...prev,
      folders: prev.folders.filter((folder) => folder._id !== folderId)
    }));
  };

  const removeFile = (fileId) => {
    setRootFolder(prev => ({
      ...prev,
      files: prev.files.filter((file) => file._id !== fileId)
    }));
  };

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
    try {
      const res = await fetch(`/api/files`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fileName,
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



  const moveFile = async (fileId, newFolderId) => {
    try {
      const res = await fetch('/api/files/move', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileId, oldFolderId: rootFolderId, newFolderId }),
      });
      if (res.ok) {
        const data = await res.json();
        setRootFolder(data.updatedParent);
      } else {
        console.error("Error moving file");
      }
    } catch (error) {
      console.error("moveFile error:", error);
    }
  };

  const moveFolder = async (folderId, newParentId) => {
    try {
      const res = await fetch('/api/folders/move', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folderId, oldParentId: rootFolderId, newParentId }),
      });
      if (res.ok) {
        const data = await res.json();
        setRootFolder(data.updatedParent);
      } else {
        console.error("Error moving folder");
      }
    } catch (error) {
      console.error("moveFolder error:", error);
    }
  };

  const openMoveModal = (itemId, type) => {
    setSelectedItemId(itemId);
    setModalType(type);
    setMoveModalOpen(true);
  };

  const handleMoveSubmit = () => {
    if (modalType === "file") {
      moveFile(selectedItemId, newParentId);
    } else if (modalType === "folder") {
      moveFolder(selectedItemId, newParentId);
    }
    setMoveModalOpen(false);
    setNewParentId("");
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
      <div>{rootFolder ? <Folders key={`${rootFolder._id}-${rootFolder.folders.length}`} rootFolder={rootFolder} removeFolder={removeFolder} /> : <></>}</div>
      <div className="pt-40">
        {rootFolder ? <FileTable key={`${rootFolder._id}-${rootFolder.files.length}`}  rootFolder={rootFolder} removeFile={removeFile} /> : <></>}
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
      <Modal isOpen={moveModalOpen} onClose={() => setMoveModalOpen(false)} onSubmit={handleMoveSubmit} title={`Move ${modalType}`} placeholder="Enter new parent folder ID" value={newParentId} onChange={(e) => setNewParentId(e.target.value)} />
    </div>
  );
};

export default ProfilePage;


*/

