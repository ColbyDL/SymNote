import Link from "next/link";

const folderFileButtons = () => {
  return (
    <div className="flex items-center justify-around h-10">
      <Link href='/'><button className='btn-primary w-72 h-20'><h3 className="text-2xl">New Folder</h3></button></Link>
      <Link href='/'><button className='btn-primary w-72 h-20'><h3 className="text-2xl">New File</h3></button></Link>
    </div>
  );
};

export default folderFileButtons;
