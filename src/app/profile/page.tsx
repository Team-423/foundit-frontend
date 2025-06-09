//route "/profile"
"use client";
import Image from "next/image";
import Link from "next/link";

export default function UserProfile() {
  const user = {
    username: "johndoe",
    profileImg:
      "https://i0.wp.com/shanemcdonald.ie/wp-content/uploads/2017/02/Twitter-Egg.png?resize=500%2C500&ssl=1",
    points: 120,
    items: [
      {
        id: 1,
        item_name: "Black Wallet",
        location: "Manchester",
        lost: true,
        img: "/images/logo/found-it-logo.png",
      },
      {
        id: 2,
        item_name: "Blue Umbrella",
        location: "Leeds",
        found: true,
        img: "/images/logo/found-it-logo.png",
      },
    ],
  };

  return (
    <>
      {/* {User Page Container} */}
      <div className="min-h-screen flex flex-col bg-[#ffffff]">
        {/* {User Profile Header} */}
        <header className="bg-blue-200 p-6 flex justify-center items-center shadow-md">
          <div className="text-xl font-semibold ">👤 {user.username}</div>
        </header>

        {/* Profile and Items Section */}
        <main className="flex flex-col md:flex-row gap-6 p-10 ">
          {/* Profile Card */}
          <div className="bg-white rounded shadow-md p-6 w-full md:w-1/3 space-y-8 text-center">
            <Image
              src={user.profileImg}
              alt="Profile"
              width={120}
              height={120}
              className="mx-auto rounded-full object-cover mt-2"
            />
            <div className="text-lg font-medium">Points: {user.points}</div>
            <Link href="/chats">
              <button className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded">
                My Chats
              </button>
            </Link>
          </div>

          {/* Posted Items */}
          <section className="bg-white rounded shadow-md p-6 w-full md:w-2/3 space-y-4">
            <h2 className="text-xl font-bold mb-4">Posted Items:</h2>
            {user.items.map((item) => (
              <div
                className="flex gap-4 items-center border p-4 rounded-xl"
                key={item.id}
              >
                <Image
                  className="rounded object-cover"
                  src={item.img}
                  alt={item.item_name}
                  width={80}
                  height={80}
                />
                <div className="flex-1 space-y-1">
                  <h3 className="font-bold">{item.item_name}</h3>
                  <p className="text-sm">📍 {item.location}</p>
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
            ))}
          </section>
        </main>
      </div>
    </>
  );
}
