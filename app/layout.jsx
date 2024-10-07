import "./globals.css";
import Navbar from "./components/navbar";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { connectToMongoDB } from "../lib/mongodb";

export default function RootLayout({ children }) {
  connectToMongoDB();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
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
