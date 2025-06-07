"use client";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full flex justify-between items-center p-4 bg-gray-500 shadow-md">
      <Link href="/">
        <h1>FoundIt</h1>
      </Link>
      <nav className="flex gap-4">
        <Link
          href="/postLostItem"
          className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition font-bold"
        >
          Post Lost Item
        </Link>
        <Link
          href="/postFoundItem"
          className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition"
        >
          Post Found Item
        </Link>
      </nav>
      <div>
        <span>User</span>
      </div>
    </header>
  );
};

export default Header;
