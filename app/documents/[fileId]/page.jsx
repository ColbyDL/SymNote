'use client'
//import TextEditor from '../../components/textEditor'
import dynamic from 'next/dynamic'
import FileNav from '../../components/fileNav'

const TextEditor = dynamic(() => import('../../components/textEditor'), { ssr: false })

const editorPage = () => {


  return (
    <div>
      <div>
        <FileNav />
      </div>
        <TextEditor />
    </div>
  )
}

export default editorPage