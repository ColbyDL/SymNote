'use client'
import { useState, useEffect } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useUser } from '@auth0/nextjs-auth0/client';

import Link from "next/link";
import Image from "next/image";
import Logo from "../public/images/SymNote_Png_Logo.png";


import { BrowserRouter } from 'react-router-dom';



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';

const Navbar =  () => {

  //themes
  const [isDarkMode, setIsDarkMode] = useState(false);

  //auth0
  const { user, error, isLoading } = useUser();

  //getProfile
  const [ profile, setProfile ] = useState(null);
  
  function dropDownMenu() {
    const [isOpen, setIsOpen] = useState(false);
  }
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
    
  //themes
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

  //themes
  useEffect(() => {
    const localState = localStorage.getItem('theme');
    if (localState === 'dark'){
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
  }, []);

  
  const createOrFindProfile = async () => {
    if (!user) return;

    const auth0Id = user.sub;
    const name = user.name;
    const email = user.email;

    try {
      const res = await fetch('/api/profiles', {
        method: 'POST',
        headers: {
          'Conent-Type': 'applicaiton/json',
        },
        body: JSON.stringify({ auth0Id, name, email }),
      });

      if (res.ok) {
        console.log("res.ok")
        const data = await res.json();
        setProfile(data.profile)
      } else {
        throw new error("Error creating or finding profile");
      }

    } catch (error) {
      console.error("fetch error:", error);
    }

  }

  useEffect(() => {
    if (!isLoading) createOrFindProfile();
  }, [isLoading]);

  
  if (isLoading) return (
      <nav>
        <div className="navBar">
          <div className="logo-div">
            <Link href = "/">
              <Image className = "btn-logo" src={Logo} alt="logo-alt"></Image>
            </Link>
          </div>
          <div className="align-middle place-self-center pr-24"> 
            <h2 className="text-white text-3xl">Loading...</h2>

          </div>
        <div className="flex h-full gap-10 pr-20"> 
          <Link href="/docs" className="btn-primary self-center w-20">
            <h2 className="text-center">Docs</h2>
          </Link>
          <a href="/api/auth/login" className="btn-primary self-center">
            <h2 className="whitespace-nowrap">Loading...</h2>
          </a>
          <button onClick={toggleDarkMode}>
            {isDarkMode ? <FontAwesomeIcon className='theme-icon' icon={faMoon} /> : <FontAwesomeIcon className='w-8 h-8 transform transition duration-150 hover:scale-110 text-cyan-600' icon={faSun} />}
          </button>
        </div>
      </div>
    </nav> 
  );

  if (error) return <div>{error.message}</div>;
  if (user) {
    return (
      <nav>
        <div className="navBar">
          <div>
            <Link href = "/">
              <Image className = "btn-logo" src={Logo} alt="logo-alt"></Image>
            </Link>
          </div>
          <div className="place-content-center"> 
            <Link href="/docs" className="btn-primary">
              <h2 className="text-center">Docs</h2>
            </Link>

            <Menu as="div" className="relative inline-block text-left">
              <div>
                <MenuButton className="btn-primary">
                  {user.name}
                  <FontAwesomeIcon icon={faChevronDown} className="pl-2"/>
                </MenuButton>
              </div>
            <MenuItems
              transition
              className="dropdown-content absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="py-1">
                <MenuItem>
                  <Link
                    href="/profile/user"
                    className="block px-4 py-2 text-sm data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  >
                    Files
                  </Link>
                </MenuItem>
                <MenuItem>
                  <a
                    href="/api/auth/logout"
                    className="block px-4 py-2 text-sm data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  >
                    Logout
                  </a>
                </MenuItem>
              </div>
            </MenuItems>
            </Menu>
            <Link href = "/settings">
              <FontAwesomeIcon icon={faGear} className="settings-icon w-8 h-8 align-middle hover:animate-spin animate-once animate-ease-in-out"/>
            </Link>

          </div>
        </div>
      </nav>
    );
  }
  return (
    <nav>
      <div className="navBar">
        <div>
          <Link href = "/">
            <Image className = "btn-logo" src={Logo} alt="logo-alt"></Image>
          </Link>
        </div>
        <div className="place-content-center"> 
          <Link href="/docs" className="btn-primary">
            <h2 className="text-center">Docs</h2>
          </Link>
          <a href="/api/auth/login" className="btn-primary">
            <h2>Log In/Sign Up</h2>
          </a>
          <Link href = "/settings">
              <FontAwesomeIcon icon={faGear} className="settings-icon w-8 h-8 align-middle hover:animate-spin animate-once animate-ease-in-out"/>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
