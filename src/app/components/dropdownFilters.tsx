//four dropdowns filter
"use client";

import Dropdown from "./dropdown";
import { useState } from "react";

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
  //fetching from four endpoints: location, category, brand, colour

  //hardcoded, replace by axios once BE endpoint rendering is ready
  //GET /api/items/locations
  const locations: Location[] = [
    { location_name: "Other" },
    { location_name: "London" },
    { location_name: "Birmingham" },
    { location_name: "Manchester" },
    { location_name: "Glasgow" },
    { location_name: "Liverpool" },
    { location_name: "Leeds" },
    { location_name: "Sheffield" },
    { location_name: "Bristol" },
    { location_name: "Newcastle upon Tyne" },
    { location_name: "Nottingham" },
    { location_name: "Leicester" },
    { location_name: "Coventry" },
    { location_name: "Kingston upon Hull" },
    { location_name: "Bradford" },
  ];
  //GET /api/items/categories
  const categories: Category[] = [
    { category_name: "Accessories" },
    { category_name: "Bags" },
    { category_name: "Clothing" },
    { category_name: "Footwear" },
    { category_name: "Electronics" },
    { category_name: "Jewelry" },
    { category_name: "Keys" },
    { category_name: "Outdoor Gear" },
    { category_name: "Books" },
    { category_name: "Documents & IDs" },
    { category_name: "Eyewear" },
    { category_name: "Home Goods & Decor" },
    { category_name: "Outdoor Gear" },
    { category_name: "Toys & Games" },
    { category_name: "Other" },
  ];
  //GET /api/items/brands
  const brands: Brand[] = [
    { brand_name: "Other/Unknown" },
    { brand_name: "Apple" },
    { brand_name: "Samsung" },
    { brand_name: "Sony" },
    { brand_name: "Dell" },
    { brand_name: "HP" },
    { brand_name: "Lenovo" },
    { brand_name: "Microsoft" },
    { brand_name: "Asus" },
  ];
  //GET /api/items/colours
  const colour: Colour[] = [
    { colour: "Black" },
    { colour: "White" },
    { colour: "Grey" },
    { colour: "Silver" },
    { colour: "Gold" },
    { colour: "Red" },
    { colour: "Blue" },
    { colour: "Green" },
    { colour: "Yellow" },
    { colour: "Orange" },
    { colour: "Purple" },
  ];

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
        <div className="flex justify-center gap-8 ">
          <Dropdown
            options={locations.map((location) => location.location_name)}
            label="Location"
            onSelectAction={setSelectedLocation}
          />
          <Dropdown
            options={categories.map((category) => category.category_name)}
            label="Category"
            onSelectAction={setSelectedCategory}
          />
          <Dropdown
            options={brands.map((brand) => brand.brand_name)}
            label="Brand"
            onSelectAction={setSelectedBrand}
          />
          <Dropdown
            options={colour.map((colour) => colour.colour)}
            label="Colour"
            onSelectAction={setSelectedColour}
          />
        </div>
        <div className="flex justify-center">
          <button
            className="m-4 p-2 bg-gray-300 rounded alig-center"
            onClick={handleSubmit}
            disabled={!selectedLocation || !selectedCategory}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
