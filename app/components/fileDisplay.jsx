import { Button } from '@headlessui/react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'


const fileDisplay = ({ file, onFileDelete }) => {
  console.log("file._id", file._id)

  const handleFileDelete = async () => {
    try {
      const res = await fetch(`/api/files/${file._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Deleting File...");

      if (res.ok) {
        console.log("file deleted");
        onFileDelete(file._id);
      } else {
        throw new Error("Error deleting file");
      }
    } catch (error) {
      console.error("fetch error:", error);
    }
  }
  return (
        <tr className="file-display">
            <td className="text-center h-14">{file.name}</td>
            <td className="text-center">Last Modified: {new Date(file.updatedAt).toLocaleString()}</td>
            <td className="text-center"><Link href={`/documents/${file._id}`} className="transition duration-100 transform hover:font-bold text-2xl hover:text-4xl">Edit</Link></td>
            <td className="text-center"><button onClick={(e) => {
              e.preventDefault();
              handleFileDelete();
            }} ><FontAwesomeIcon className="theme-icon" icon={faTrashCan} /></button></td>
        </tr>
  )
}

export default fileDisplay