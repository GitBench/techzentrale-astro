import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.union([z.string(), z.date()]), // ← erlaubt String ODER Date
    cover: z.string().optional(),
    tags: z.array(z.string()).optional(),
    readingTime: z.number().optional(),
  }),
});

export const collections = { posts };
