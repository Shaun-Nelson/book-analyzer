import SearchResultCard from "@/ui/search/SearchResultCard";
import { ArchiveItem } from "@/lib/types";

type Props = {
  searchResults: ArchiveItem[];
};

export default function SearchResultCardsWrapper({ searchResults }: Props) {
  return (
    <>
      {searchResults.map((item) => (
        <SearchResultCard key={item.identifier} item={item} />
      ))}
    </>
  );
}
