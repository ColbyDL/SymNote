import "./globals.css";
import Navbar from "./components/navbar";
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,height=device-height,initial-scale=1" />
      </head>
      <UserProvider>
        <body>
          <Navbar />
          <main className="bg-scroll">
            {children}
          </main>
        </body>
      </UserProvider>
    </html>
  );
}
