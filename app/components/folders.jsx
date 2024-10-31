import { useEffect } from "react";
import Folder from "./folder";

const Folders = ({ rootFolder }) => {
  useEffect(() => {
    console.log("rootFolder updated in folders.jsx:", rootFolder);
  }, [rootFolder]);

  return (
    <div className="flex flex-wrap gap-9 px-24 justify-between">
      {Array.isArray(rootFolder.folders) &&
        rootFolder.folders.map(f => (
          <Folder key={f._id} folder={f} />
        ))}
    </div>
  );
};

export default Folders;
