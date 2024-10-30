import Folder from "./folder";

const folders = ({ rootFolder }) => {


  return (
    <div className="flex flex-wrap gap-9 px-24 justify-between">

     
      {rootFolder.folders.map(f => (
        <Folder />
      ))}
    </div>
  );
};

export default folders;
