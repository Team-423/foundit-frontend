"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loading from "../loading";

interface Item {
  _id: string;
  item_name: string;
  location: string;
  found: boolean;
  img_url: string;
  address: string;
  resolved: boolean;
}

export default function ResolvedItemsCarousel() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  useEffect(() => {
    const fetchResolvedItems = async () => {
      try {
        const res = await fetch(
          `https://foundit-backend-dg0o.onrender.com/api/items/resolved`
        );

        const data = await res.json();
        const resolvedItemsList = data.resolvedItemsList;

        setItems(resolvedItemsList);
        setLoading(false);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to fetch items"
        );
        setLoading(false);
      }
    };
    fetchResolvedItems();
  }, []);

  // Handle scroll detection to pause animation
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsUserScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsUserScrolling(false);
      }, 1000);
    };

    const scrollContainer = document.querySelector(".scroll-container");
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
        clearTimeout(scrollTimeout);
      };
    }
  }, [items]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="p-2">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Success Stories:
        </h2>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-500">Error: {error}</div>
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="p-2">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Success Stories:
        </h2>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-500">
            Success stories pending...
          </div>
        </div>
      </div>
    );
  }

  // Items duplicated for seamless infinite scroll
  const duplicatedItems = [...items, ...items];

  return (
    <>
      {/* Carousel Container */}
      <div className="p-2">
        {/* Section Title */}
        <h2 className="text-2xl font-bold mb-6 text-center">
          Success Stories:
        </h2>

        {/* Infinite Scrolling Container */}
        <div className="relative overflow-x-auto overflow-y-hidden scroll-container">
          <div
            className={`flex space-x-6 pb-4 scroll-content ${
              isUserScrolling ? "" : "animate-scroll-left"
            }`}
          >
            {/* Item Cards */}
            {duplicatedItems.map((item, index) => (
              <div
                key={`${item._id}-${index}`}
                className="min-w-[200px] max-w-[250px] min-h-[15rem] flex-shrink-0 bg-[#9FD8CE] rounded-4xl shadow-md p-4 text-center mb-5"
              >
                {/* Item Title */}
                <h3 className="mt-4 mb-4 font-semibold text-lg">
                  {item.item_name || "Unknown Item"}
                </h3>

                {/* Item Image */}
                <div className="relative w-full h-32 mb-4">
                  <Image
                    className="object-cover rounded-lg"
                    src={item.img_url || "/images/logo/found-it-logo.png"}
                    alt={item.item_name || "Item image"}
                    fill
                    sizes="(max-width: 250px) 100vw, 250px"
                    onError={(e) => {
                      console.log(e);
                      console.log("Image failed to load:", item.img_url);
                    }}
                    priority={index < 3}
                  />
                </div>

                <div className="flex flex-col items-center">
                  <Image
                    src="/images/pindrop-icon/custom-pindrop-cursor-red.png"
                    alt="red-pindrop"
                    width={25}
                    height={25}
                    className="flex-shrink-0 mb-1"
                  />
                  <p className="text-sm text-gray-700 leading-relaxed text-center">
                    {item.address || item.location || "Location not specified"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
