// route "/"
"use client";

import DropdownFilters from "./components/dropdownFilters";
import ResolvedItemsCarousel from "./components/ResolvedItemsCarousel";

export default function Page() {
  const handleFiltersChange = (filters: {
    location: { id: string; name: string };
    category: { id: string; name: string };
    brand: { id: string; name: string };
    colour: { id: string; name: string };
  }) => {
    console.log("Selected filters:", {
      location: {
        id: filters.location.id,
        name: filters.location.name,
      },
      category: {
        id: filters.category.id,
        name: filters.category.name,
      },
      brand: {
        id: filters.brand.id,
        name: filters.brand.name,
      },
      colour: {
        id: filters.colour.id,
        name: filters.colour.name,
      },
    });
  };

  return (
    <>
      <div className="min-h-[500px]">
        <h1 className="text-3xl font-bold underline text-center p-10">
          Hello, team 423! :)
        </h1>
        <ResolvedItemsCarousel />
        <DropdownFilters handleFiltersChange={handleFiltersChange} />
      </div>
    </>
  );
}
