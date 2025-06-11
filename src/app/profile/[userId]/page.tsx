// route "/profile"
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";
import Loading from "../../loading";
import { FaUserAlt } from "react-icons/fa";

interface Item {
  _id: string;
  item_name: string;
  location: string;
  found: boolean;
  img_url: string;
  address: string;
  description: string;
}

interface User {
  _id: number;
  username: string;
  email: string;
  img_url: string;
  points: number;
}

export default function UserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(
        `https://foundit-backend-dg0o.onrender.com/api/users/${userId}`
      );
      const data = await res.json();
      const user = data.user;
      setUser(user);
      setLoading(false);
    };
    const fetchItems = async () => {
      const res = await fetch(
        `https://foundit-backend-dg0o.onrender.com/api/users/${userId}/items`
      );
      const data = await res.json();
      const items = data.items;
      setItems(items);
    };

    if (userId) fetchUser();
    if (userId) fetchItems();
  }, [userId]);

  if (loading) return <Loading />;
  if (!user) return <p className="text-center text-red-500">User not found</p>;

  return (
    <>
      {/* {User Page Container} */}
      <div className="min-h-screen flex flex-col bg-[#ffffff]">
        {/* {User Profile Header} */}
        <header className="bg-blue-200 p-6 flex justify-center items-center shadow-md">
          <div className="w-10 h-10 bg-[#22577A] rounded-full flex items-center justify-center mr-2">
            <FaUserAlt className="text-white" size={20} />
          </div>
          <div className="text-xl font-semibold ">{user.username}</div>
        </header>

        {/* Profile and Items Section */}
        <main className="flex flex-col md:flex-row gap-6 p-10 ">
          {/* Profile Card */}
          <div className="bg-white rounded shadow-md p-6 w-full md:w-1/3 space-y-8 text-center">
            <Image
              src={user.img_url}
              alt="Profile"
              width={120}
              height={120}
              className="mx-auto rounded-full object-cover mt-2"
            />
            <div className="text-lg font-medium">Points: {user.points}</div>
            <Link href={`/profile/${user._id}/chat`}>
              <button className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded">
                My Chats
              </button>
            </Link>
          </div>

          {/* Posted Items */}
          <section className="bg-white rounded  p-6 w-full md:w-2/3 space-y-4">
            <h2 className="text-xl font-bold mb-4">Posted Items:</h2>
            {items.length > 0 ? (
              items.map((item) => (
                <Link
                  href={`/items/${item._id}`}
                  key={item._id}
                  className="block"
                >
                  <div className="flex gap-4 items-center shadow-xl p-6 rounded-xl hover:shadow-md hover:border-gray-300 transition-all cursor-pointer">
                    <Image
                      className="rounded object-cover"
                      src={item.img_url}
                      alt={item.item_name}
                      width={120}
                      height={120}
                    />
                    <div className="flex-1 space-y-1">
                      <h3 className="font-bold">{item.item_name}</h3>
                      <p>{item.description}</p>

                      <p className="text-sm">
                        <div className="flex flex-row items-center">
                          <span>
                            <Image
                              src="/images/pindrop-icon/custom-pindrop-cursor-red.png"
                              alt="red-pindrop"
                              width={25}
                              height={25}
                              className="flex-shrink-0 mb-1"
                            />
                          </span>{" "}
                          {item.address}
                        </div>
                      </p>
                      <span
                        className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                          item.found
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.found ? "Found" : "Lost"}
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-500 italic">No items posted yet.</p>
            )}
          </section>
        </main>
      </div>
    </>
  );
}
