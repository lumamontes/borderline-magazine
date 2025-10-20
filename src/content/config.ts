import { defineCollection, z } from 'astro:content';

const magazines = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string(),
    coverImage: z.string(),
    publishDate: z.coerce.date(),
    volume: z.number(),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    seo: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      keywords: z.array(z.string()).default([]),
    }).optional(),
  }),
});

export const collections = {
  magazines,
} as const;
