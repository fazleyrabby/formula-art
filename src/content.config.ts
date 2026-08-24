import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const artworkSchema = z.object({
  id: z.string().regex(/^\d{3}$/, 'ID must be a 3-digit string (e.g. 001)'),
  slug: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  category: z.enum([
    'organic',
    'fluid',
    'particles',
    'geometry',
    'waves',
    'space',
    'creatures',
    'botany',
    'anatomy',
    'experimental'
  ]),
  description: z.string(),
  
  // Mathematical representation
  mathNotation: z.string().describe('LaTeX or standard mathematical expression'),
  formulaCompact: z.string().describe('Compact tweet-sized JS/math expression'),
  formulaFull: z.string().describe('Formatted complete implementation code'),
  
  // Algorithmic properties
  algorithmKey: z.string().describe('Identifier matching src/algorithms registry'),
  complexity: z.enum(['low', 'medium', 'high']).default('medium'),
  particleCount: z.number().int().positive().optional(),
  
  // Interactive Parameters
  parameters: z.array(
    z.object({
      key: z.string(),
      label: z.string(),
      type: z.enum(['range', 'color', 'boolean']),
      min: z.number().optional(),
      max: z.number().optional(),
      step: z.number().optional(),
      defaultValue: z.union([z.number(), z.string(), z.boolean()]),
      description: z.string().optional()
    })
  ).default([]),

  // Search & Metadata
  tags: z.array(z.string()).min(1),
  featured: z.boolean().default(false),
  author: z.object({
    name: z.string(),
    url: z.string().url().optional(),
    twitter: z.string().optional()
  }).default({ name: 'Math Art Core' }),
  
  // Canvas defaults
  aspectRatio: z.enum(['1:1', '16:9', '4:3']).default('1:1'),
  defaultFps: z.number().int().default(60),
  renderMode: z.enum(['canvas-2d', 'webgl']).default('canvas-2d')
});

const artworks = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/artworks' }),
  schema: artworkSchema
});

export const collections = { artworks };
