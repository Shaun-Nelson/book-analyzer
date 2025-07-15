import SearchResultCard from "./SearchResultCard";
import { ArchiveItem } from "@/lib/types";

type Props = {
  searchResults: ArchiveItem[];
};

export default function BookText({ searchResults }: Props) {
  return searchResults.length === 0 ? (
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
