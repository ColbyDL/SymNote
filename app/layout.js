import "./globals.css";
import Navbar from "./components/navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="pastel">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
