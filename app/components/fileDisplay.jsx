import Link from 'next/link'


const fileDisplay = () => {

  
  return (
        <tr className="file-display">
            <td className="text-center h-14">File Name</td>
            <td className="text-center">File Description</td>
            <td className="text-center">Last Modified</td>
            <td className="text-center"><Link href="/documents/myDocument" className="transition duration-100 transform hover:font-bold text-2xl hover:text-4xl">Edit</Link></td>
        </tr>
  )
}

export default fileDisplay