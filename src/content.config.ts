import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Base properties shared across all artwork types
const baseArtworkSchema = {
  id: z.string().regex(/^\d{3}$/, 'ID must be a 3-digit string (e.g. 001)'),
  slug: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  category: z.string().default('experimental'),
  description: z.string(),
  
  // Algorithmic properties
  algorithmKey: z.string().describe('Identifier matching src/algorithms registry'),
  complexity: z.enum(['low', 'medium', 'high']).default('medium'),
  
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
};

export const artworkSchema = z.object({
  ...baseArtworkSchema,
  category: z.enum([
    'organic', 'fluid', 'particles', 'geometry', 'waves', 'space',
    'creatures', 'insects', 'botany', 'anatomy', 'physics', 'experimental'
  ]),
  mathNotation: z.string().describe('LaTeX or standard mathematical expression'),
  formulaCompact: z.string().describe('Compact tweet-sized JS/math expression'),
  formulaFull: z.string().describe('Formatted complete implementation code'),
  particleCount: z.number().int().positive().optional(),
  renderMode: z.enum(['canvas-2d', 'webgl']).default('canvas-2d')
});

export const webgpuSchema = z.object({
  ...baseArtworkSchema,
  wgslCode: z.string().describe('The core WGSL shader code'),
});

export const shaderSchema = z.object({
  ...baseArtworkSchema,
  fragmentShader: z.string().describe('GLSL fragment shader code'),
  vertexShader: z.string().optional().describe('Optional GLSL vertex shader code'),
});

export const p5Schema = z.object({
  ...baseArtworkSchema,
  sketchCode: z.string().describe('The p5.js instance mode sketch code'),
});

const artworks = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/artworks' }),
  schema: artworkSchema
});

const webgpu = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/webgpu' }),
  schema: webgpuSchema
});

const shaders = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/shaders' }),
  schema: shaderSchema
});

const p5js = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/p5js' }),
  schema: p5Schema
});

export const collections = { artworks, webgpu, shaders, p5js };
