"use client";

import SearchResultCard from "@/ui/SearchResultCard";
import SearchResultCardSkeleton from "@/ui/skeletons/SearchResultCardSkeleton";
import { ArchiveItem } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

type Props = {
  searchResults: ArchiveItem[];
};

export default function SearchResults({ searchResults }: Props) {
  const [text, setText] = useState<string | null>("");
  const [bookChoice, setBookChoice] = useState<ArchiveItem>();
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const setErrorForItem = (identifier: string, hasError: boolean) => {
    setErrors((prev) => ({ ...prev, [identifier]: hasError }));
  };

  return !query ? (
    <div className='hidden'></div>
  ) : (
    <>
      {!text ? (
        <div className='mt-8'>
          <ul className='space-y-6'>
            {searchResults.map((item) => (
              <Suspense
                fallback={<SearchResultCardSkeleton />}
                key={item.identifier}
              >
                <SearchResultCard
                  key={item.identifier}
                  item={item}
                  error={errors[item.identifier] ?? false}
                  setText={setText}
                  setBookChoice={setBookChoice}
                  setErrorForItem={setErrorForItem}
                />
              </Suspense>
            ))}
          </ul>
        </div>
      ) : (
        <>
          <div className='mt-4 text-neutral-950 text-xl font-semibold'>
            {bookChoice?.title}
          </div>
          <div className='mt-2 text-neutral-800 text-md'>
            By: {bookChoice?.creator}
          </div>
          <div className='mt-8 p-2 bg-stone-300 text-neutral-950 rounded shadow'>
            {text.split(" ")[20] + "..."}
          </div>
        </>
      )}
    </>
  );
}
