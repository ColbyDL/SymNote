import Link from "next/link";
import Image from "next/image";
import tempImage from '../public/images/TempPreview.jpg';

const heroWelcome = () => {
  return (
    <div className="grid grid-cols-2 gap-10 h-full ">
        <div className="flex flex-col justify-center align-middle gap-8 pl-40">
            <h1 className="self-center text-9xl font-mono">SymNote</h1>
            <p className="self-center">This is some text</p>
            <Link href="/" className="btn-primary self-center"><h1>Get Started</h1></Link>
        </div>
        <div className="h-full w-full">
            <Image className="w-auto h-5/6 mx-auto pr-40" src={tempImage} alt="tempImage" />
        </div>
    </div>
  )
}

export default heroWelcome