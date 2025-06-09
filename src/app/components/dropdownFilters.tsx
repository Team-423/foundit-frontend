//four dropdowns filter
"use client";

import Dropdown from "./dropdown";
import { useState, useEffect } from "react";
import {
  getCategories,
  getLocations,
  getBrands,
  getColours,
} from "../../utils/api";

interface Location {
  location_name: string;
}
interface Category {
  category_name: string;
}
interface Brand {
  brand_name: string;
}
interface Colour {
  colour: string;
}

export default function DropdownFilters({
  handleFiltersChange,
}: {
  handleFiltersChange?: (filters: {
    location: string;
    category: string;
    brand: string;
    colour: string;
  }) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [colours, setColours] = useState<string[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingLocations, setIsLoadingLocations] = useState(true);
  const [isLoadingBrands, setIsLoadingBrands] = useState(true);
  const [isLoadingColours, setIsLoadingColours] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getCategories()
      .then((categoryNames) => {
        setCategories(categoryNames);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setIsError(true);
      })
      .finally(() => {
        setIsLoadingCategories(false);
      });

    getLocations()
      .then((locationNames) => {
        setLocations(locationNames);
      })
      .catch((error) => {
        console.error("Error fetching locations:", error);
        setIsError(true);
      })
      .finally(() => {
        setIsLoadingLocations(false);
      });

    getBrands()
      .then((brandNames) => {
        setBrands(brandNames);
      })
      .catch((error) => {
        console.error("Error fetching brands:", error);
        setIsError(true);
      })
      .finally(() => {
        setIsLoadingBrands(false);
      });

    getColours()
      .then((colourNames) => {
        setColours(colourNames);
      })
      .catch((error) => {
        console.error("Error fetching colours:", error);
        setIsError(true);
      })
      .finally(() => {
        setIsLoadingColours(false);
      });
  }, []);

  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedColour, setSelectedColour] = useState("");

  const handleSubmit = () => {
    if (handleFiltersChange) {
      handleFiltersChange({
        location: selectedLocation,
        category: selectedCategory,
        brand: selectedBrand,
        colour: selectedColour,
      });
    }
  };

  return (
    <>
      <div className="m-10 space-y-6">
        <p>Please select your options:</p>
        {isError && (
          <p className="text-red-500 text-sm">
            Failed to load some filters. Please refresh the page.
          </p>
        )}
        <div className="flex justify-center gap-8 ">
          <Dropdown
            options={isLoadingLocations ? ["Loading..."] : locations}
            label="Location"
            onSelectAction={setSelectedLocation}
          />
          <Dropdown
            options={isLoadingCategories ? ["Loading..."] : categories}
            label="Category"
            onSelectAction={setSelectedCategory}
          />
          <Dropdown
            options={isLoadingBrands ? ["Loading..."] : brands}
            label="Brand"
            onSelectAction={setSelectedBrand}
          />
          <Dropdown
            options={isLoadingColours ? ["Loading..."] : colours}
            label="Colour"
            onSelectAction={setSelectedColour}
          />

          <button
            className="bg-[#38A3A5] rounded alig-center w-35 font-bold"
            onClick={handleSubmit}
            disabled={!selectedLocation || !selectedCategory}
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
}
