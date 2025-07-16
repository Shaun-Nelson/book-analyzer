"use server";

export async function fetchFullText(
  identifier: string
): Promise<string | null> {
  try {
    // Step 1: Fetch metadata
    const metadataRes = await fetch(
      `https://archive.org/metadata/${identifier}`
    );
    if (!metadataRes.ok) {
      throw new Error(`Metadata fetch failed: ${metadataRes.statusText}`);
    }

    const metadata = await metadataRes.json();
    const files = metadata.files as { name: string }[];

    // Step 2: Find the OCR text file
    const textFile =
      files.find((f) => f.name.endsWith("_djvu.txt")) ||
      files.find((f) => f.name.endsWith(".txt")) ||
      files.find((f) => f.name.endsWith("_epub.epub"));

    if (!textFile) throw new Error("Text file not found.");

    const textUrl = `https://archive.org/download/${identifier}/${textFile.name}`;

    // Step 3: Fetch the text content (CORS-safe on server)
    const textRes = await fetch(textUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; ArchiveOrgReader/1.0)",
      },
    });

    if (!textRes.ok) {
      throw new Error(`Text fetch failed: ${textRes.statusText}`);
    }

    const text = await textRes.text();
    return text;
  } catch (error) {
    return null;
  }
}
