'use client'
//import TextEditor from '../../components/textEditor'
import dynamic from 'next/dynamic'

const TextEditor = dynamic(() => import('../../components/textEditor'), { ssr: false })

const editorPage = () => {


  return (
    <div>
        <TextEditor />
    </div>
  )
}

export default editorPage