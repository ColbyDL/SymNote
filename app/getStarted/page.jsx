'use client'
import TextEditorStarted from '../components/textEditorStarted';
import FileNav from '../components/fileNav';

const getStarted = () => {
  return (
    <div>
      <div>
        <FileNav />
      </div>
      <TextEditorStarted />
    </div>
  )
}

export default getStarted;