"use client";

import { ArchiveItem } from "@/lib/types";
import { fetchFullText } from "@/lib/actions/fetchFullTextAction";
import Link from "next/link";
import { useState } from "react";

type Props = {
  item: ArchiveItem;
};

export default function SearchResultCard({ item }: Props) {
  const [text, setText] = useState<string | null>(null);

  const handleFetchFullText = async () => {
    try {
      const result = await fetchFullText(item.identifier);
      setText(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <li key={item.identifier} className='p-4 bg-neutral-100 shadow rounded'>
      <h3 className='font-bold'>{item.title}</h3>
      <p className='text-sm text-neutral-600'>
        {item.creator || "Unknown author"} —{" "}
        {item.date?.split("-")[0] || "undated"}
      </p>
      <Link href={"/read"}>
        <button
          className='py-2 px-4 mt-4 text-lg text-neutral-50 rounded-xl bg-neutral-600'
          onClick={handleFetchFullText}
        >
          Read and Analyze
        </button>
      </Link>
    </li>
  );
}
