"use client";
import Image from "next/image";
import Link from "next/link";
import { FaUserAlt } from "react-icons/fa";
import { useUser } from "../contexts/UserContext";
import { useRouter } from "next/navigation";

const Header = () => {
  const { user, isLoggedIn, userType, logout } = useUser();
  const router = useRouter();
  const displayName = user?.name || "Guest";
  const profileHref = isLoggedIn ? `/profile/${user?.id}` : "/login";

  const handleLogout = () => {
    try {
      logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      window.location.href = "/login";
    }
  };

  const handlePostItemClick = (event) => {
    if (!isLoggedIn) {
      event.preventDefault();
      router.push("/guest");
    }
  };

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

        {/* Post buttons */}
        <nav className="flex flex-row sm:flex-wrap items-center gap-4 px-2 sm:px-4 w-full sm:w-auto">
          <Link
            href={isLoggedIn ? "/postLostItem" : "/guest"}
            onClick={(event) => handlePostItemClick(event)}
            className="group w-full sm:w-[200px] text-center px-4 py-2 rounded-md bg-[#168aad] text-white hover:bg-[#1e6091] transition font-bold"
          >
            Post <span className="group-hover:underline">Lost</span> Item
          </Link>
          <Link
            href={isLoggedIn ? "/postFoundItem" : "/guest"}
            onClick={(event) => handlePostItemClick(event)}
            className="group w-full sm:w-[200px] text-center px-4 py-2 rounded-md bg-[#168aad] text-white hover:bg-[#1e6091] transition font-bold"
          >
            Post <span className="group-hover:underline">Found</span> Item
          </Link>
        </nav>

        {/* User Section */}
        <section className="flex flex-col items-center sm:items-end space-y-2">
          <Link
            href={profileHref}
            className="flex items-center gap-3 text-gray-700 hover:opacity-80 transition-opacity"
          >
            {/* Avatar + Logout stacked vertically */}
            <div className="flex flex-col w-14 items-center space-y-2">
              <div className="w-14 h-14 bg-[#22577A] rounded-full flex items-center justify-center">
                <FaUserAlt className="text-white" size={20} />
              </div>

              {isLoggedIn && (
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    handleLogout();
                  }}
                  className="bg-[#38A3A5] hover:bg-red-400 text-white px-2 py-1 rounded text-xs transition text-center w-fit"
                >
                  Log Out
                </button>
              )}
            </div>

            {/* Name + Role */}
            <div className="flex flex-col text-left">
              <span className="font-semibold text-black">{displayName}</span>
              {userType ? (
                <span className="text-xs text-gray-600 capitalize">
                  {userType}
                </span>
              ) : (
                <span className="text-xs text-gray-600">Click to login</span>
              )}
            </div>
          </Link>
        </section>
      </div>
    </header>
  );
};

export default Header;
