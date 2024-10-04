'use client'
import { useState } from 'react';

import Link from "next/link";
import Image from "next/image";
import Logo from "../public/images/SymNote_Png_Logo.png";





const Navbar = () => {

  const [homeButtonText, setHomeButtonText] = useState(true);
  
  let homeText = "SymNote"
  
  if (!homeButtonText) {
    homeText = "Go Home"

  }


  return (
    <nav className="navBar">
      <div className="flex h-20 items-center justify-between pl-20">
        <div className="flex h-full gap-10">
          <Link onMouseOver={() => setHomeButtonText((prevState) => !prevState)} onMouseOut={() => setHomeButtonText((prevState) => !prevState)}href="/" className="btn-primary self-center">
            <h2 >{homeText}</h2>
          </Link>
          <Image className="w-auto h-auto" src={Logo}></Image>
        </div>
        <div className="flex h-full gap-10 pr-20"> 
          <Link href="/docs" className="btn-primary self-center w-20">
            <h2 className="text-center">Docs</h2>
          </Link>
          <Link href="/profile" className="btn-primary self-center">
            <h2 className="whitespace-nowrap">Log In or Sign Up</h2>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
