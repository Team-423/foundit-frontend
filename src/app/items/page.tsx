"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ItemsList from "../components/itemsList";
import { getItemWithQueries } from "../../utils/api";
import Loading from "../loading";

export interface Item {
  _id: string;
  item_name: string;
  description: string;
  address: string;
  answers: string[];
  author: {
    _id: string;
    username: string;
  };
  brand: {
    _id: string;
    brand_name: string;
  };
  category: {
    _id: string;
    category_name: string;
  };
  colour: {
    _id: string;
    colour: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  created_at: string;
  found: boolean;
  img_url: string;
  location: {
    _id: string;
    location_name: string;
  };
  lost: boolean;
  material: string;
  questions: string[];
  resolved: boolean;
  size: string;
  __v: number;
}

export default function ItemsPage() {
  const searchParams = useSearchParams();
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchItems() {
      try {
        const result = await getItemWithQueries({
          item_name: searchParams.get("search") || "",
          category_id: searchParams.get("category") || "",
          location_id: searchParams.get("location") || "",
          colour_id: searchParams.get("colour") || "",
          brand_id: searchParams.get("brand") || "",
          type: (searchParams.get("type") as "lost" | "found") || "",
        });
        if (result.status === 429) {
          alert("Search limit reached (5 per hour). Please try again later.")
          return;
        }
        console.log("API Response:", result[0]);
        setItems(result);
      } catch (err) {
        console.error("Error fetching items:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchItems();
  }, [searchParams]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-8 ">
      <h1 className="text-3xl font-extrabold text-[#1e6091] text-center mb-8">
        Items List
      </h1>
      <ItemsList items={items} />
    </div>
  );
}
