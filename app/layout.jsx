"use client";

import "./globals.css";
import Navbar from "./components/navbar";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { useState, useEffect } from 'react';

export default function RootLayout({ children }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);
  
  return (
    <html lang="en" data-theme={theme}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,height=device-height,initial-scale=1" />
      </head>
      <UserProvider>
        <body>
          <Navbar/>
          <main className="bg-scroll">
            {children}
          </main>
        </body>
      </UserProvider>
    </html>
  );
}
