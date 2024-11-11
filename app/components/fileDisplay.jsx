import Link from 'next/link'


const fileDisplay = ({ file }) => {
  console.log("file._id", file._id)

  
  return (
        <tr className="file-display">
            <td className="text-center h-14">{file.name}</td>
            <td className="text-center">Last Modified: {new Date(file.updatedAt).toLocaleString()}</td>
            <td className="text-center"><Link href={`/documents/${file._id}`} className="transition duration-100 transform hover:font-bold text-2xl hover:text-4xl">Edit</Link></td>
        </tr>
  )
}

export default fileDisplay