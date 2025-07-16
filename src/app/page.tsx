import PageTitleAndDescription from "@/ui/PageTitleAndDescription";
import SearchResultsServer from "@/ui/search/SearchResultsServer";
import SearchResultCardsSkeleton from "@/ui/skeletons/SearchResultsCardsSkeleton";
import { Suspense } from "react";

export default function Home({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const query = searchParams.query?.trim();

  return (
    <div className='container mx-auto p-4'>
      <PageTitleAndDescription />
      {query && (
        <Suspense fallback={<SearchResultCardsSkeleton />}>
          <SearchResultsServer query={query} />
        </Suspense>
      )}
    </div>
  );
}
