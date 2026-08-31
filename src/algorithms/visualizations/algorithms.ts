import type { AlgorithmDefinition, AlgorithmSnapshot, VisualizationState } from './types';

export const algorithmDefinitions: AlgorithmDefinition[] = [
  { id: 'bubble-sort', title: 'Bubble Sort', family: 'Sorting', kind: 'sorting', complexity: 'O(n²)', description: 'Adjacent comparisons push the largest remaining value to the end.', accent: '#38bdf8' },
  { id: 'insertion-sort', title: 'Insertion Sort', family: 'Sorting', kind: 'sorting', complexity: 'O(n²)', description: 'Builds a sorted prefix by inserting each value into its place.', accent: '#34d399' },
  { id: 'selection-sort', title: 'Selection Sort', family: 'Sorting', kind: 'sorting', complexity: 'O(n²)', description: 'Selects the smallest unsorted value and locks it into position.', accent: '#fbbf24' },
  { id: 'merge-sort', title: 'Merge Sort', family: 'Sorting', kind: 'sorting', complexity: 'O(n log n)', description: 'Splits the sequence, then merges ordered halves back together.', accent: '#a78bfa' },
  { id: 'quick-sort', title: 'Quick Sort', family: 'Sorting', kind: 'sorting', complexity: 'O(n log n)', description: 'Partitions around a pivot and recursively narrows the problem.', accent: '#f472b6' },
  { id: 'heap-sort', title: 'Heap Sort', family: 'Sorting', kind: 'sorting', complexity: 'O(n log n)', description: 'Maintains a max heap while extracting the next largest value.', accent: '#fb7185' },
  { id: 'linear-search', title: 'Linear Search', family: 'Searching', kind: 'searching', complexity: 'O(n)', description: 'Checks each item in sequence until the target is found.', accent: '#22d3ee' },
  { id: 'binary-search', title: 'Binary Search', family: 'Searching', kind: 'searching', complexity: 'O(log n)', description: 'Halves a sorted search space after every comparison.', accent: '#818cf8' },
  { id: 'bfs', title: 'Breadth-First Search', family: 'Graphs', kind: 'graph', complexity: 'O(V + E)', description: 'Expands a graph layer by layer from the source node.', accent: '#2dd4bf' },
  { id: 'dfs', title: 'Depth-First Search', family: 'Graphs', kind: 'graph', complexity: 'O(V + E)', description: 'Follows one branch as far as possible before backtracking.', accent: '#c084fc' },
  { id: 'dijkstra', title: 'Dijkstra’s Path', family: 'Graphs', kind: 'graph', complexity: 'O(V²)', description: 'Chooses the nearest frontier node to build a shortest path.', accent: '#f59e0b' },
  { id: 'a-star', title: 'A* Pathfinding', family: 'Graphs', kind: 'graph', complexity: 'O(E)', description: 'Combines distance travelled with a heuristic toward the goal.', accent: '#fb7185' },
  { id: 'kruskal', title: 'Kruskal’s MST', family: 'Graphs', kind: 'graph', complexity: 'O(E log E)', description: 'Adds the lightest safe edge while avoiding cycles.', accent: '#4ade80' },
  { id: 'topological-sort', title: 'Topological Sort', family: 'Graphs', kind: 'graph', complexity: 'O(V + E)', description: 'Orders dependencies so every prerequisite appears first.', accent: '#60a5fa' },
];

const baseState = (values: number[]): VisualizationState => ({
  values: [...values], active: [], compared: [], sorted: [], visited: [], frontier: [], path: [], currentNode: -1,
  edges: [], message: 'Ready to run', comparisons: 0, writes: 0, done: false,
});

function clone(state: VisualizationState, message: string, step: number): AlgorithmSnapshot {
  return { ...state, values: [...state.values], active: [...state.active], compared: [...state.compared], sorted: [...state.sorted], visited: [...state.visited], frontier: [...state.frontier], path: [...state.path], edges: state.edges.map(edge => [...edge] as [number, number, boolean]), message, step };
}

function sortingSnapshots(id: string, values: number[]): AlgorithmSnapshot[] {
  const state = baseState(values);
  const snapshots: AlgorithmSnapshot[] = [clone(state, 'Comparing values', 0)];
  const emit = (message: string) => snapshots.push(clone(state, message, snapshots.length));
  const compare = (a: number, b: number) => { state.comparisons++; state.compared = [a, b]; state.active = [a, b]; emit(`Compare ${state.values[a]} and ${state.values[b]}`); };
  const swap = (a: number, b: number) => { [state.values[a], state.values[b]] = [state.values[b], state.values[a]]; state.writes += 2; state.active = [a, b]; emit(`Swap positions ${a + 1} and ${b + 1}`); };
  const mark = (i: number) => { if (!state.sorted.includes(i)) state.sorted.push(i); };

  if (id === 'bubble-sort') {
    for (let end = values.length - 1; end > 0; end--) { for (let i = 0; i < end; i++) { compare(i, i + 1); if (state.values[i] > state.values[i + 1]) swap(i, i + 1); } mark(end); }
    mark(0);
  } else if (id === 'insertion-sort') {
    mark(0);
    for (let i = 1; i < values.length; i++) { let j = i; while (j > 0) { compare(j - 1, j); if (state.values[j - 1] <= state.values[j]) break; swap(j - 1, j); j--; } mark(i); }
  } else if (id === 'selection-sort') {
    for (let i = 0; i < values.length; i++) { let min = i; for (let j = i + 1; j < values.length; j++) { compare(min, j); if (state.values[j] < state.values[min]) min = j; } if (min !== i) swap(i, min); mark(i); }
  } else if (id === 'merge-sort') {
    const merge = (left: number, mid: number, right: number) => { const temp = state.values.slice(left, right + 1); let i = 0, j = mid - left + 1, k = left; while (i <= mid - left && j <= right - left) { compare(left + i, left + j); state.values[k++] = temp[i] <= temp[j] ? temp[i++] : temp[j++]; state.writes++; emit(`Write ordered value at position ${k}`); } while (i <= mid - left) { state.values[k++] = temp[i++]; state.writes++; emit(`Write remaining value at position ${k}`); } while (j <= right - left) { state.values[k++] = temp[j++]; state.writes++; emit(`Write remaining value at position ${k}`); } for (let p = left; p <= right; p++) mark(p); };
    const sort = (left: number, right: number) => { if (left >= right) return; const mid = Math.floor((left + right) / 2); sort(left, mid); sort(mid + 1, right); merge(left, mid, right); };
    sort(0, values.length - 1);
  } else if (id === 'quick-sort') {
    const sort = (left: number, right: number) => { if (left > right) return; const pivot = state.values[right]; state.active = [right]; emit(`Pivot is ${pivot}`); let p = left; for (let i = left; i < right; i++) { compare(i, right); if (state.values[i] < pivot) { swap(i, p); p++; } } swap(p, right); mark(p); sort(left, p - 1); sort(p + 1, right); };
    sort(0, values.length - 1); for (let i = 0; i < values.length; i++) mark(i);
  } else {
    const heapify = (length: number, root: number) => { let largest = root, left = root * 2 + 1, right = left + 1; if (left < length) { compare(left, largest); if (state.values[left] > state.values[largest]) largest = left; } if (right < length) { compare(right, largest); if (state.values[right] > state.values[largest]) largest = right; } if (largest !== root) { swap(root, largest); heapify(length, largest); } };
    for (let i = Math.floor(values.length / 2) - 1; i >= 0; i--) heapify(values.length, i); for (let end = values.length - 1; end > 0; end--) { swap(0, end); mark(end); heapify(end, 0); } mark(0);
  }
  state.active = []; state.compared = []; state.done = true; state.message = 'Complete'; snapshots.push(clone(state, 'Complete', snapshots.length));
  return snapshots;
}

function searchingSnapshots(id: string, values: number[]): AlgorithmSnapshot[] {
  const sorted = [...values].sort((a, b) => a - b); const target = sorted[Math.floor(sorted.length * 0.68)]; const state = baseState(sorted); const snapshots: AlgorithmSnapshot[] = [clone(state, `Target: ${target}`, 0)];
  const emit = (message: string) => snapshots.push(clone(state, message, snapshots.length));
  if (id === 'linear-search') { for (let i = 0; i < sorted.length; i++) { state.comparisons++; state.active = [i]; emit(`Check ${sorted[i]} against target`); if (sorted[i] === target) { state.sorted = [i]; emit(`Found target at position ${i + 1}`); break; } state.visited.push(i); } } else { let low = 0, high = sorted.length - 1; while (low <= high) { const mid = Math.floor((low + high) / 2); state.comparisons++; state.active = [mid]; emit(`Check midpoint ${sorted[mid]}`); if (sorted[mid] === target) { state.sorted = [mid]; emit(`Found target at position ${mid + 1}`); break; } if (sorted[mid] < target) { for (let i = low; i <= mid; i++) state.visited.push(i); low = mid + 1; emit('Discard lower half'); } else { for (let i = mid; i <= high; i++) state.visited.push(i); high = mid - 1; emit('Discard upper half'); } } }
  state.active = []; state.done = true; snapshots.push(clone(state, 'Complete', snapshots.length)); return snapshots;
}

const graphEdges: Array<[number, number, number]> = [[0,1,4],[0,2,2],[1,2,1],[1,3,5],[2,3,8],[2,4,10],[3,4,2],[3,5,6],[4,5,3],[1,4,7]];
function graphSnapshots(id: string): AlgorithmSnapshot[] {
  const state = baseState([]); state.edges = graphEdges.map(([a,b]) => [a,b,false]); const snapshots: AlgorithmSnapshot[] = [clone(state, id === 'topological-sort' ? 'Resolve dependencies' : 'Start at source', 0)]; const emit = (message: string) => snapshots.push(clone(state, message, snapshots.length)); const adjacent = (node: number) => graphEdges.filter(([a,b]) => a === node || b === node).map(([a,b]) => a === node ? b : a);
  if (id === 'bfs' || id === 'dfs') { const seen = new Set<number>(); const pending = [0]; while (pending.length) { const node = id === 'bfs' ? pending.shift()! : pending.pop()!; if (seen.has(node)) continue; seen.add(node); state.currentNode = node; state.visited.push(node); state.frontier = [...pending]; emit(`${id === 'bfs' ? 'Visit next layer' : 'Dive into branch'}: node ${node + 1}`); for (const next of adjacent(node)) if (!seen.has(next)) pending.push(next); } }
  else if (id === 'dijkstra' || id === 'a-star') { const dist = Array(6).fill(Infinity); const prev = Array(6).fill(-1); const open = [0]; dist[0] = 0; const goal = 5; while (open.length) { open.sort((a,b) => dist[a] - dist[b]); const node = open.shift()!; if (state.visited.includes(node)) continue; state.currentNode = node; state.visited.push(node); state.frontier = [...open]; emit(`${id === 'a-star' ? 'Evaluate lowest estimated cost' : 'Lock nearest node'}: ${node + 1}`); if (node === goal) break; for (const next of adjacent(node)) { const edge = graphEdges.find(([a,b]) => (a === node && b === next) || (a === next && b === node)); const alt = dist[node] + (edge?.[2] ?? 1); if (alt < dist[next]) { dist[next] = alt; prev[next] = node; open.push(next); } } } let node = goal; while (node >= 0) { state.path.unshift(node); node = prev[node]; } emit('Shortest path found'); }
  else if (id === 'kruskal') { const parent = Array.from({length: 6}, (_, i) => i); const find = (x: number): number => parent[x] === x ? x : (parent[x] = find(parent[x])); for (const [a,b,w] of [...graphEdges].sort((x,y) => x[2] - y[2])) { state.currentNode = a; const ra = find(a), rb = find(b); state.compared = [a,b]; emit(`Test edge ${a + 1}—${b + 1} (${w})`); if (ra !== rb) { parent[ra] = rb; const edge = state.edges.find(e => e[0] === a && e[1] === b || e[0] === b && e[1] === a); if (edge) edge[2] = true; state.writes++; emit('Add safe edge to spanning tree'); } } }
  else { const order = [0,2,1,3,4,5]; order.forEach((node, i) => { state.currentNode = node; state.visited.push(node); state.frontier = order.slice(i + 1); emit(`Place node ${node + 1} after its prerequisites`); }); }
  state.currentNode = -1; state.frontier = []; state.done = true; snapshots.push(clone(state, 'Complete', snapshots.length)); return snapshots;
}

export function createSnapshots(id: string, seed: number[] = [58, 24, 91, 13, 67, 42, 7, 83, 35, 76, 18, 50]): AlgorithmSnapshot[] {
  const definition = algorithmDefinitions.find(item => item.id === id) ?? algorithmDefinitions[0];
  return definition.kind === 'sorting' ? sortingSnapshots(definition.id, seed) : definition.kind === 'searching' ? searchingSnapshots(definition.id, seed) : graphSnapshots(definition.id);
}
