"use client";

import Loading from "../loading";
import { useState } from "react";
import ItemLocationMap from "../components/ItemLocationMap";

export default function MapFeature() {
  // State: Coordinates selected on the map
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null
  );

  // State: Address associated with the selected location
  const [address, setAddress] = useState<string | null>(null);

  // State: Form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  // Submit handler to POST location data to backend
  const handleSubmit = async () => {
    if (!coords || !address) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location: {
            coordinates: coords,
            address: address,
          },
          found: true,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit location");

      const data = await res.json();

      setSubmitStatus("success");
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        {/* Page Heading */}
        <h1 className="text-2xl font-bold text-center text-black-700">
          📍 Drop a Pin Where You Found the Item 📍
        </h1>

        {/* Map Interaction Section */}
        <ItemLocationMap
          onSelect={(coords) => setCoords(coords)}
          onAddressSelect={(address) => setAddress(address)}
        />

        {/* Confirm Button - Only shows if a location is selected */}
        {coords && address && (
          <div className="text-center">
            <button
              onClick={handleSubmit}
              className="mt-4 bg-[#5a189a] text-white px-4 py-2 rounded-md hover:bg-[#3c096c] disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Confirm Location"}
            </button>
          </div>
        )}

        {/* Loading Animation While Submitting */}
        {isSubmitting && <Loading />}

        {/* Submit Result Feedback */}
        {submitStatus === "success" && (
          <p className="text-center text-green-600 font-medium mt-4">
            Location submitted successfully!
          </p>
        )}
        {submitStatus === "error" && (
          <p className="text-center text-red-600 font-medium mt-4">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </>
  );
}
