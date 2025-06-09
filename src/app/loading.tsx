"use client";
import Lottie from "lottie-react";
import animationData from "./assets/foundit-loading.json";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-1 mt-10 mb-10">
        <h3 className="text-lg font-semibold text-black animate-pulse custom-pulse">
          Loading...
        </h3>
        <div className="w-32">
          <Lottie animationData={animationData} loop={true} />
        </div>
      </div>
    </>
  );
}
