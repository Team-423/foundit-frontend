"use client";
import Image from "next/image";
import Link from "next/link";

import { FaUserAlt } from "react-icons/fa";
import { useUser } from "../contexts/UserContext";

const Header = () => {
  const { user, isLoggedIn, userType } = useUser();

  // Display name logic
  const displayName = user?.name || "Guest";

  // Determine the profile link based on login status
  const profileHref = isLoggedIn ? `/profile/${user?.id}` : "/login";

  // Show different buttons based on user type
  // const shouldShowPostButtons =
  //   isLoggedIn && (userType === "seeker" || userType === "finder");

  return (
    <header className="w-full p-4 shadow-md sticky top-0 z-[100] bg-[#9FD8CE]">
      <div className="max-w-screen-lg mx-auto flex items-center justify-between px-4 py-4 h-25">
        {/* Logo Section */}
        <Link href="/">
          <Image
            className="transition-transform duration-300 hover:scale-110 w-45 h-auto"
            src="/images/logo/found-it-logo.png"
            alt="FoundIt logo"
            width={220}
            height={220}
          />
        </Link>

        {/* Post buttons - only show for logged in seekers/finders */}

        <nav className="flex items-center gap-4">
          <Link
            href="/postLostItem"
            className="px-4 py-2 rounded-md bg-[#5a189a] text-white hover:bg-[#3c096c] transition font-bold"
          >
            Post Lost Item
          </Link>
          <Link
            href="/postFoundItem"
            className="px-4 py-2 rounded-md bg-[#9d4edd] text-white hover:bg-[#3c096c] transition font-bold"
          >
            Post Found Item
          </Link>
        </nav>

        {/* User Section */}
        <Link href={profileHref}>
          <div className="flex items-center gap-3 text-gray-700 hover:opacity-80 transition-opacity">
            <div className="w-14 h-14 bg-[#22577A] rounded-full flex items-center justify-center">
              <FaUserAlt className="text-white" size={20} />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-black">{displayName}</span>
              {userType ? (
                <span className="text-xs text-gray-600 capitalize">
                  {userType}
                </span>
              ) : (
                <span className="text-xs text-gray-600">Click to login</span>
              )}
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
