import { ArchiveItem } from "@/lib/types";
import SearchResultCard from "@/ui/search/SearchResultCard";

type Props = {
  searchResults: ArchiveItem[];
};

export default function SearchResultsList({ searchResults }: Props) {
  return (
    <ul className='space-y-6 mt-8'>
      {searchResults.map((item) => (
        <SearchResultCard key={item.identifier} item={item} />
      ))}
    </ul>
  );
}
