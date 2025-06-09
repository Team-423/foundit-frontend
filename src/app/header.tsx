"use client";
import Link from "next/link";
import Image from "next/image";
import { FaUserAlt } from "react-icons/fa";

const Header = () => {
  return (
    <header className="w-full p-4 shadow-md sticky top-0 z-[100] bg-[#627C85]">
      {/* Header container */}
      <div className="max-w-screen-lg mx-auto flex items-center justify-between px-4 py-4 h-25">
        {/* Logo Section */}
        <Link href="/">
          <Image
            className="transition-transform duration-300 hover:scale-110"
            src="/images/logo/found-it-logo.png"
            alt="FoundIt logo"
            width={180}
            height={180}
            priority
          />
        </Link>

        {/* Post buttons */}
        <nav className="flex items-center gap-4">
          <Link
            href="/postLostItem"
            className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition font-bold"
          >
            Post Lost Item
          </Link>
          <Link
            href="/postFoundItem"
            className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition font-bold"
          >
            Post Found Item
          </Link>
        </nav>

        {/* User Section */}
        <Link href="/profile">
          <div className="flex items-center gap-3 text-gray-700">
            <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center">
              <FaUserAlt className="text-slate-700" size={20} />
            </div>
            <span className="font-semibold text-white">{"<username>"}</span>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
