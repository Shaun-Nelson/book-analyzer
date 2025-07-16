import { ArchiveItem, ArchiveSearchOptions } from "@/lib/types";
import { revalidatePath } from "next/cache";

export const searchArchiveOrg = async ({
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

  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; ArchiveOrgReader/1.0)",
    },
  });
  if (!response.ok) {
    throw new Error(`Search failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data.response.docs as ArchiveItem[];
};

export const fetchFullTextFromArchiveOrg = async (
  identifier: string
): Promise<string> => {
  try {
    // Step 1: Get metadata for the book
    const metadataUrl = `https://archive.org/metadata/${identifier}`;
    const metadataRes = await fetch(metadataUrl);

    if (!metadataRes.ok) {
      throw new Error(`Failed to fetch metadata: ${metadataRes.statusText}`);
    }

    const metadata = await metadataRes.json();

    // Step 2: Find the text file (usually ends with _djvu.txt)
    const files = metadata.files as { name: string }[];
    const textFile =
      files.find((f) => f.name.endsWith("_djvu.txt")) ||
      files.find((f) => f.name.endsWith(".txt")) ||
      files.find((f) => f.name.endsWith("_epub.epub"));

    if (!textFile) {
      throw new Error("Full text file not found");
    }

    // Step 3: Fetch the full text file
    const textUrl = `https://archive.org/download/${identifier}/${textFile.name}`;
    const textRes = await fetch(textUrl);

    if (!textRes.ok) {
      throw new Error(`Failed to fetch full text: ${textRes.statusText}`);
    }

    const fullText = await textRes.text();

    revalidatePath("/");

    return fullText;
  } catch (error) {
    console.error("Error fetching full text:", error);
    revalidatePath("/");
    throw error;
  }
};
