import { defineCollection, z } from 'astro:content';

const authorsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    role: z.string().default('Professor'),
    avatar: z.string().optional(),
    bio: z.string().optional(),
  }),
});

const categoriesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    parent: z.string().optional(),
    color: z.string().default('#E07720'),
  }),
});

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    
    // ESTE É O CAMPO CRUCIAL PARA NÃO QUEBRAR O BUILD
    custom_slug: z.string().optional(),
    
    description: z.string(),
    pubDate: z.date(),
    author: z.string(), 
    categories: z.array(z.string()).default([]), 
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  'blog': blogCollection,
  'authors': authorsCollection,
  'categories': categoriesCollection,
};