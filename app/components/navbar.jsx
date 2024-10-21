'use client'
import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

import Link from "next/link";
import Image from "next/image";
import Logo from "../public/images/SymNote_Png_Logo.png";

import Folder from "../../models/foldersModel"
import { BrowserRouter } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import { faMoon } from '@fortawesome/free-solid-svg-icons'


const Navbar = () => {
  const [homeButtonText, setHomeButtonText] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { user, error, isLoading } = useUser();
  
  const toggleDarkMode = () => {
    setIsDarkMode((prevState) => {
      const newState = !prevState;
      if (newState) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme','dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newState;
    });
  };

  useEffect(() => {
    const localState = localStorage.getItem('theme');
    if (localState === 'dark'){
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
  }, []);
  
  
  let homeText = "SymNote"
  if (!homeButtonText) {
    homeText = "Go Home"

  }
   
  if (isLoading) return (
      <nav className="navBar">
        <div className="flex h-20 items-center justify-between pl-20">
          <div className="flex h-full gap-10">
            <Link onMouseOver={() => setHomeButtonText((prevState) => !prevState)} onMouseOut={() => setHomeButtonText((prevState) => !prevState)}href="/" className="btn-primary self-center opacity-0">
              <h2 >{homeText}</h2>
            </Link>
            <Image className="w-auto h-auto" src={Logo}></Image>
          </div>
          <div className="flex h-full gap-10 pr-20"> 
            <h2 className="text-white self-center text-3xl">Loading...</h2>
          </div>
        </div>
      </nav>
  );

  if (error) return <div>{error.message}</div>;
  if (user) {
    return (
      <nav className="navBar">
        <div className="flex h-20 items-center justify-between pl-20">
          <div className="flex h-full gap-10">
            <Link href = "/" className="btn-logo">
              <Image src={Logo} alt="logo-alt"></Image>
            </Link>
          </div>
          <div className="flex h-full gap-10 pr-20"> 
            <Link href="/docs" className="btn-primary self-center w-20">
              <h2 className="text-center">Docs</h2>
            </Link>
            <a href="/profile/user" className="btn-primary self-center">
              <h2 className="whitespace-nowrap">{user.name}</h2>
            </a>
            <a href="/api/auth/logout" className="btn-primary self-center">
              <h2 className="whitespace-nowrap">Logout</h2>
            </a>
            <button onClick={toggleDarkMode}>
            {isDarkMode ? <FontAwesomeIcon class='theme-icon' icon={faMoon} /> : <FontAwesomeIcon class='w-8 h-8 transform transition duration-150 hover:scale-110 text-cyan-600' icon={faSun} />}
            </button>
          </div>
        </div>
      </nav>
    );
  }
  return (
    <nav className="navBar">
      <div className="flex h-20 items-center justify-between pl-20">
      <div className="flex h-full gap-10">
            <Link href = "/" className="btn-logo">
              <Image src={Logo} alt="logo-alt"></Image>
            </Link>
          </div>
        <div className="flex h-full gap-10 pr-20"> 
          <Link href="/docs" className="btn-primary self-center w-20">
            <h2 className="text-center">Docs</h2>
          </Link>
          <a href="/api/auth/login" className="btn-primary self-center">
            <h2 className="whitespace-nowrap">Log In or Sign Up</h2>
          </a>
          <button onClick={toggleDarkMode}>
            {isDarkMode ? <FontAwesomeIcon class='theme-icon' icon={faMoon} /> : <FontAwesomeIcon class='w-8 h-8 transform transition duration-150 hover:scale-110 text-cyan-600' icon={faSun} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
