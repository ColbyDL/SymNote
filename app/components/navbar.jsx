import Link from 'next/link'
import Image from 'next/image'
import Logo from '../public/images/SymNote_Png_Logo.png'



const Navbar = () => {
  return (
    <div className="w-full h-1/6 max-h-24 p-2 fixed top-0 left-0 z-10 bg-white">
      <div className="navbar bg-slate-500 h-full rounded-3xl">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl">SymNote</Link>
          <Image style={{paddingLeft: 20, height: 60, width: 60}}src={Logo} alt="SymNote Logo"  />
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li><Link href="/">Docs</Link></li>
            <li>
              <details>
                <summary>Profile</summary>
                <ul className="bg-slate-300 rounded-t-none p-2">
                  <li><Link href="/profile">Sign Up</Link></li>
                  <li><Link href="/profile">Log In</Link></li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </div>

       
      
     
  )
}

export default Navbar