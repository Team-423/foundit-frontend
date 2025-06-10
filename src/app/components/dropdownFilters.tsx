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
  _id: string;
  location_name: string;
}

interface Category {
  _id: string;
  category_name: string;
}

interface Brand {
  _id: string;
  brand_name: string;
}

interface Colour {
  _id: string;
  colour: string;
}

export default function DropdownFilters({
  handleFiltersChange, selectedFilters
}: {
  handleFiltersChange?: (filters: {
    location: { id: string; name: string };
    category: { id: string; name: string };
    brand: { id: string; name: string };
    colour: { id: string; name: string };
  }) => void;
  selectedFilters?: {
    location: { id: string; name: string };
    category: { id: string; name: string };
    brand: { id: string; name: string };
    colour: { id: string; name: string };
  };
}) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [colours, setColours] = useState<Colour[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingLocations, setIsLoadingLocations] = useState(true);
  const [isLoadingBrands, setIsLoadingBrands] = useState(true);
  const [isLoadingColours, setIsLoadingColours] = useState(true);
  const [isError, setIsError] = useState(false);
  
  useEffect(() => {
    getCategories()
    .then((categoryData) => {
      setCategories(categoryData);
    })
    .catch((error) => {
      console.error("Error fetching categories:", error);
      setIsError(true);
    })
    .finally(() => {
      setIsLoadingCategories(false);
    });
    
    getLocations()
    .then((locationData) => {
      setLocations(locationData);
    })
    .catch((error) => {
      console.error("Error fetching locations:", error);
      setIsError(true);
    })
    .finally(() => {
      setIsLoadingLocations(false);
    });
    
    getBrands()
    .then((brandData) => {
      setBrands(brandData);
    })
    .catch((error) => {
      console.error("Error fetching brands:", error);
      setIsError(true);
    })
    .finally(() => {
      setIsLoadingBrands(false);
    });
    
    getColours()
    .then((colourData) => {
      setColours(colourData);
    })
    .catch((error) => {
      console.error("Error fetching colours:", error);
      setIsError(true);
    })
    .finally(() => {
      setIsLoadingColours(false);
    });
  }, []);
  
  const [selectedLocation, setSelectedLocation] = useState<{
    id: string;
    name: string;
  }>({ id: "", name: "" });
  const [selectedCategory, setSelectedCategory] = useState<{
    id: string;
    name: string;
  }>({ id: "", name: "" });
  const [selectedBrand, setSelectedBrand] = useState<{
    id: string;
    name: string;
  }>({ id: "", name: "" });
  const [selectedColour, setSelectedColour] = useState<{
    id: string;
    name: string;
  }>({ id: "", name: "" });
  
  useEffect(() => {
    if (selectedFilters) {
      setSelectedLocation(selectedFilters.location);
      setSelectedCategory(selectedFilters.category);
      setSelectedBrand(selectedFilters.brand);
      setSelectedColour(selectedFilters.colour);
    }
  }, [selectedFilters])

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
        <p>Please select your options: (* fields are required)</p>
        {isError && (
          <p className="text-red-500 text-sm">
            Failed to load some filters. Please refresh the page.
          </p>
        )}
        <div className="flex justify-center gap-8 ">
          <Dropdown
            options={
              isLoadingLocations
                ? [{ id: "", name: "Loading..." }]
                : locations.map((loc) => ({
                    id: loc._id,
                    name: loc.location_name,
                  }))
            }
            label="Location*"
            onSelectAction={setSelectedLocation}
            selected={selectedLocation}
          />
          <Dropdown
            options={
              isLoadingCategories
                ? [{ id: "", name: "Loading..." }]
                : categories.map((cat) => ({
                    id: cat._id,
                    name: cat.category_name,
                  }))
            }
            label="Category*"
            onSelectAction={setSelectedCategory}
            selected={selectedCategory}
          />
          <Dropdown
            options={
              isLoadingBrands
                ? [{ id: "", name: "Loading..." }]
                : brands.map((brand) => ({
                    id: brand._id,
                    name: brand.brand_name,
                  }))
            }
            label="Brand"
            onSelectAction={setSelectedBrand}
            selected={selectedBrand}
          />
          <Dropdown
            options={
              isLoadingColours
                ? [{ id: "", name: "Loading..." }]
                : colours.map((colour) => ({
                    id: colour._id,
                    name: colour.colour,
                  }))
            }
            label="Colour"
            onSelectAction={setSelectedColour}
            selected={selectedColour}
          />

          <button
            className="bg-[#38A3A5] rounded alig-center w-35 font-bold"
            onClick={handleSubmit}
            disabled={!selectedLocation.id || !selectedCategory.id}
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
}
