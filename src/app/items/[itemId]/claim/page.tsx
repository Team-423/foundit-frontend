//route "/items/:itemId/claim
"use client";

import { useParams } from "next/navigation";
import { getItemImgById, getQandA, patchQandA } from "../../../../utils/api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "../../../loading";
import { useUser } from "../../../../contexts/UserContext";

export default function Claim() {
  const { itemId } = useParams();
  const [imgUrl, setImgUrl] = useState<string>("");
  const [QsandAs, setQsandAs] = useState<object[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [answerFromSeeker, setAnswerFromSeeker] = useState<string[]>([
    "",
    "",
    "",
  ]);
  const [submitStatus, setSubmitStatus] = useState<
    "submitting" | "submitted" | null
  >(null);
  const { user } = useUser();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    Promise.all([getItemImgById(itemId as string), getQandA(itemId as string)])
      .then(([url, qaData]) => {
        setImgUrl(url);
        setQsandAs(qaData);
      })
      .catch((error) => {
        console.error("Error fetching item data:", error);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [itemId]);

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answerFromSeeker];
    newAnswers[index] = value;
    setAnswerFromSeeker(newAnswers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("submitting");

    try {
      await patchQandA(itemId as string, {
        answers: answerFromSeeker,
        claimant_id: user?.id || "",
      });
      console.log("Claim submitted and email sent!");
    } catch (error) {
      console.error("Error submitting claim or sending email:", error);
      setIsError(true);
    } finally {
      setSubmitStatus("submitted");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <p>Failed to load item data. Please try again later.</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Claim Item
        </h1>
        {imgUrl && (
          <div className="flex justify-center mb-8">
            <Image
              src={imgUrl}
              alt="Item image"
              width={300}
              height={300}
              className="rounded-lg object-cover shadow-md"
              priority
            />
          </div>
        )}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {QsandAs.map((QandA: { question: string; answer: string }, index) => (
            <div key={index} className="space-y-2">
              <label className="block text-gray-700 font-medium">
                {QandA.question}
              </label>
              <input
                type="text"
                className="w-full p-4 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#38A3A5] focus:border-transparent text-gray-700"
                placeholder="Your answer"
                value={answerFromSeeker[index]}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                required
              />
            </div>
          ))}
          <div className="flex justify-center gap-x-6">
            <button
              className={`bg-[#38A3A5] px-6 py-3 rounded-lg text-white font-medium text-lg shadow-md hover:bg-[#2d8a8c] transition-colors disabled:opacity-50 ${
                submitStatus === "submitting" || submitStatus === "submitted"
                  ? "cursor-not-allowed"
                  : ""
              }`}
              type="submit"
              disabled={
                submitStatus === "submitting" || submitStatus === "submitted"
              }
            >
              {submitStatus === "submitting"
                ? "Submitting..."
                : submitStatus === "submitted"
                ? "Submitted!"
                : "Submit Claim"}
            </button>
            {submitStatus === "submitted" ? (
              <Link href={`/items/${itemId}/chat`}>
                <button className="bg-[#38A3A5] px-6 py-3 rounded-lg text-white font-medium text-lg shadow-md hover:bg-[#2d8a8c] transition-colors disabled:opacity-50">
                  Chat to Finder
                </button>
              </Link>
            ) : null}
          </div>
          {submitStatus === "submitted" && (
            <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg text-center font-medium">
              Your claim request has been sent to the finder.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
