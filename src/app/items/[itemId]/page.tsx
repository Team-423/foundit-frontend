//path: /items/:itemId
"use client";
import Link from "next/link";

export default function ItemView() {
  return (
    //below link button is just for purpose of testing the claim page only.
    //should remove after the itemview page is done.
    <Link href="/items/684712729cc6386206a4d06c/claim">
      <button className="m-4 p-2 bg-gray-300 rounded alig-center">
        Claim.Testing button
      </button>
    </Link>
  );
}
