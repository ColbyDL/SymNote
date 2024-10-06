'use client'
import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

import Link from "next/link";
import Image from "next/image";
import Logo from "../public/images/SymNote_Png_Logo.png";





const Navbar = () => {

  const [homeButtonText, setHomeButtonText] = useState(true);
  
  let homeText = "SymNote"
  
  if (!homeButtonText) {
    homeText = "Go Home"

  }

  

  const { user, error, isLoading } = useUser();
  


   
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  

  if (user) {
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
            <a href="/profile" className="btn-primary self-center">
              <h2 className="whitespace-nowrap">{user.name}</h2>
            </a>
            <a href="/api/auth/logout" className="btn-primary self-center">
              <h2 className="whitespace-nowrap">Logout</h2>
            </a>
          </div>
        </div>
      </nav>
    );
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
          <a href="/api/auth/login" className="btn-primary self-center">
            <h2 className="whitespace-nowrap">Log In or Sign Up</h2>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
