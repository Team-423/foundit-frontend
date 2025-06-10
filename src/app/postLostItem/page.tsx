"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getCategories, getColours, getBrands } from "../../utils/api";

const ItemLocationMap = dynamic(() => import("../components/ItemLocationMap"), {
  ssr: false,
});

export default function PostLostItemPage() {
  const [itemName, setItemName] = useState("");
  const [details, setDetails] = useState("");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [address, setAddress] = useState<string | null>(null);

  const [category, setCategory] = useState("");
  const [colour, setColour] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [material, setMaterial] = useState("");

  const [categoryOptions, setCategoryOptions] = useState<
    { _id: string; category_name: string }[]
  >([]);
  const [colourOptions, setColourOptions] = useState<
    { _id: string; colour: string }[]
  >([]);
  const [brandOptions, setBrandOptions] = useState<
    { _id: string; brand_name: string }[]
  >([]);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const sizeOptions = ["One Size", "Small", "Medium", "Large", "Extra Large"];
  const materialOptions = [
    "Leather",
    "Fabric",
    "Metal",
    "Plastic",
    "Paper",
    "Other",
  ];

  useEffect(() => {
    const fetchOptions = async () => {
      setCategoryOptions(await getCategories());
      setColourOptions(await getColours());
      setBrandOptions(await getBrands());
    };
    fetchOptions();
  }, []);

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
      category,
      description: details,
      location: address,
      colour,
      size,
      brand,
      material,
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
      setCategory("");
      setColour("");
      setBrand("");
      setSize("");
      setMaterial("");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
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
          <label className="block font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Select a category</option>
            {categoryOptions.map((cat) => (
              <option key={cat._id} value={cat.category_name}>
                {cat.category_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Colour</label>
          <select
            value={colour}
            onChange={(e) => setColour(e.target.value)}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Select a colour</option>
            {colourOptions.map((col) => (
              <option key={col._id} value={col.colour}>
                {col.colour}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Brand</label>
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Select a brand</option>
            {brandOptions.map((br) => (
              <option key={br._id} value={br.brand_name}>
                {br.brand_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Size</label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Select a size</option>
            {sizeOptions.map((sz) => (
              <option key={sz} value={sz}>
                {sz}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium">Material</label>
          <select
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Select a material</option>
            {materialOptions.map((mat) => (
              <option key={mat} value={mat}>
                {mat}
              </option>
            ))}
          </select>
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
