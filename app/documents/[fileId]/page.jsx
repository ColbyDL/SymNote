'use client'
//import TextEditor from '../../components/textEditor'
import dynamic from 'next/dynamic'
import fileNav from '../../components/fileNav'

const TextEditor = dynamic(() => import('../../components/textEditor'), { ssr: false })

const editorPage = () => {


  return (
    <div>
      <div>
        <fileNav />
      </div>
        <TextEditor />
    </div>
  )
}

export default editorPage