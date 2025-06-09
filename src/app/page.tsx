// route "/"
"use client";

import DropdownFilters from "./components/dropdownFilters";
import ResolvedItemsCarousel from "./components/ResolvedItemsCarousel";

export default function Page() {
  const handleFiltersChange = (filters: {
    location: string;
    category: string;
    brand: string;
    colour: string;
  }) => {
    console.log(filters);
  };

  return (
    <>
      <div className="h-500">
        <h1 className="text-3xl font-bold underline text-center p-10">
          Hello, team 423! :)
        </h1>
        <ResolvedItemsCarousel />
        <DropdownFilters handleFiltersChange={handleFiltersChange} />
      </div>
    </>
  );
}
