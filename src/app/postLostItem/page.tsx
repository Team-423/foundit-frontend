"use client";

import { useState } from "react";
import ItemLocationMap from "../components/ItemLocationMap";

export default function PostLostItemPage() {
  const [itemName, setItemName] = useState("");
  const [details, setDetails] = useState("");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [address, setAddress] = useState<string | null>(null);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!coords || !address) {
      setError("Please select a location on the map.");
      return;
    }

    const postedItem = {
      item_name: itemName,
      author: "johndoe",
      category: "Accessories",
      description: "Leather wallet containing ID and credit cards",
      location: address,
      colour: "someColourId",
      size: "Medium",
      brand: "someBrandId",
      material: "Nylon",
      img_url:
        "https://cdn.pixabay.com/photo/2020/03/28/13/26/wallet-4977021_1280.jpg",
      resolved: false,
      found: false,
      lost: true,
    };

    try {
      const res = await fetch(
        "https://foundit-backend-dg0o.onrender.com/api/items",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postedItem),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.msg || "Failed to post item");
      }

      setSuccess(true);
      setItemName("");
      setDetails("");
      setCoords(null);
      setAddress(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <main className="max-w-2xl mx-auto mt-10 p-4 border rounded-xl shadow space-y-6">
      <h1 className="text-2xl font-bold text-center">Post a Lost Item</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Item Name</label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Details</label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Select Location</label>
          <ItemLocationMap onSelect={setCoords} onAddressSelect={setAddress} />
        </div>

        <button
          type="submit"
          className="w-full bg-[#5a189a] text-white py-2 px-4 rounded hover:bg-[#3c096c]"
        >
          Post Lost Item
        </button>
      </form>

      {success && (
        <p className="text-green-600 text-center">Item posted successfully!</p>
      )}
      {error && <p className="text-red-600 text-center">{error}</p>}
    </main>
  );
}
