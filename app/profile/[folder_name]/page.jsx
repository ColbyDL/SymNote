import Link from 'next/link'
import FolderFileButtons from '../../components/folderFileButtons'
import Folders from '../../components/folders'
import FileTable from '../../components/fileTable'

const ProfilePage = () => {
  return (
    <div className="">
      <div className="h-40 pt-20">
        <FolderFileButtons />
      </div>
      <div className="">
        <Folders />
      </div>
      <div className="pt-40">
        <FileTable />
      </div>
    </div>
  )
}

export default ProfilePage