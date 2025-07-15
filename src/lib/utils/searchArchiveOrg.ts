import { ArchiveItem, ArchiveSearchOptions } from "@/lib/types";

const searchArchiveOrg = async ({
  query,
  rows = 10,
  page = 1,
}: ArchiveSearchOptions): Promise<ArchiveItem[]> => {
  const baseUrl =
    process.env.ARCHIVE_ORG_SEARCH_ENDPOINT ||
    "https://archive.org/advancedsearch.php";

  const fullQuery = `${encodeURIComponent(query)} AND mediatype:(texts)`;

  const searchParams = new URLSearchParams({
    q: fullQuery,
    fl: "identifier",
    rows: rows.toString(),
    page: page.toString(),
    output: "json",
  });

  const url = `${baseUrl}?${searchParams.toString()}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Search failed: ${response.statusText}`);
  }

  const data = await response.json();
  console.log("Search results:", data);
  return data.response.docs as ArchiveItem[];
};

export default searchArchiveOrg;
