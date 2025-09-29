// src/content/config.ts
import { z, defineCollection } from "astro:content";

const baseSchema = z.object({
  title: z.string(),
  description: z.string().optional().default(""),
  date: z.string(),                // ISO (YYYY-MM-DD)
  draft: z.boolean().default(false),
  cover: z.string().optional(),
  readingTime: z.number().optional().default(6),
  tags: z.array(z.string()).optional(),
  affiliateNote: z.boolean().optional(),
  author: z.object({
    name: z.string().optional().default(""),
    avatar: z.string().optional().default(""),
    bio: z.string().optional().default(""),
    link: z.string().optional().default(""),
  }).optional(),
  sources: z.array(z.object({
    name: z.string().optional(),
    url: z.string(),
  })).optional(),
});

const posts = defineCollection({ type: "content", schema: baseSchema });
const articles = defineCollection({ type: "content", schema: baseSchema }); // 👈 neu

export const collections = { posts, articles };