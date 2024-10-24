'use client'
import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

import Link from "next/link";
import Image from "next/image";
import Logo from "../public/images/SymNote_Png_Logo.png";

import { BrowserRouter } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import { faMoon } from '@fortawesome/free-solid-svg-icons'


const Navbar = () => {
  const [homeButtonText, setHomeButtonText] = useState(true);

  const [isDarkMode, setIsDarkMode] = useState(false);

  const [profile, setProfile] = useState(null);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const { user, error, isLoading: isAuthLoading } = useUser();

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
  
  useEffect(() => {
    console.log("useEffect triggered with user:", user, "isAuthLoading:", isAuthLoading);
    if (user && !isAuthLoading) {
      const fetchProfile = async () => {
        setIsProfileLoading(true);
        try {
          console.log("Fetching profile for auth0Id:", user.sub);
          const res = await fetch(`/api/Profiles?auth0Id=${user.sub}`);
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const data = await res.json(); // Read the response body only once
          console.log("Profile fetch response:", data);
          if (data.success) {
            setProfile(data.data);
          } else {
            console.log("Creating new profile");
            const createRes = await fetch('/api/Profiles', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ auth0Id: user.sub, email: user.email, name: user.name }),
            });
            if (!createRes.ok) {
              throw new Error(`HTTP error! status: ${createRes.status}`);
            }
            const createData = await createRes.json(); // Read the response body only once
            console.log("Profile creation response:", createData);
            if (createData.success) {
              setProfile(createData.data);
            }
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
        } finally {
          setIsProfileLoading(false);
        }
      };
      fetchProfile();
    }
  }, [user, isAuthLoading]);
  

  if (isAuthLoading || isProfileLoading) return (
      <nav className="navBar">
        <div className="flex h-20 items-center justify-between pl-20">
          <div className="flex h-full gap-10">
            <Link onMouseOver={() => setHomeButtonText((prevState) => !prevState)} onMouseOut={() => setHomeButtonText((prevState) => !prevState)}href="/" className="btn-primary self-center opacity-0">
              <h2 >{homeText}</h2>
            </Link>
            <Image className="w-auto h-auto" alt="logo-alt" src={Logo}></Image>
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
          {profile ? (
            <Link href={`/profile/${profile._id}`} className="btn-primary self-center">
              <h2 className="whitespace-nowrap">{profile.name}</h2>
            </Link>
          ) : (
            <div className="btn-primary self-center">
              <h2 className="whitespace-nowrap">Loading...</h2>
            </div>
          )}
            <a href="/api/auth/logout" className="btn-primary self-center">
              <h2 className="whitespace-nowrap">Logout</h2>
            </a>
            <button onClick={toggleDarkMode}>
            {isDarkMode ? <FontAwesomeIcon className='theme-icon' icon={faMoon} /> : <FontAwesomeIcon class='w-8 h-8 transform transition duration-150 hover:scale-110 text-cyan-600' icon={faSun} />}
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
