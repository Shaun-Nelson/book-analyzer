"use client";

import SearchResultCard from "./SearchResultCard";
import { ArchiveItem } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

type Props = {
  searchResults: ArchiveItem[];
};

export default function SearchResults({ searchResults }: Props) {
  const [text, setText] = useState<string | null>("");
  const [bookChoice, setBookChoice] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const setErrorForItem = (identifier: string, hasError: boolean) => {
    setErrors((prev) => ({ ...prev, [identifier]: hasError }));
  };

  return !query ? (
    <div className='hidden'></div>
  ) : (
    <div className='mt-8'>
      <ul className='space-y-6'>
        {searchResults.map((item) => (
          <SearchResultCard
            key={item.identifier}
            item={item}
            error={errors[item.identifier] ?? false}
            setText={setText}
            setBookChoice={setBookChoice}
            setErrorForItem={setErrorForItem}
          />
        ))}
      </ul>
    </div>
  );
}
