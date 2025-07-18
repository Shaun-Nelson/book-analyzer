"use server";

import { searchArchiveOrgSchema } from "../schemas";
import { searchArchiveOrg } from "@/lib/utils/searchArchiveOrg";

export async function searchArchiveOrgAction(formData: FormData) {
  const parsedData = searchArchiveOrgSchema.safeParse({
    query: formData.get("query"),
  });

  if (!parsedData.success) {
    throw new Error(parsedData.error.issues[0].message);
  }

  try {
    if (parsedData.data.query) {
      const results = await searchArchiveOrg({ query: parsedData.data.query });

      return results;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error searching Archive.org:", error);
    throw new Error("Failed to fetch search results");
  }
}
