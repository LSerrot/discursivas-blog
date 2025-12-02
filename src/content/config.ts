// src/content/config.ts
import { defineCollection, z } from 'astro:content';

// 1. Coleção de Autores (Para ter Avatar e Bio)
const authorsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    role: z.string().default('Professor'), // Ex: Professor de Biologia
    avatar: z.string().optional(), // Foto do autor
    bio: z.string().optional(),
  }),
});

// 2. Coleção de Categorias (Para Hierarquia: Biologia > Genética)
const categoriesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    parent: z.string().optional(), // Define quem é a "Mãe" (Ex: Parent de Genética é Biologia)
    color: z.string().default('#E07720'), // Cada matéria pode ter uma cor
  }),
});

// 3. Coleção do Blog (Atualizada para conectar com as de cima)
const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    // Agora o autor não é texto solto, é uma referência (ID)
    author: z.string(), 
    // Tags/Categorias agora são lista de referências
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