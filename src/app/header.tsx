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
      <div className="max-w-screen-lg mx-auto flex flex-wrap items-center justify-between px-4 py-4 gap-y-4">
        {/* Logo Section */}
        <Link
          href="/"
          className="w-full sm:w-auto flex justify-center sm:justify-start"
        >
          <Image
            className="transition-transform duration-300 hover:scale-110"
            src="/images/logo/found-it-logo.png"
            alt="FoundIt logo"
            width={150}
            height={150}
            priority
          />
        </Link>

        {/* Post buttons - only show for logged in seekers/finders */}

        <nav className="flex flex-row sm:flex-wrap items-center gap-4 px-2 sm:px-4 w-full sm:w-auto">
          <Link
            href="/postLostItem"
            className="w-full sm:w-[160px] text-center px-4 py-2 rounded-md bg-[#168aad] text-white hover:bg-[#1e6091] transition font-bold"
          >
            Post Lost Item
          </Link>
          <Link
            href="/postFoundItem"
            className="w-full sm:w-[160px] text-center px-4 py-2 rounded-md bg-[#168aad] text-white hover:bg-[#1e6091] transition font-bold"
          >
            Post Found Item
          </Link>
        </nav>

        {/* User Section */}
        <Link
          href={profileHref}
          className="w-full sm:w-auto flex justify-center sm:justify-end"
        >
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
