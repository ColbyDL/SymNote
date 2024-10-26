import Link from 'next/link'


const fileDisplay = () => {

  
  return (
        <tr className="file-display">
            <td className="border border-slate-400 text-center h-14">File Name</td>
            <td className="border border-slate-400 text-center">File Description</td>
            <td className="border border-slate-400 text-center">Last Modified</td>
            <td className="border border-slate-400 text-center"><Link href="/documents/myDocument" className="transition duration-100 transform hover:font-bold text-2xl hover:text-4xl">Edit</Link></td>

        </tr>
  )
}

export default fileDisplay