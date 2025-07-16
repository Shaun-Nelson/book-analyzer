"use client";

import PageTitleAndDescription from "@/ui/PageTitleAndDescription";
import SearchResults from "@/ui/SearchResults";
import { ArchiveItem } from "@/lib/types";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { searchArchiveOrgAction } from "@/lib/actions/searchbarAction";

export default function Home() {
  const [searchResults, setSearchResults] = useState<ArchiveItem[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    async function fetchSearchResults() {
      if (searchParams.has("query")) {
        const query = searchParams.get("query");
        const formData = new FormData();

        formData.append("query", query ?? "");
        const res = await searchArchiveOrgAction(formData);
        setSearchResults(res);
      }
    }

    fetchSearchResults();
    return;
  }, [searchParams]);

  return (
    <div className='container mx-auto p-4'>
      <PageTitleAndDescription />
      <Suspense fallback={<div className='text-center mt-8'>Loading...</div>}>
        <SearchResults searchResults={searchResults} />
      </Suspense>
    </div>
  );
}
