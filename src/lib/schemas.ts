import { z } from "zod";

export const searchArchiveOrgSchema = z.object({
  query: z
    .string()
    .optional()
    .transform((val) => (val?.trim() === "" ? undefined : val?.trim())),
});
