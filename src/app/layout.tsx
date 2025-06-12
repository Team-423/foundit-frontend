import Header from "./header";
import "./globals.css";
import Footer from "./footer";
import { UserProvider } from "../contexts/UserContext";
// import DebugHeader from "./components/DebugHeaderComponent";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col min-h-screen bg-[#f0f8ff]">
        <UserProvider>
          {/* <DebugHeader /> */}
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
