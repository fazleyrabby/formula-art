export type ArtworkCategory =
  | 'organic'
  | 'fluid'
  | 'particles'
  | 'geometry'
  | 'waves'
  | 'space'
  | 'creatures'
  | 'botany'
  | 'anatomy'
  | 'physics'
  | 'experimental';

export interface ParameterDefinition {
  key: string;
  label: string;
  type: 'range' | 'color' | 'boolean';
  min?: number;
  max?: number;
  step?: number;
  defaultValue: number | string | boolean;
  description?: string;
}

export interface ArtworkAuthor {
  name: string;
  url?: string;
  twitter?: string;
}

export interface ArtworkData {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: ArtworkCategory;
  description: string;
  
  // Mathematical representation
  mathNotation: string;
  formulaCompact: string;
  formulaFull: string;
  
  // Algorithmic properties
  algorithmKey: string;
  complexity: 'low' | 'medium' | 'high';
  particleCount?: number;
  
  // Interactive Parameters
  parameters: ParameterDefinition[];
  
  // Search & Metadata
  tags: string[];
  featured?: boolean;
  author: ArtworkAuthor;
  
  // Canvas defaults
  aspectRatio: '1:1' | '16:9' | '4:3';
  defaultFps: number;
  renderMode: 'canvas-2d' | 'webgl';
}
