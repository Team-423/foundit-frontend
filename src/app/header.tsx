"use client";
import Image from "next/image";
import Link from "next/link";

import { FaUserAlt } from "react-icons/fa";

const Header = () => {
  return (
    <header className="w-full p-4 shadow-md sticky top-0 z-[100] bg-[#9FD8CE]">
      {/* Header container */}
      <div className="max-w-screen-lg mx-auto flex items-center justify-between px-4 py-4 h-25">
        {/* Logo Section */}
        <Link href="/">
          <Image
            className="transition-transform duration-300 hover:scale-110 w-45 h-auto"
            src="/images/logo/found-it-logo.png"
            alt="FoundIt logo"
            width="45"
            height="45"
          />
        </Link>

        {/* Post buttons */}
        <nav className="flex items-center gap-4">
          <Link
            href="/postLostItem"
            className="px-4 py-2 rounded-md bg-[#5a189a] text-white hover:bg-[#3c096c] transition font-bold"
          >
            Post Lost Item
          </Link>
          <Link
            href="/postFoundItem"
            className="px-4 py-2 rounded-md bg-[#9d4edd] text-white hover:bg-[#3c096c]  transition font-bold"
          >
            Post Found Item
          </Link>
        </nav>

        {/* User Section */}
        <Link href="/profile">
          <div className="flex items-center gap-3 text-gray-700">
            <div className="w-14 h-14 bg-[#22577A] rounded-full flex items-center justify-center">
              <FaUserAlt className="text-white" size={20} />
            </div>
            <span className="font-semibold text-black">{"<username>"}</span>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
