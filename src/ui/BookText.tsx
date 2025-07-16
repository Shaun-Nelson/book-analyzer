"use client";

import SearchResultCard from "./SearchResultCard";
import { ArchiveItem } from "@/lib/types";
import { useSearchParams } from "next/navigation";

type Props = {
  searchResults: ArchiveItem[];
};

export default function BookText({ searchResults }: Props) {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  return !query ? (
    <div className='hidden'></div>
  ) : (
    <div className='mt-8'>
      <ul className='space-y-3'>
        {searchResults.map((item) => (
          <SearchResultCard key={item.identifier} item={item} />
        ))}
      </ul>
    </div>
  );
}
