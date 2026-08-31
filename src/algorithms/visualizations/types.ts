export type VisualizationKind = 'sorting' | 'searching' | 'graph';

export interface AlgorithmDefinition {
  id: string;
  title: string;
  family: string;
  kind: VisualizationKind;
  complexity: string;
  description: string;
  accent: string;
}

export interface VisualizationState {
  values: number[];
  active: number[];
  compared: number[];
  sorted: number[];
  visited: number[];
  frontier: number[];
  path: number[];
  currentNode: number;
  edges: Array<[number, number, boolean]>;
  message: string;
  comparisons: number;
  writes: number;
  done: boolean;
}

export interface AlgorithmSnapshot extends VisualizationState {
  step: number;
}
