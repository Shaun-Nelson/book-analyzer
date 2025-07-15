import { z } from "zod";

export const searchArchiveOrgSchema = z.object({
  query: z.string().min(1, "Search query is required"),
});
