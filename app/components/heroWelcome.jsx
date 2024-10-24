import Link from "next/link";
import Image from "next/image";
import tempImage from '../public/images/TempPreview.jpg';

const heroWelcome = () => {
  return (
    <div className="flex flex-row h-full w-full">
        <div className="flex flex-col justify-center gap-4 p-4 m-auto">
            <h1 className="self-center text-9xl font-mono max-[515px]:text-7xl">SymNote</h1>
            <p className="self-center">This is some text</p>
            <Link href="/getStarted" className="btn-primary self-center"><h1>Get Started</h1></Link>
        </div>
        <div className="my-auto mr-auto max-[919px]:hidden">
            <Image className="w-96 h-96 object-scale-down p-4" src={tempImage} alt="tempImage" />
        </div>
    </div>
  )
}

export default heroWelcome