import type { AlgorithmFactory, ArtRenderer } from '../types/engine';

export type AlgorithmModuleLoader = () => Promise<Record<string, any>>;

export const algorithmLoaders: Record<string, AlgorithmModuleLoader> = {
  // Organic
  'organic-wave': () => import('./organic/organic-wave'),
  'phyllotaxis-spiral': () => import('./organic/phyllotaxis-spiral'),
  'superformula-bloom': () => import('./organic/superformula-bloom'),
  'perlin-tendrils': () => import('./organic/perlin-tendrils'),

  // Fluid
  'vortex-filament': () => import('./fluid/vortex-filament'),
  'curl-vector-field': () => import('./fluid/curl-vector-field'),
  'smoke-lattice': () => import('./fluid/smoke-lattice'),
  'viscous-gyre': () => import('./fluid/viscous-gyre'),
  'atmospheric-tornado': () => import('./fluid/atmospheric-tornado'),
  'water-splash': () => import('./fluid/water-splash'),
  'rain-effect': () => import('./fluid/rain-effect'),
  'stripe-kinetic-ribbon': () => import('./fluid/stripe-kinetic-ribbon'),

  // Particles
  'gravitational-swarm': () => import('./particles/gravitational-swarm'),
  'lissajous-web': () => import('./particles/lissajous-web'),
  'brownian-constellation': () => import('./particles/brownian-constellation'),
  'boids-flocking': () => import('./particles/boids-flocking'),

  // Geometry
  'hyperbolic-tessellation': () => import('./geometry/hyperbolic-tessellation'),
  'sacred-mandala': () => import('./geometry/sacred-mandala'),
  'moire-interference': () => import('./geometry/moire-interference'),
  'penrose-subdivision': () => import('./geometry/penrose-subdivision'),
  'microscopic-ice-crystal': () => import('./geometry/microscopic-ice-crystal'),
  'baroque-filigrane': () => import('./geometry/baroque-filigrane'),
  'guilloche-filigrane': () => import('./geometry/guilloche-filigrane'),
  'damascene-filigrane': () => import('./geometry/damascene-filigrane'),

  // Waves
  'fourier-harmonics': () => import('./waves/fourier-harmonics'),
  'standing-wave-grid': () => import('./waves/standing-wave-grid'),
  'soliton-pulse': () => import('./waves/soliton-pulse'),
  'circular-ripples': () => import('./waves/circular-ripples'),

  // Space
  'black-hole-lensing': () => import('./space/black-hole-lensing'),
  'kepler-orbits': () => import('./space/kepler-orbits'),
  'galaxy-spiral-density': () => import('./space/galaxy-spiral-density'),

  // Experimental
  'continuous-cellular-automata': () => import('./experimental/continuous-cellular-automata'),
  'julia-morph': () => import('./experimental/julia-morph'),

  // Sea & Deep Sea Creatures
  'bioluminescent-jellyfish': () => import('./creatures/bioluminescent-jellyfish'),
  'mathematical-crab': () => import('./creatures/mathematical-crab'),
  'deep-sea-prawn': () => import('./creatures/deep-sea-prawn'),
  'manta-ray-glide': () => import('./creatures/manta-ray-glide'),
  'nautilus-spiral': () => import('./creatures/nautilus-spiral'),
  'deep-sea-anglerfish': () => import('./creatures/deep-sea-anglerfish'),
  'giant-siphonophore': () => import('./creatures/giant-siphonophore'),
  'comb-jelly-ctenophore': () => import('./creatures/comb-jelly-ctenophore'),
  'vampire-squid': () => import('./creatures/vampire-squid'),
  'dumbo-octopus': () => import('./creatures/dumbo-octopus'),
  'gulper-eel': () => import('./creatures/gulper-eel'),
  'barreleye-fish': () => import('./creatures/barreleye-fish'),
  'sea-angel-pteropod': () => import('./creatures/sea-angel-pteropod'),
  'abyssal-tripod-fish': () => import('./creatures/abyssal-tripod-fish'),
  'giant-spider-crab': () => import('./creatures/giant-spider-crab'),
  'leafy-sea-dragon': () => import('./creatures/leafy-sea-dragon'),
  'hammerhead-shark': () => import('./creatures/hammerhead-shark'),
  'siamese-betta': () => import('./creatures/siamese-betta'),
  'japanese-koi': () => import('./creatures/japanese-koi'),
  'symphysodon-discus': () => import('./creatures/symphysodon-discus'),
  'electric-lionfish': () => import('./creatures/electric-lionfish'),

  // Insects
  'mathematical-butterfly': () => import('./insects/mathematical-butterfly'),
  'scarab-beetle': () => import('./insects/scarab-beetle'),
  'golden-honeybee': () => import('./insects/golden-honeybee'),
  'bioluminescent-dragonfly': () => import('./insects/bioluminescent-dragonfly'),

  // Nature & Botany
  'fractal-tree': () => import('./botany/fractal-tree'),
  'barnsley-fern': () => import('./botany/barnsley-fern'),
  'gerstner-ocean-waves': () => import('./botany/gerstner-ocean-waves'),
  'coral-polyp-growth': () => import('./botany/coral-polyp-growth'),
  'snow-fall': () => import('./botany/snow-fall'),
  'botanical-filigrane': () => import('./botany/botanical-filigrane'),
  'rhodonea-rose': () => import('./botany/rhodonea-rose'),
  'sacred-lotus': () => import('./botany/sacred-lotus'),
  'chrysanthemum-bloom': () => import('./botany/chrysanthemum-bloom'),
  'bioluminescent-orchid': () => import('./botany/bioluminescent-orchid'),
  'fibonacci-sunflower': () => import('./botany/fibonacci-sunflower'),
  'zen-bonsai-tree': () => import('./botany/zen-bonsai-tree'),

  // Human Anatomy & Biology
  'cardiac-pulse': () => import('./anatomy/cardiac-pulse'),
  'neural-synapse': () => import('./anatomy/neural-synapse'),
  'dna-double-helix': () => import('./anatomy/dna-double-helix'),
  'retinal-iris': () => import('./anatomy/retinal-iris'),

  // Physics & Mathematics Study
  'quantum-hydrogen-orbital': () => import('./physics/quantum-hydrogen-orbital'),
  'lorenz-attractor-chaos': () => import('./physics/lorenz-attractor-chaos'),
  'double-pendulum-chaos': () => import('./physics/double-pendulum-chaos'),
  'fourier-epicycles-transform': () => import('./physics/fourier-epicycles-transform'),
  'maxwell-em-wave': () => import('./physics/maxwell-em-wave'),
  'spacetime-curvature-geodesic': () => import('./physics/spacetime-curvature-geodesic'),
  'crepuscular-sunset-rays': () => import('./physics/crepuscular-sunset-rays'),
  'underwater-oceanic-sunbeams': () => import('./physics/underwater-oceanic-sunbeams'),
  'atmospheric-cloudbreak-godrays': () => import('./physics/atmospheric-cloudbreak-godrays'),
  'solar-corona-flare': () => import('./physics/solar-corona-flare'),
  'moonlit-ocean-rays': () => import('./physics/moonlit-ocean-rays'),
};

const factoryCache = new Map<string, AlgorithmFactory>();

export async function getAlgorithmRenderer(key: string): Promise<ArtRenderer> {
  if (factoryCache.has(key)) {
    const cachedFactory = factoryCache.get(key)!;
    return cachedFactory();
  }

  const loader = algorithmLoaders[key];
  if (!loader) {
    console.warn(`Algorithm key "${key}" not found in registry, falling back to organic-wave`);
    const fallbackMod = await algorithmLoaders['organic-wave']();
    const fallbackFactory = Object.values(fallbackMod).find((fn) => typeof fn === 'function') as AlgorithmFactory;
    return fallbackFactory();
  }

  try {
    const mod = await loader();
    const factory = Object.values(mod).find((fn) => typeof fn === 'function') as AlgorithmFactory | undefined;
    if (!factory) {
      throw new Error(`No factory function exported in module for ${key}`);
    }
    factoryCache.set(key, factory);
    return factory();
  } catch (err) {
    console.error(`Error loading algorithm "${key}":`, err);
    const fallbackMod = await algorithmLoaders['organic-wave']();
    const fallbackFactory = Object.values(fallbackMod).find((fn) => typeof fn === 'function') as AlgorithmFactory;
    return fallbackFactory();
  }
}
