"use client";

import SearchResultCardsWrapper from "@/ui/search/SearchResultCardsWrapper";
import SearchResultCardsSkeleton from "@/ui/skeletons/SearchResultsCardsSkeleton";
import { ArchiveItem } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useReader } from "@/lib/context/ReaderContext";

type Props = {
  searchResults: ArchiveItem[];
};

export default function SearchResults({ searchResults }: Props) {
  const { text, book } = useReader();

  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

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
        <div className='mt-8 flex flex-col'>
          <ul className='space-y-6'>
            <Suspense fallback={<SearchResultCardsSkeleton />}>
              <SearchResultCardsWrapper searchResults={searchResults} />
            </Suspense>
          </ul>
        </div>
      )}
    </>
  );
}
