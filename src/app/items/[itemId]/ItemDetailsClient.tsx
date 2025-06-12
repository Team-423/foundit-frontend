"use client";
import { useUser } from "../../../contexts/UserContext";
import Link from "next/link";
import Image from "next/image";
import type { Item } from "../../../types/item";

export default function ItemDetailsClient({ item }: { item: Item }) {
  const { user, isHydrated, isGuest } = useUser();

  const isAuthor = user?.id === item.author._id;

  if (!isHydrated) return null;

  const showActionButton = user && !isGuest && !isAuthor;

  return (
    <div className="min-h-screen flex items-start justify-center p-8">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-8 relative">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-[#1e6091] text-center flex-grow">
            {item.item_name}
          </h1>
          {isAuthor && (
            <Link href={`/items/${item._id}/edit`}>
              <button className="bg-gray-400 px-4 py-2 rounded-lg text-white font-medium text-sm shadow-md hover:bg-gray-500 transition-colors">
                Edit
              </button>
            </Link>
          )}
        </header>

        <article className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {item.img_url && (
            <section>
              <figure className="w-full h-full flex items-center justify-center">
                <Image
                  src={item.img_url}
                  alt={`Image of ${item.item_name}`}
                  className="w-full rounded-lg shadow-md"
                  width={400}
                  height={400}
                  priority
                />
              </figure>
            </section>
          )}

          <section className="space-y-4">
            <section>
              <div className="w-full p-4 border border-gray-200 rounded-lg shadow-sm bg-white space-y-2">
                <p>
                  <strong>Location:</strong> {item.location.location_name}
                </p>
                <p>
                  <strong>Status:</strong> {item.lost ? "Lost" : "Found"}
                </p>
                <p>
                  <strong>Description:</strong> {item.description}
                </p>
                <p>
                  <strong>Author:</strong> {item.author.username}
                </p>
                {item.created_at && (
                  <p>
                    <strong>Posted Date:</strong>{" "}
                    {new Date(item.created_at).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                )}
                {item.material && (
                  <p>
                    <strong>Material:</strong> {item.material}
                  </p>
                )}
                {item.brand && (
                  <p>
                    <strong>Brand:</strong> {item.brand.brand_name}
                  </p>
                )}
                {item.colour && (
                  <p>
                    <strong>Colour:</strong> {item.colour.colour}
                  </p>
                )}
                {item.size && (
                  <p>
                    <strong>Size:</strong> {item.size}
                  </p>
                )}
              </div>
            </section>
          </section>
        </article>
        {showActionButton && (
          <div className="mt-8 flex justify-center">
            {!isAuthor && (
              <div className="mt-8 flex justify-center">
                {item.lost ? (
                  <Link href={`/items/${item._id}/chat`}>
                    <button className="bg-[#38A3A5] px-6 py-3 rounded-lg text-white font-medium text-lg shadow-md hover:bg-[#2d8a8c] transition-colors">
                      I found this item, click to chat with{" "}
                      {item.author.username}
                    </button>
                  </Link>
                ) : (
                  <Link href={`/items/${item._id}/claim`}>
                    <button className="bg-[#38A3A5] px-6 py-3 rounded-lg text-white font-medium text-lg shadow-md hover:bg-[#2d8a8c] transition-colors">
                      Claim
                    </button>
                  </Link>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
