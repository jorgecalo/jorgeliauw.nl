import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional().default(''),
    pubDate: z.coerce.date(),
    heroImage: z.string().optional().default('/images/google-dc-eemshaven-security-station.webp'),
    tags: z.array(z.string()).optional().default(['Google Cloud', 'Cloud Security']),
  }),
});

export const collections = {
  posts: postsCollection,
};
