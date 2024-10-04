
import Link from 'next/link'

import FileDisplay from './fileDisplay'

const fileTable = () => {

  
  return (
    <div className="w-full px-16">
      <table className="table-fixed w-full border-separate border-spacing-2">
        <thead className="h-10">
          <tr>
            <th className="rounded-tl-3xl border border-slate-400 bg-slate-500">File Name</th>
            <th className="border border-slate-400 bg-slate-500">Description</th>
            <th className="border border-slate-400 bg-slate-500">Last Modified</th>
            <th className="border rounded-tr-3xl border-slate-400 bg-slate-500">Link</th>
          </tr>
        </thead>
        <tbody className="w-full">
          <FileDisplay />
          <FileDisplay />
          <FileDisplay />
          <FileDisplay />
          <FileDisplay />
          <FileDisplay />
        </tbody>
      </table>
    </div>
  );
};

export default fileTable;
