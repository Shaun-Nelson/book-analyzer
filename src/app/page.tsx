"use client";

import Searchbar from "@/ui/Searchbar";
import PageTitleAndDescription from "@/ui/PageTitleAndDescription";
import BookText from "@/ui/BookText";
import { ArchiveItem } from "@/lib/types";
import { Suspense, useState } from "react";

export default function Home() {
  const [searchResults, setSearchResults] = useState<ArchiveItem[]>([]);

  return (
    <main className='min-h-screen bg-neutral-200 font-[literata]'>
      <div className='container mx-auto p-4'>
        <Searchbar onSearchResults={setSearchResults} />
        <PageTitleAndDescription />
        <Suspense fallback={<div className='text-center mt-8'>Loading...</div>}>
          <BookText searchResults={searchResults} />
        </Suspense>
      </div>
    </main>
  );
}
