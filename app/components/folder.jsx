import Link from 'next/link'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'


const folder = ({folder, onFolderDelete}) => {
  const [f, setF] = useState(folder)

  const handleFolderDelete = async () => {
    try {
      const res = await fetch(`/api/folders/${f._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Deleting Folder...");

      if (res.ok) {
        console.log("folder deleted");
        onFolderDelete(f._id);
      } else {
        throw new Error("Error deleting folder");
      }
    } catch (error) {
      console.error("fetch error:", error);
    }
  }

  return (
    <>
        <Link className="w-1/4 btn-nocolor" href={`/profile/${f._id}`}>
            <div className="folder flex flex-col gap-1 h-40 w-full border-2 rounded-2xl">
                <h1 className="text-lg font-bold self-center pt-5 pb-2">{f.name}</h1>
                <hr className="h-1 mx-2 my-2"></hr>
                <p className="self-center">Last Modified: {new Date(f.updatedAt).toLocaleString()} </p>
                <button className="absolute top-4 right-4 m-2" onClick={(e) => {
                  e.preventDefault();
                  handleFolderDelete();
                }} ><FontAwesomeIcon className="theme-icon" icon={faTrashCan} /></button>
            </div>
        </Link>

    </>
  )
}

export default folder