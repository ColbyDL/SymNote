import Link from 'next/link'

const folder = () => {
  return (
    <>
        <Link className="w-1/4 btn-nocolor" href='/'>
            <div className="flex flex-col gap-1 bg-slate-200 h-72 w-full border-black border-2 rounded-2xl">
                <h1 className="text-lg font-bold self-center pt-5 pb-5">Folder</h1>
                <p className="self-center h-1/2">description: This is some text</p>
                <hr className="bg-black h-1 mx-2 my-2"></hr>
                <p className="self-center">Last Modified: 01/01/1900</p>
            </div>
        </Link>

    </>
  )
}

export default folder