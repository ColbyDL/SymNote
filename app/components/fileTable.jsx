
import Link from 'next/link'

import FileDisplay from './fileDisplay'

const fileTable = () => {

  
  return (
    <div className="w-full px-16">
      <table className="table-fixed w-full border-separate border-spacing-2">
        <thead className="h-10">
          <tr className="file-table-header">
            <th className="rounded-tl-3xl">File Name</th>
            <th className="">Description</th>
            <th className="">Last Modified</th>
            <th className="rounded-tr-3xl">Link</th>
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
