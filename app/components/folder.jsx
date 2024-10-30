import Link from 'next/link'

const folder = ({folder}) => {
  return (
    <>
        <Link className="w-1/4 btn-nocolor" href='/profile/folder'>
            <div className="folder flex flex-col gap-1 h-72 w-full border-2 rounded-2xl">
                <h1 className="text-lg font-bold self-center pt-5 pb-5">{folder.name}</h1>
                <p className="self-center h-1/2">description: This is some text</p>
                <hr className="h-1 mx-2 my-2"></hr>
                <p className="self-center">Last Modified: {folder.updatedAt} </p>
            </div>
        </Link>

    </>
  )
}

export default folder