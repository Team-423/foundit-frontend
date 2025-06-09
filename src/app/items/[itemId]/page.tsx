//path: /items/:itemId
"use client";
import Link from "next/link";

export default function ItemView() {
  return (
    //just for testing the claim page only. remove after the itemview page is done.
    <Link href="/items/6846dda246645f6918f309aa/claim">
      <button className="m-4 p-2 bg-gray-300 rounded alig-center">
        Claim.Testing button
      </button>
    </Link>
  );
}
