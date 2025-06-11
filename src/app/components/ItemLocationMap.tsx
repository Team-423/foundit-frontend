"use client";

import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom Leaflet pin icon
const customIcon = new L.Icon({
  iconUrl: "/images/pindrop-icon/custom-pindrop-cursor-blue.png",
  iconSize: [40, 40],
  iconAnchor: [20, 38],
});

// Component props
type LocationMapProps = {
  onSelect: (coords: { lat: number; lng: number }) => void;
  onAddressSelect?: (address: string | null) => void;
};

// Marker that responds to map clicks and reverse geocodes the position
function LocationMarker({
  position,
  setPosition,
  onSelect,
  setSelectedAddress,
  onAddressSelect,
}: {
  position: { lat: number; lng: number } | null;
  setPosition: (coords: { lat: number; lng: number }) => void;
  onSelect: (coords: { lat: number; lng: number }) => void;
  setSelectedAddress: (address: string | null) => void;
  onAddressSelect?: (address: string | null) => void;
}) {
  useMapEvents({
    async click(event) {
      const { lat, lng } = event.latlng;
      const coords = { lat, lng };
      setPosition(coords);
      onSelect(coords);

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&addressdetails=1&zoom=18`,
          {
            headers: {
              "User-Agent": "foundit-app-dev",
              "Accept-Language": "en",
            },
          }
        );
        const data = await res.json();
        setSelectedAddress(data.display_name || null);
        if (onAddressSelect) onAddressSelect(data.display_name || null);
      } catch (err) {
        console.error("Error fetching reverse geocode:", err);
        setSelectedAddress(null);
        if (onAddressSelect) onAddressSelect(null);
      }
    },
    mouseover() {
      const container = document.querySelector(
        ".leaflet-container"
      ) as HTMLElement;
      if (container) container.classList.add("custom-cursor");
    },
    mouseout() {
      const container = document.querySelector(
        ".leaflet-container"
      ) as HTMLElement;
      if (container) container.classList.remove("custom-cursor");
    },
  });

  return position ? <Marker position={position} icon={customIcon} /> : null;
}

// Controls map view when a location is selected
function MapController({
  selectedLocation,
  setPosition,
  onSelect,
}: {
  selectedLocation: { lat: number; lng: number } | null;
  setPosition: (coords: { lat: number; lng: number }) => void;
  onSelect: (coords: { lat: number; lng: number }) => void;
}) {
  const map = useMap();

  useEffect(() => {
    if (selectedLocation) {
      map.setView([selectedLocation.lat, selectedLocation.lng], 15);
      setPosition(selectedLocation);
      onSelect(selectedLocation);
    }
  }, [selectedLocation, map, onSelect, setPosition]);

  return null;
}

// Main LocationMap component
export default function ItemLocationMap({
  onSelect,
  onAddressSelect,
}: LocationMapProps) {
  type NominatimResult = {
    display_name: string;
    lat: string;
    lon: string;
  };

  // State
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [query, setQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const shouldFetch = useRef(true);

  // Fetch autocomplete suggestions
  const fetchSuggestions = async (term: string) => {
    if (!term) return setSuggestions([]);
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          term
        )}&addressdetails=1&limit=5&countrycodes=gb`,
        {
          headers: {
            "User-Agent": "foundit-app-dev",
            "Accept-Language": "en",
          },
        }
      );
      const data = await res.json();
      setSuggestions(data);
      setHighlightedIndex(-1);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounce search input
  useEffect(() => {
    if (!shouldFetch.current) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (query) fetchSuggestions(query);
      else setSuggestions([]);
    }, 300);
  }, [query]);

  // Handle search submit
  const handleSearchSubmit = async () => {
    shouldFetch.current = false;

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query
      )}&addressdetails=1&limit=5&countrycodes=gb`,
      {
        headers: {
          "User-Agent": "foundit-app-dev",
          "Accept-Language": "en",
        },
      }
    );
    const data = await res.json();

    if (data.length > 0) {
      const selectedResult = data[0];
      const coords = {
        lat: parseFloat(selectedResult.lat),
        lng: parseFloat(selectedResult.lon),
      };
      setSelectedLocation(coords);
      setQuery(selectedResult.display_name);
      setSelectedAddress(selectedResult.display_name);
      if (onAddressSelect) onAddressSelect(selectedResult.display_name);
    }

    setSuggestions([]);
    setTimeout(() => {
      shouldFetch.current = true;
    }, 100);
  };

  // Handle key navigation
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
        handleSuggestionClick(suggestions[highlightedIndex]);
      } else {
        handleSearchSubmit();
      }
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else {
      setHighlightedIndex(-1);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: NominatimResult) => {
    shouldFetch.current = false;
    const coords = {
      lat: parseFloat(suggestion.lat),
      lng: parseFloat(suggestion.lon),
    };
    setSelectedLocation(coords);
    setQuery(suggestion.display_name);
    setSelectedAddress(suggestion.display_name);
    if (onAddressSelect) onAddressSelect(suggestion.display_name);
    setSuggestions([]);
    setTimeout(() => {
      shouldFetch.current = true;
    }, 100);
  };

  return (
    <>
      <div className="relative z-10 space-y-4">
        {/* Search Input and Button */}
        <div className="relative z-50">
          <div className="flex gap-2">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search by postcode or address"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={handleKeyDown}
                className={`w-full border p-2 rounded-md ${
                  query || isLoading ? "pr-14" : "pr-10"
                }`}
              />

              {/* Clear Button */}
              {query && !isLoading && (
                <button
                  onClick={() => {
                    setQuery("");
                    setSuggestions([]);
                  }}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black text-sm"
                  aria-label="Clear search"
                >
                  clear
                </button>
              )}

              {/* Loading Animation */}
              {isLoading && (
                <div className="absolute right-5 top-1/2 -translate-y-1/2 flex space-x-1">
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" />
                </div>
              )}
            </div>

            <button
              onClick={handleSearchSubmit}
              className="bg-[#168aad] text-white px-4 py-2 rounded-md hover:bg-[#1e6091]"
            >
              Search
            </button>
          </div>

          {/* Suggestion Dropdown */}
          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 w-full mt-1 bg-white border rounded-md shadow z-50 max-h-48 overflow-y-auto text-sm">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`px-3 py-2 cursor-pointer ${
                    index === highlightedIndex
                      ? "bg-green-200 font-medium"
                      : "hover:bg-green-200"
                  }`}
                >
                  {suggestion.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Map Container */}
        <div className="h-[400px] w-full rounded-md overflow-hidden border custom-cursor relative z-0">
          <MapContainer
            center={[53.4808, -2.2426]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
            />
            <MapController
              selectedLocation={selectedLocation}
              setPosition={setPosition}
              onSelect={onSelect}
            />
            <LocationMarker
              position={position}
              setPosition={setPosition}
              onSelect={onSelect}
              setSelectedAddress={setSelectedAddress}
              onAddressSelect={onAddressSelect}
            />
          </MapContainer>
        </div>

        {/* Location Confirmation Display */}
        {position && selectedAddress && (
          <p className="text-center text-gray-700 text-sm">
            <strong>Selected Location:</strong> {position.lat.toFixed(5)},{" "}
            {position.lng.toFixed(5)}
            <br />
            <span className="text-gray-600">{selectedAddress}</span>
          </p>
        )}
      </div>
    </>
  );
}
