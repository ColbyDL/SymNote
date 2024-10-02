import Link from 'next/link'
import FolderFileButtons from '../components/folderFileButtons'
import Folders from '../components/folders'
import FileTable from '../components/fileTable'

const ProfilePage = () => {
  return (
    <div className="h-full w-full p-2 pt-10">
      <div>
        <FolderFileButtons />
      </div>
      <div className="flex flex-wrap gap-2 justify-evenly p-10">
        <Folders />
        <Folders />
        <Folders />
        <Folders />
      </div>
      <div>
        <FileTable />
      </div>
    </div>
  )
}

export default ProfilePage