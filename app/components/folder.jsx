import Link from 'next/link'

const folder = ({folder}) => {

  console.log("folder props", folder)
  return (
    <>
        <Link className="w-1/4 btn-nocolor" href={`/profile/${folder._id}`}>
            <div className="folder flex flex-col gap-1 h-40 w-full border-2 rounded-2xl">
                <h1 className="text-lg font-bold self-center pt-5 pb-5">{folder.name}</h1>
                <hr className="h-1 mx-2 my-2"></hr>
                <p className="self-center">Last Modified: {new Date(folder.updatedAt).toLocaleString()} </p>
            </div>
        </Link>

    </>
  )
}

export default folder