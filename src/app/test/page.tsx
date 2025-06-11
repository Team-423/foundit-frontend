"use client";

import dynamic from "next/dynamic";
import Loading from "../loading";

const MapFeature = dynamic(() => import("../components/MapFeature"), {
  ssr: false,
});

export default function TestPage() {
  return (
    <>
      <Loading />
      <MapFeature />
    </>
  );
}
