"use server";

import { searchArchiveOrgSchema } from "./schemas";
import searchArchiveOrg from "@/lib/utils/searchArchiveOrg";
import { revalidatePath } from "next/cache";

export async function searchArchiveOrgAction(formData: FormData) {
  const parsedData = searchArchiveOrgSchema.safeParse({
    query: formData.get("query"),
  });

  if (!parsedData.success) {
    return { error: parsedData.error.issues[0].message };
  }

  const { query } = parsedData.data;

  try {
    const results = await searchArchiveOrg(query);
    revalidatePath("/");

    return { results };
  } catch (error) {
    return { error: "Failed to fetch results. Please try again." };
  }
}
