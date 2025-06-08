// route "/"
"use client";

import DropdownFilters from "./components/dropdownFilters";

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
      <h1 className="text-3xl font-bold underline">Hello, team 423!</h1>
      <DropdownFilters handleFiltersChange={handleFiltersChange} />
    </>
  );
}
