"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ItemsList from '../components/itemsList';
import { Item } from '../types';

function Loading() {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      <p className="ml-4 text-lg text-gray-700">Loading items...</p>
    </div>
  );
}

export default function ItemsPage() {
  const searchParams = useSearchParams();

  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const urlSearchTerm = searchParams.get('search');
    const urlType = searchParams.get('type');
    const urlLocationId = searchParams.get('location');
    const urlCategoryId = searchParams.get('category');

    const hasMandatoryParamsForFetch =
        urlSearchTerm &&
        (urlType === 'lost' || urlType === 'found') &&
        urlLocationId &&
        urlCategoryId;

    if (!hasMandatoryParamsForFetch) {
        setItems([]);
        setIsLoading(false);
        setError(null);
        return;
    }

    async function fetchItems() {
      setIsLoading(true);
      setError(null);

      const apiQuery = searchParams.toString() ? `?${searchParams.toString()}` : '';

      try {
        const BASE_BACKEND_URL = "https://foundit-backend-dg0o.onrender.com";
        const ITEMS_API_PATH = "/api/items";

        const response = await fetch(`<span class="math-inline">\{BASE\_BACKEND\_URL\}</span>{ITEMS_API_PATH}${apiQuery}`);

        if (!response.ok) {
          const errorText = response.statusText || `Status: ${response.status} (No status text)`;
          throw new Error(`Failed to fetch items: ${errorText}`);
        }

        const data = await response.json();
        setItems(Array.isArray(data) ? data : data.items || []);
      } catch (err: any) {
        console.error("Error fetching items:", err);
        setError(err.message || "An unexpected error occurred while fetching items.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchItems();

  }, [searchParams]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Search Results
      </h1>

      {isLoading ? (
        <Loading />
      ) : error ? (
        <div className="container mx-auto px-4 py-8 text-center text-red-600 text-lg">
          Error: {error}
          <p className="text-sm text-gray-500 mt-2">
          </p>
        </div>
      ) : (
        searchParams.toString() === '' || !(searchParams.get('search') && (searchParams.get('type') === 'lost' || searchParams.get('type') === 'found') && searchParams.get('location') && searchParams.get('category')) ? (
          <div className="text-center py-8 text-gray-600 text-lg">
            <p>Please use the search form on the <a href="/" className="text-blue-600 hover:underline">main page</a> to find items.</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-8 text-gray-600 text-lg">
            <p>No items found matching your search criteria.</p>
            <p>Try a different search term or adjust your filters on the <a href="/" className="text-blue-600 hover:underline">main page</a>.</p>
          </div>
        ) : (
          <ItemsList items={items} />
        )
      )}
    </div>
  );
}