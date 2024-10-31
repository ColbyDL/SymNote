import Folder from "./folder";

const folders = ({ rootFolder }) => {

  console.log("folders", rootFolder.folders)

  return (
    <div className="flex flex-wrap gap-9 px-24 justify-between">

        {Array.isArray(rootFolder.folders) &&
          rootFolder.folders.map(f => (
            <Folder key={f._id} folder={f} />
        ))} 
      
    </div>
  );
};

export default folders;
