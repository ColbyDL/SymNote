import "./globals.css";
import Navbar from "./components/navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="pastel">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,height=device-height,initial-scale=1" />
        

      </head>
      <body>
        <Navbar />
        <nav></nav>
        <main className="navBarShift z-1">
          {children}
        </main>
      </body>
    </html>
  );
}
