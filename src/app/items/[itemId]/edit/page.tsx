"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DropdownFilters from "../../../components/dropdownFilters";
import { getItemById, updateItemById } from "../../../../utils/api";

interface ItemDetails {
  item_name: string;
  description: string;
  size: string;
  material: string;
  location: { id: string; name: string };
  category: { id: string; name: string };
  brand: { id: string; name: string };
  colour: { id: string; name: string };
}

export default function EditItemForm() {
  const { itemId } = useParams();

  const [itemDetailsInput, setItemDetailsInput] = useState<ItemDetails>({
    item_name: "",
    description: "",
    size: "",
    material: "",
    location: { id: "", name: "" },
    category: { id: "", name: "" },
    brand: { id: "", name: "" },
    colour: { id: "", name: "" },
  });

  useEffect(() => {
    async function loadData() {
      try {
        const itemData = await getItemById(String(itemId));
        setItemDetailsInput(itemData);
      } catch (err) {
        console.error(err);
      }
    }
    loadData();
  }, [itemId]);

  const handleFiltersChange = (filters: {
    location: { id: string; name: string };
    category: { id: string; name: string };
    brand: { id: string; name: string };
    colour: { id: string; name: string };
  }) => {
    setItemDetailsInput((prev) => ({ ...prev, ...filters }));
  };

  const handleUpdate = async () => {
    await updateItemById(String(itemId), itemDetailsInput);
    alert("Updated successfully");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-10 space-y-10">
      <h1 className="text-3xl font-bold text-[#1e6091]">Edit Item</h1>

      <DropdownFilters
        handleFiltersChange={handleFiltersChange}
        selectedFilters={{
          location: {
            id: itemDetailsInput.location.id,
            name: itemDetailsInput.location.name,
          },
          category: {
            id: itemDetailsInput.category.id,
            name: itemDetailsInput.category.name,
          },
          brand: {
            id: itemDetailsInput.brand.id,
            name: itemDetailsInput.brand.name,
          },
          colour: {
            id: itemDetailsInput.colour.id,
            name: itemDetailsInput.colour.name,
          },
        }}
      />

      {/* Text inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">
            Item Name:
          </label>
          <input
            type="text"
            placeholder="Item Name"
            className="border px-4 py-2 rounded shadow"
            value={itemDetailsInput.item_name}
            onChange={(e) =>
              setItemDetailsInput({
                ...itemDetailsInput,
                item_name: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">
            Description:
          </label>
          <input
            type="text"
            placeholder="Description"
            className="border px-4 py-2 rounded shadow"
            value={itemDetailsInput.description}
            onChange={(e) =>
              setItemDetailsInput({
                ...itemDetailsInput,
                description: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">
            Size:
          </label>
          <input
            type="text"
            placeholder="Size (e.g. XL, 10EU)"
            className="border px-4 py-2 rounded shadow"
            value={itemDetailsInput.size}
            onChange={(e) =>
              setItemDetailsInput({ ...itemDetailsInput, size: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">
            Material:
          </label>
          <input
            type="text"
            placeholder="Material (e.g. denim, plastic)"
            className="border px-4 py-2 rounded shadow"
            value={itemDetailsInput.material}
            onChange={(e) =>
              setItemDetailsInput({
                ...itemDetailsInput,
                material: e.target.value,
              })
            }
          />
        </div>
      </div>

      <button
        onClick={handleUpdate}
        className="px-8 py-4 bg-[#168aad] text-white font-bold rounded shadow hover:bg-[#1e6091] transition"
      >
        Update Item
      </button>
    </div>
  );
}
