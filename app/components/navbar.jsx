import Link from 'next/link'
import Image from 'next/image'
import Logo from '../public/images/SymNote_Png_Logo.png'


const navbar = () => {
  return (
    <div className="navbar bg-base-100 fixed">
        <div className="flex-1">
        <Link href="/" className="btn btn-ghost h-full"><Image src={Logo} className="w-10 h-full"/></Link>
        </div>
        <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
            <li><Link href="/">Get Started</Link></li>
            <li>
            <details>
                <summary>Profile</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                <li><Link href="/">Log In</Link></li>
                <li><Link href="/">Sign Up</Link></li>
                </ul>
            </details>
            </li>
        </ul>
        </div>
    </div> 
  )
}

export default navbar