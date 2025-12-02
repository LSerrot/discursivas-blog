// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(), // Obrigatório para o SEO (Meta Description)
    pubDate: z.date(),
    author: z.string().default('Admin'),
    image: z.string().optional(), // URL da imagem de destaque
    tags: z.array(z.string()).default(["geral"]),
    draft: z.boolean().default(false), // Se true, o post não aparece no site final
  }),
});

export const collections = {
  'blog': blogCollection,
};