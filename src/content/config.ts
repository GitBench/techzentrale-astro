import { defineCollection, z } from "astro:content";

const baseSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.string().or(z.date()),
  pubDate: z.string().or(z.date()).optional(),
  draft: z.boolean().default(false),
  cover: z.string().optional(),
  readingTime: z.number().int().positive().optional(),
  tags: z.array(z.string()).optional()
});

export const collections = {
  posts: defineCollection({ type: "content", schema: baseSchema }),     // News
  articles: defineCollection({ type: "content", schema: baseSchema }),  // Langform
};
