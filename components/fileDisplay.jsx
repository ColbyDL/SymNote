import Link from 'next/link'


const fileDisplay = () => {

  
  return (
        <tr className="">
            <td className="border border-slate-400 text-center bg-slate-200 h-14">File Name</td>
            <td className="border border-slate-400 text-center bg-slate-200">File Description</td>
            <td className="border border-slate-400 text-center bg-slate-200">Last Modified</td>
            <td className="border border-slate-400 text-center bg-slate-200"><Link href="/documents/myDocument" className="transition duration-100 transform hover:font-bold text-sky-600 text-2xl hover:text-4xl hover:text-red-700">Edit</Link></td>

        </tr>
  )
}

export default fileDisplay