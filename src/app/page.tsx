// route "/"
"use client";

import React, { useState } from "react";
import DropdownFilters from "./components/dropdownFilters";
import ResolvedItemsCarousel from "./components/ResolvedItemsCarousel";

export default function Page() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchType, setSearchType] = useState<"lost" | "found" | null>(null);
  const [currentFilters, setCurrentFilters] = useState({
    // State to hold filters from DropdownFilters
    location: { id: "", name: "" },
    category: { id: "", name: "" },
    brand: { id: "", name: "" },
    colour: { id: "", name: "" },
  });

  // Log complete search state
  // useEffect(() => {
  //   console.log("Queries:", {
  //     searchInput,
  //     searchType,
  //     filters: currentFilters,
  //   });
  // }, [searchInput, searchType, currentFilters]);

  // Callback function to receive filter changes from DropdownFilters
  const handleFiltersChange = (filters: {
    location: { id: string; name: string };
    category: { id: string; name: string };
    brand: { id: string; name: string };
    colour: { id: string; name: string };
  }) => {
    setCurrentFilters(filters);
  };

  const handleSearch = (event: React.FormEvent | React.KeyboardEvent) => {
    event.preventDefault();
    let queryString = "";

    // Add search input to query string
    if (searchInput) {
      queryString = queryString + `search=${encodeURIComponent(searchInput)}`;
    }

    // Add filters from DropdownFilters to query string
    if (currentFilters.location) {
      if (queryString) queryString = queryString + "&";
      queryString =
        queryString +
        `location=${encodeURIComponent(currentFilters.location.id)}`;
    }
    if (currentFilters.category) {
      if (queryString) queryString = queryString + "&";
      queryString =
        queryString +
        `category=${encodeURIComponent(currentFilters.category.id)}`;
    }
    if (currentFilters.colour) {
      if (queryString) queryString = queryString + "&";
      queryString =
        queryString + `colour=${encodeURIComponent(currentFilters.colour.id)}`;
    }
    if (currentFilters.brand) {
      if (queryString) queryString = queryString + "&";
      queryString =
        queryString + `brand=${encodeURIComponent(currentFilters.brand.id)}`;
    }

    // Add search type (all, lost, found) to query string if not 'all'
    if (searchType !== null) {
      if (queryString) queryString = queryString + "&";
      queryString = queryString + `type=${encodeURIComponent(searchType)}`;
    }

    // Navigate to the items page with the constructed query string
    if (queryString) {
      window.location.assign(`/items?${queryString}`);
    } else {
      // If no search terms or filters, navigate to /items to show all by default
      window.location.assign(`/items`);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#f0f8ff] flex flex-col items-center py-10 px-4">
        {/* <h1 className="text-4xl font-extrabold text-[#1e6091] text-center mb-8">
          Hello, team 423! :)
        </h1> */}

        {/* Main Search Section */}
        <div className="w-full max-w-4xl bg-[#ffffff] p-8 rounded-xl shadow-2xl space-y-6">
          <div className="w-full">
            <input
              type="text"
              placeholder="Search by item name..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full p-4 border border-[#168aad] rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-[#1e6091] text-lg"
            />
          </div>

          {/* Item Type Buttons */}
          <div className="flex justify-center space-x-10">
            <button
              onClick={() => setSearchType("lost")}
              className={`px-4 py-2 rounded-lg font-medium text-[#f0f8ff] text-base transition-all duration-300 transform hover:scale-110 shadow-md hover:bg-[#1e6091] ${
                searchType === "lost"
                  ? "bg-[#284d68] scale-110 shadow-lg"
                  : "bg-[#168aad] hover:scale-110 "
              }`}
            >
              Lost Items
            </button>
            <button
              onClick={() => setSearchType("found")}
              className={`px-4 py-2 rounded-lg font-medium text-[#f0f8ff] text-base transition-all duration-300 transform hover:scale-110 shadow-md hover:bg-[#1e6091] ${
                searchType === "found"
                  ? "bg-[#284d68] scale-110 shadow-lg"
                  : "bg-[#168aad] hover:scale-110 "
              }`}
            >
              Found Items
            </button>
          </div>

          {/* Dropdown Filters Component */}
          <DropdownFilters handleFiltersChange={handleFiltersChange} />

          {/* Search Button */}
          <button
            onClick={handleSearch}
            disabled={
              !currentFilters.location.id || !currentFilters.category.id
            }
            className={`w-full px-8 py-4 font-extrabold rounded-xl shadow-xl transition-all duration-300 transform hover:scale-105 text-xl bg-[#168aad]  text-[#f0f8ff] hover:bg-[#1e6091] focus:outline-none focus:ring-4 focus:ring-[#1e6091] focus:ring-opacity-75 ${
              !currentFilters.location.id || !currentFilters.category.id
                ? "cursor-not-allowed"
                : ""
            }`}
          >
            Search
          </button>
        </div>

        <div className="mt-12 w-full max-w-4xl">
          <ResolvedItemsCarousel />
        </div>
      </div>
    </>
  );
}
