import Link from 'next/link'

const fileTable = () => {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="hover">
              <th></th>
              <th>Name</th>
              <th>Text</th>
              <th>Last Modified</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr className="hover">
              <th>1</th>
              <td>File 1</td>
              <td>This is some text</td>
              <td>01/01/2024</td>
              <td><Link href="/temporary"><button className="btn-sm bg-slate-400 rounded-md">Open</button></Link></td>
            </tr>
            {/* row 2 */}
            <tr className="hover">
              <th>2</th>
              <td>File 2</td>
              <td>This is some text</td>
              <td>01/01/2024</td>
              <td><Link href="/"><button className="btn-sm bg-slate-400 rounded-md">Open</button></Link></td>
            </tr>
            {/* row 3 */}
            <tr className="hover">
              <th>3</th>
              <td>File 3</td>
              <td>This is some text</td>
              <td>01/01/2024</td>
              <td><Link href="/"><button className="btn-sm bg-slate-400 rounded-md">Open</button></Link></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default fileTable;
