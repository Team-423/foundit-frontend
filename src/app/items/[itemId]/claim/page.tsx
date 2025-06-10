//route "/items/:itemId/claim
"use client";

import { useParams } from "next/navigation";
import { getItemImgById, getQandA, patchQandA } from "../../../../utils/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loading from "../../../loading";

export default function Claim() {
  const { itemId } = useParams();
  const [imgUrl, setImgUrl] = useState<string>("");
  const [QsandAs, setQsandAs] = useState<object[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [answers, setAnswers] = useState<string[]>(["", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    Promise.all([getItemImgById(itemId as string), getQandA(itemId as string)])
      .then(([url, qaData]) => {
        setImgUrl(url);
        setQsandAs(qaData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [itemId]);

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  console.log(answers);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    patchQandA(itemId as string, answers)
      .then((res) => {
        console.log(res, "<<<<<after patching");
      })
      .catch((error) => {
        console.error("Error submitting answers:", error);
        setIsError(true);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <p>Failed to load item data. Please try again later.</p>;
  }

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
      <form className="space-y-4" onSubmit={handleSubmit}>
        {QsandAs.map((item: { question: string; answer: string }, index) => (
          <div key={index} className="space-y-2">
            <label className="block">{item.question}</label>
            <input
              type="text"
              className="border p-2 w-full"
              placeholder="Your answer"
              value={answers[index]}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              required
            />
          </div>
        ))}
        <button
          className="bg-[#38A3A5] p-2 rounded text-white disabled:opacity-50"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Claim"}
        </button>
      </form>
    </div>
  );
}
