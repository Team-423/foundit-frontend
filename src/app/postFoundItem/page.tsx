"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  getCategories,
  getColours,
  getBrands,
  getLocations,
} from "../../utils/api";

const ItemLocationMap = dynamic(() => import("../components/ItemLocationMap"), {
  ssr: false,
});

export default function PostFoundItemForm() {
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
  const [location, setLocation] = useState("");

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [colourOptions, setColourOptions] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [questions, setQuestions] = useState<string[]>([""]);

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
      const categories = await getCategories();
      if (typeof categories !== "string") setCategoryOptions(categories);

      const colours = await getColours();
      if (typeof colours !== "string") setColourOptions(colours);

      const brands = await getBrands();
      if (typeof brands !== "string") setBrandOptions(brands);

      const locations = await getLocations();
      if (typeof locations !== "string") setLocationOptions(locations);
    };
    fetchOptions();
  }, []);

  const handleQuestionChange = (index: number, value: string) => {
    const updated = [...questions];
    updated[index] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, ""]);
  };

  const removeQuestion = (index: number) => {
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
  };

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
      author: "maria.watson",
      category,
      description: details,
      location,
      address,
      coordinates: coords,
      colour,
      size,
      brand,
      material,
      img_url:
        "https://cdn.pixabay.com/photo/2020/03/28/13/26/wallet-4977021_1280.jpg",
      resolved: false,
      found: true,
      lost: false,
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

      const newItem = await res.json();
      const itemId = newItem._id;

      for (const q of questions.filter((q) => q.trim())) {
        await fetch(
          `https://foundit-backend-dg0o.onrender.com/api/items/${itemId}/QandA`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: q }),
          }
        );
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
      setLocation("");
      setQuestions([""]);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <main className="max-w-2xl mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-2xl shadow-lg space-y-6">
      <h1 className="text-3xl font-bold text-center text-[#5a189a]">
        Post a Found Item
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-m font-medium text-gray-700 mb-1">
            Item Name*
          </label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-m font-medium text-gray-700 mb-1">
            Details*
          </label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-m font-medium text-gray-700 mb-1">
            Verification Questions*
          </label>
          {questions.map((q, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                type="text"
                value={q}
                onChange={(e) => handleQuestionChange(i, e.target.value)}
                required
                className="flex-1 border p-2 rounded"
              />
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeQuestion(i)}
                  className="text-red-600"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addQuestion}
            className="text-blue-600 mt-2"
          >
            + Add Question
          </button>
        </div>

        <div>
          <label className="block text-m font-medium text-gray-700 mb-1">
            Category*
          </label>
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
          <label className="block text-m font-medium text-gray-700 mb-1">
            Colour*
          </label>
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
          <label className="block text-m font-medium text-gray-700 mb-1">
            Brand*
          </label>
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
          <label className="block text-m font-medium text-gray-700 mb-1">
            Size*
          </label>
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
          <label className="block text-m font-medium text-gray-700 mb-1">
            Material*
          </label>
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
          <label className="block text-m font-medium text-gray-700 mb-1">
            Location*
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Select a location</option>
            {locationOptions.map((loc) => (
              <option key={loc._id} value={loc.location_name}>
                {loc.location_name}
              </option>
            ))}
          </select>
        </div>

        <div className="p-3 border border-dashed border-gray-400 rounded-lg">
          <label className="block text-sm font-medium mb-2 text-gray-700"></label>
          <ItemLocationMap onSelect={setCoords} onAddressSelect={setAddress} />
        </div>

        <button
          type="submit"
          className="w-full bg-[#5a189a] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#3c096c] transition shadow-md"
        >
          Post Found Item
        </button>
      </form>
      {success && (
        <p className="text-green-600 text-center font-medium">
          Item posted successfully!
        </p>
      )}
      {error && <p className="text-red-600 text-center font-medium">{error}</p>}
    </main>
  );
}
