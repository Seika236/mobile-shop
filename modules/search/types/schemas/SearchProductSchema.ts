import { z } from "zod";

export const SearchProductSchema = z.object({
  productName: z.string().email("Please enter a valid email address"),
});

export type SearchProductSchema = z.infer<typeof SearchProductSchema>;
