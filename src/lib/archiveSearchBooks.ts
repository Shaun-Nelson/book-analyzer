interface ArchiveSearchResult {
  response: {
    docs: {
      identifier: string;
    }[];
    numFound: number;
  };
}

const searchArchiveOrg = async (
  query: string,
  rows: number = 10,
  page: number = 1
): Promise<string[]> => {
  const baseUrl =
    process.env.ARCHIVE_ORG_SEARCH_ENDPOINT ||
    "https://archive.org/advancedsearch.php";

  const fullQuery = `${query} AND mediatype:(texts)`;

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

  const data: ArchiveSearchResult = await response.json();
  return data.response.docs.map((doc) => doc.identifier);
};

export default searchArchiveOrg;
