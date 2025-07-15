import { ArchiveItem, ArchiveSearchOptions } from "@/lib/types";

const searchArchiveOrg = async ({
  query,
  rows = 10,
  page = 1,
}: ArchiveSearchOptions): Promise<ArchiveItem[]> => {
  const baseUrl = process.env.ARCHIVE_ORG_SEARCH_ENDPOINT;
  const fullQuery = `${encodeURIComponent(query)} AND mediatype:(texts)`;
  const start = (page - 1) * rows;

  const searchParams = new URLSearchParams({
    q: fullQuery,
    fl: "identifier,title,creator,date",
    rows: rows.toString(),
    start: start.toString(),
    output: "json",
  });

  const url = `${baseUrl}?${searchParams.toString()}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Search failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data.response.docs as ArchiveItem[];
};

export default searchArchiveOrg;
