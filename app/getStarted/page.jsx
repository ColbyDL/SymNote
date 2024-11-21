'use client'
import dynamic from 'next/dynamic'
const TextEditorStarted = dynamic(() => import('../components/textEditorStarted'), { ssr: false })
const GetStarted = () => {
  return (
    <div>
      <TextEditorStarted />
    </div>
  )
}

export default GetStarted;