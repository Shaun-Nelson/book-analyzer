"use client";

import SearchResultCard from "@/ui/SearchResultCard";
import SearchResultCardSkeleton from "@/ui/skeletons/SearchResultCardSkeleton";
import { ArchiveItem } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useReader } from "@/lib/context/ReaderContext";

type Props = {
  searchResults: ArchiveItem[];
};

export default function SearchResults({ searchResults }: Props) {
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const { text, book } = useReader();

  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const setErrorForItem = (identifier: string, hasError: boolean) => {
    setErrors((prev) => ({ ...prev, [identifier]: hasError }));
  };

  useEffect(() => {
    if (text && book) {
      router.push("/read");
    }
  }, [text, book, router]);

  if (!query) {
    return <div className='hidden'></div>;
  }

  return (
    <>
      {!text && (
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
                  setErrorForItem={setErrorForItem}
                />
              </Suspense>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
