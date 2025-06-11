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
  
  const [errors, setErrors] = useState<{
    categories?: string;
    locations?: string;
    brands?: string;
    colours?: string;
  }>({});

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleToggleDropdown = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

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

  const handleLocationChange = (location: { id: string; name: string }) => {
    setSelectedLocation(location);
    if (handleFiltersChange) {
      handleFiltersChange({
        location,
        category: selectedCategory,
        brand: selectedBrand,
        colour: selectedColour,
      });
    }
  };

  const handleCategoryChange = (category: { id: string; name: string }) => {
    setSelectedCategory(category);
    if (handleFiltersChange) {
      handleFiltersChange({
        location: selectedLocation,
        category,
        brand: selectedBrand,
        colour: selectedColour,
      });
    }
  };

  const handleBrandChange = (brand: { id: string; name: string }) => {
    setSelectedBrand(brand);
    if (handleFiltersChange) {
      handleFiltersChange({
        location: selectedLocation,
        category: selectedCategory,
        brand,
        colour: selectedColour,
      });
    }
  };

  const handleColourChange = (colour: { id: string; name: string }) => {
    setSelectedColour(colour);
    if (handleFiltersChange) {
      handleFiltersChange({
        location: selectedLocation,
        category: selectedCategory,
        brand: selectedBrand,
        colour,
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const categoryData = await getCategories();
      if (typeof categoryData === "string") {
        setErrors((prev) => ({ ...prev, categories: categoryData }));
      } else {
        setCategories(categoryData);
      }
      setIsLoadingCategories(false);

      const locationData = await getLocations();
      if (typeof locationData === "string") {
        setErrors((prev) => ({ ...prev, locations: locationData }));
      } else {
        setLocations(locationData);
      }
      setIsLoadingLocations(false);

      const brandData = await getBrands();
      if (typeof brandData === "string") {
        setErrors((prev) => ({ ...prev, brands: brandData }));
      } else {
        setBrands(brandData);
      }
      setIsLoadingBrands(false);

      const colourData = await getColours();
      if (typeof colourData === "string") {
        setErrors((prev) => ({ ...prev, colours: colourData }));
      } else {
        setColours(colourData);
      }
      setIsLoadingColours(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="m-10 space-y-6">
        <p>Please select your options: (* fields are required)</p>
        {isError && (
          <p className="text-red-500 text-sm">
            Failed to load some filters. Please refresh the page.
          </p>
      <div className="m-6 space-y-4">
        {(errors.categories ||
          errors.locations ||
          errors.brands ||
          errors.colours) && (
          <div className="space-y-2 bg-red-50 p-4 rounded-lg border border-red-200">
            {errors.categories && (
              <p className="text-red-600 text-sm font-medium">
                {errors.categories}
              </p>
            )}
            {errors.locations && (
              <p className="text-red-600 text-sm font-medium">
                {errors.locations}
              </p>
            )}
            {errors.brands && (
              <p className="text-red-600 text-sm font-medium">
                {errors.brands}
              </p>
            )}
            {errors.colours && (
              <p className="text-red-600 text-sm font-medium">
                {errors.colours}
              </p>
            )}
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-[#f0f8ff] rounded-xl shadow-md">
          <Dropdown
            options={
              isLoadingLocations
              ? [{ id: "", name: "Loading..." }]
              : errors.locations
              ? [{ id: "", name: "Error loading locations" }]
              : locations.map((loc) => ({
                id: loc._id,
                name: loc.location_name,
              }))
            }
          )
            label="Location*"
            onSelectAction={setSelectedLocation}
            selected={selectedLocation}
            onSelectAction={handleLocationChange}
            isOpen={openDropdown === "location"}
            onToggle={() => handleToggleDropdown("location")}
          />
          <Dropdown
            options={
              isLoadingCategories
                ? [{ id: "", name: "Loading..." }]
                : errors.categories
                ? [{ id: "", name: "Error loading categories" }]
                : categories.map((cat) => ({
                    id: cat._id,
                    name: cat.category_name,
                  }))
            }
            label="Category*"
            onSelectAction={setSelectedCategory}
            selected={selectedCategory}
            onSelectAction={handleCategoryChange}
            isOpen={openDropdown === "category"}
            onToggle={() => handleToggleDropdown("category")}
          />
          <Dropdown
            options={
              isLoadingBrands
                ? [{ id: "", name: "Loading..." }]
                : errors.brands
                ? [{ id: "", name: "Error loading brands" }]
                : [
                    { id: "", name: "All Brand" },
                    ...brands.map((brand) => ({
                      id: brand._id,
                      name: brand.brand_name,
                    })),
                  ]
            }
            label="Brand"
            onSelectAction={setSelectedBrand}
            selected={selectedBrand}
            onSelectAction={handleBrandChange}
            isOpen={openDropdown === "brand"}
            onToggle={() => handleToggleDropdown("brand")}
          />
          <Dropdown
            options={
              isLoadingColours
                ? [{ id: "", name: "Loading..." }]
                : errors.colours
                ? [{ id: "", name: "Error loading colours" }]
                : [
                    { id: "", name: "All Colour" },
                    ...colours.map((colour) => ({
                      id: colour._id,
                      name: colour.colour,
                    })),
                  ]
            }
            label="Colour"
            onSelectAction={setSelectedColour}
            selected={selectedColour}
            onSelectAction={handleColourChange}
            isOpen={openDropdown === "colour"}
            onToggle={() => handleToggleDropdown("colour")}
          />
        </div>
      </div>
    </>
  )
  }
