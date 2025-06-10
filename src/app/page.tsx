"use client";

import React, { useState } from "react";
import DropdownFilters from "./components/dropdownFilters";
import ResolvedItemsCarousel from "./components/ResolvedItemsCarousel";
import { CurrentFilters } from './types';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  const [searchInput, setSearchInput] = useState("");
  const [searchType, setSearchType] = useState<'lost' | 'found' | ''>('');
  const [currentFilters, setCurrentFilters] = useState<CurrentFilters>({
    location: { id: "", name: "" },
    category: { id: "", name: "" },
    brand: { id: "", name: "" },
    colour: { id: "", name: "" },
  });

  const handleFiltersChange = (filters: CurrentFilters) => {
    setCurrentFilters(filters);
    console.log("Filters updated:", filters);
  };

  const isSearchButtonEnabled =
    searchInput !== '' &&
    searchType !== '' &&
    currentFilters.location.id !== '' &&
    currentFilters.category.id !== '';

  const handleSearch = (event: React.FormEvent | React.KeyboardEvent) => {
    event.preventDefault();

    if (!isSearchButtonEnabled) {
      console.warn("Cannot perform search: Not all mandatory fields are filled.");
      return;
    }

    const params = new URLSearchParams();

    params.set('search', searchInput);

    params.set('type', searchType);

    params.set('location', currentFilters.location.id);
    params.set('category', currentFilters.category.id);

    if (currentFilters.colour.id) {
      params.set('colour', currentFilters.colour.id);
    }
    if (currentFilters.brand.id) {
      params.set('brand', currentFilters.brand.id);
    }

    router.push(`/items?${params.toString()}`);
  };

  return (
    <>
      <div className="min-h-screen bg-[#f0f8ff] flex flex-col items-center py-10 px-4">
        <h1 className="text-4xl font-extrabold text-[#1e6091] text-center mb-8">
          Hello, team 423! :)
        </h1>

        <div className="w-full max-w-4xl bg-[#ffffff] p-8 rounded-xl shadow-2xl space-y-6">
          <div className="w-full">
            <input
              type="text"
              placeholder="Search by item name..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSearch(e);
              }}
              className="w-full p-4 border border-[#168aad] rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-[#1e6091] text-lg"
            />
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setSearchType("lost")}
              className={`px-6 py-3 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-md ${
                searchType === "lost"
                  ? "bg-[#1e6091] text-[#f0f8ff] ring-2 ring-[#168aad]"
                  : "bg-[#184e77] text-[#f0f8ff] hover:bg-[#1e6091]"
              }`}
            >
              Lost Items
            </button>
            <button
              onClick={() => setSearchType("found")}
              className={`px-6 py-3 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-md ${
                searchType === "found"
                  ? "bg-[#57cc99] text-[#22577a] ring-2 ring-[#76c893]"
                  : "bg-[#80ed99] text-[#22577a] hover:bg-[#57cc99]"
              }`}
            >
              Found Items
            </button>
          </div>

          <DropdownFilters handleFiltersChange={handleFiltersChange} />

          <button
            onClick={handleSearch}
            disabled={!isSearchButtonEnabled}
            className={`w-full px-8 py-4 bg-[#168aad] text-[#f0f8ff] font-extrabold rounded-xl shadow-xl transition-all duration-300 transform text-xl ${
              !isSearchButtonEnabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#1e6091] focus:outline-none focus:ring-4 focus:ring-[#1e6091] focus:ring-opacity-75 hover:scale-105'
            }`}
          >
            Search
          </button>
          {!isSearchButtonEnabled && (
              <p className="text-red-500 text-sm mt-3 text-center">
                  Please enter a search term, select a type (Lost/Found), a Location, and a Category.
              </p>
          )}
        </div>

        <div className="mt-12 w-full max-w-4xl">
          <ResolvedItemsCarousel />
        </div>
      </div>
    </>
  );
}