// app/ui/SearchResultsServer.tsx
import { searchArchiveOrgAction } from "@/lib/actions/searchbarAction";
import SearchResultsList from "@/ui/search/SearchResultsList";

type Props = {
  query: string;
};

export default async function SearchResultsServer({ query }: Props) {
  const formData = new FormData();
  formData.append("query", query);

  const results = await searchArchiveOrgAction(formData);

  return <SearchResultsList searchResults={results} />;
}
