"use client";

import { ArchiveItem } from "@/lib/types";
import { fetchFullText } from "@/lib/actions/fetchFullTextAction";
import { useReader } from "@/lib/context/ReaderContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  item: ArchiveItem;
};

export default function SearchResultCard({ item }: Props) {
  const { setBook, setText } = useReader();
  const router = useRouter();
  const [error, setError] = useState(false);

  const handleFetchFullText = async () => {
    try {
      const fullText = await fetchFullText(item.identifier);
      if (fullText) {
        setBook(item);
        setText(fullText);
        router.push("/read");
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    }
  };

  return (
    <li className='p-4 bg-neutral-100 shadow rounded'>
      {!error ? (
        <>
          <h3 className='font-bold'>{item.title}</h3>
          <p className='text-sm text-neutral-600'>
            {item.creator || "Unknown author"} —{" "}
            {item.date?.split("-")[0] || "undated"}
          </p>
          <button
            onClick={handleFetchFullText}
            className='py-2 px-4 mt-4 text-neutral-50 rounded-xl bg-neutral-600'
          >
            Read and Analyze
          </button>
        </>
      ) : (
        <p className='text-lg text-neutral-500'>
          Full text is unavailable for this item.
        </p>
      )}
    </li>
  );
}
