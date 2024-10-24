'use client'
import { useState, useEffect } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useUser } from '@auth0/nextjs-auth0/client';

import Link from "next/link";
import Image from "next/image";
import Logo from "../public/images/SymNote_Png_Logo.png";

//import Folder from "../../models/foldersModel"
//import { BrowserRouter } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';



const Navbar = () => {
  const { user, error, isLoading } = useUser();

  function dropDownMenu() {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  }
   
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
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="py-1">
                <MenuItem>
                  <a
                    href="/profile/user"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  >
                    Files
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="/api/auth/logout"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
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
