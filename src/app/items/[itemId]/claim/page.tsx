//route "/items/:itemId/claim
"use client";

import { useParams } from "next/navigation";
import { getItemImgById } from "../../../../utils/api";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Claim() {
  const { itemId } = useParams();
  const [imgUrl, setImgUrl] = useState<string>("");

  console.log(itemId);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const url = await getItemImgById(itemId as string);
        setImgUrl(url);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };
    fetchImage();
  }, [itemId]);

  //hardcoded qanda as getQandA-api is not yet merge to backend main branch.
  const body = [
    { question: "What condition?", answer: "" },
    { question: "Where exactly you lost it?", answer: "" },
    { question: "Any damages?", answer: "" },
  ];

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Claim Item</h1>
      {imgUrl && (
        <div className="mb-4">
          <Image
            src={imgUrl}
            alt="Item image"
            width={300}
            height={300}
            className="rounded object-cover"
          />
        </div>
      )}
      <form className="space-y-4">
        {body.map((item, index) => (
          <div key={index} className="space-y-2">
            <label className="block">{item.question}</label>
            <input
              type="text"
              className="border p-2 w-full"
              placeholder="Your answer"
            />
          </div>
        ))}
        <button className="bg-[#38A3A5] p-2 rounded">Submit Claim</button>
      </form>
    </div>
  );
}
