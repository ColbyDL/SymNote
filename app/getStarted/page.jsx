import TextEditor from '../components/textEditor';
import FileNav from '../components/fileNav';

const getStarted = () => {
  return (
    <div>
      <div>
        <FileNav />
      </div>
      <TextEditor />
    </div>
  )
}

export default getStarted;