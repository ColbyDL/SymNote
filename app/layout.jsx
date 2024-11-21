"use client";

import "./globals.css";
import Navbar from "./components/navbar";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { useState, useEffect } from 'react';
import Head from "next/head";

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
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,height=device-height,initial-scale=1" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Math&display=swap"/>

      </Head>
      <UserProvider>
        <body>
          <Navbar/>
          <main className="">
            {children}
          </main>
        </body>
      </UserProvider>
    </html>
  );
}
