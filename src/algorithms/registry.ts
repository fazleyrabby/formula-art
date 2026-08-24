import type { AlgorithmFactory, ArtRenderer } from '../types/engine';

// Organic
import { createOrganicWave } from './organic/organic-wave';
import { createPhyllotaxisSpiral } from './organic/phyllotaxis-spiral';
import { createSuperformulaBloom } from './organic/superformula-bloom';
import { createPerlinTendrils } from './organic/perlin-tendrils';

// Fluid
import { createVortexFilament } from './fluid/vortex-filament';
import { createCurlVectorField } from './fluid/curl-vector-field';
import { createSmokeLattice } from './fluid/smoke-lattice';
import { createViscousGyre } from './fluid/viscous-gyre';
import { createAtmosphericTornado } from './fluid/atmospheric-tornado';
import { createWaterSplash } from './fluid/water-splash';
import { createRainEffect } from './fluid/rain-effect';

// Particles
import { createGravitationalSwarm } from './particles/gravitational-swarm';
import { createLissajousWeb } from './particles/lissajous-web';
import { createBrownianConstellation } from './particles/brownian-constellation';
import { createBoidsFlocking } from './particles/boids-flocking';

// Geometry
import { createHyperbolicTessellation } from './geometry/hyperbolic-tessellation';
import { createSacredMandala } from './geometry/sacred-mandala';
import { createMoireInterference } from './geometry/moire-interference';
import { createPenroseSubdivision } from './geometry/penrose-subdivision';
import { createMicroscopicIceCrystal } from './geometry/microscopic-ice-crystal';

// Waves
import { createFourierHarmonics } from './waves/fourier-harmonics';
import { createStandingWaveGrid } from './waves/standing-wave-grid';
import { createSolitonPulse } from './waves/soliton-pulse';
import { createCircularRipples } from './waves/circular-ripples';

// Space
import { createBlackHoleLensing } from './space/black-hole-lensing';
import { createKeplerOrbits } from './space/kepler-orbits';
import { createGalaxySpiralDensity } from './space/galaxy-spiral-density';

// Experimental
import { createContinuousCellularAutomata } from './experimental/continuous-cellular-automata';
import { createJuliaMorph } from './experimental/julia-morph';

// Sea Creatures
import { createBioluminescentJellyfish } from './creatures/bioluminescent-jellyfish';
import { createMathematicalCrab } from './creatures/mathematical-crab';
import { createDeepSeaPrawn } from './creatures/deep-sea-prawn';
import { createMantaRayGlide } from './creatures/manta-ray-glide';
import { createNautilusSpiral } from './creatures/nautilus-spiral';

// Nature & Botany
import { createFractalTree } from './botany/fractal-tree';
import { createBarnsleyFern } from './botany/barnsley-fern';
import { createGerstnerOceanWaves } from './botany/gerstner-ocean-waves';
import { createCoralPolypGrowth } from './botany/coral-polyp-growth';
import { createSnowFall } from './botany/snow-fall';

// Human Anatomy & Biology
import { createCardiacPulse } from './anatomy/cardiac-pulse';
import { createNeuralSynapse } from './anatomy/neural-synapse';
import { createDNADoubleHelix } from './anatomy/dna-double-helix';
import { createRetinalIris } from './anatomy/retinal-iris';

export const algorithmRegistry: Record<string, AlgorithmFactory> = {
  // Organic
  'organic-wave': createOrganicWave,
  'phyllotaxis-spiral': createPhyllotaxisSpiral,
  'superformula-bloom': createSuperformulaBloom,
  'perlin-tendrils': createPerlinTendrils,

  // Fluid
  'vortex-filament': createVortexFilament,
  'curl-vector-field': createCurlVectorField,
  'smoke-lattice': createSmokeLattice,
  'viscous-gyre': createViscousGyre,
  'atmospheric-tornado': createAtmosphericTornado,
  'water-splash': createWaterSplash,
  'rain-effect': createRainEffect,

  // Particles
  'gravitational-swarm': createGravitationalSwarm,
  'lissajous-web': createLissajousWeb,
  'brownian-constellation': createBrownianConstellation,
  'boids-flocking': createBoidsFlocking,

  // Geometry
  'hyperbolic-tessellation': createHyperbolicTessellation,
  'sacred-mandala': createSacredMandala,
  'moire-interference': createMoireInterference,
  'penrose-subdivision': createPenroseSubdivision,
  'microscopic-ice-crystal': createMicroscopicIceCrystal,

  // Waves
  'fourier-harmonics': createFourierHarmonics,
  'standing-wave-grid': createStandingWaveGrid,
  'soliton-pulse': createSolitonPulse,
  'circular-ripples': createCircularRipples,

  // Space
  'black-hole-lensing': createBlackHoleLensing,
  'kepler-orbits': createKeplerOrbits,
  'galaxy-spiral-density': createGalaxySpiralDensity,

  // Experimental
  'continuous-cellular-automata': createContinuousCellularAutomata,
  'julia-morph': createJuliaMorph,

  // Sea Creatures
  'bioluminescent-jellyfish': createBioluminescentJellyfish,
  'mathematical-crab': createMathematicalCrab,
  'deep-sea-prawn': createDeepSeaPrawn,
  'manta-ray-glide': createMantaRayGlide,
  'nautilus-spiral': createNautilusSpiral,

  // Nature & Botany
  'fractal-tree': createFractalTree,
  'barnsley-fern': createBarnsleyFern,
  'gerstner-ocean-waves': createGerstnerOceanWaves,
  'coral-polyp-growth': createCoralPolypGrowth,
  'snow-fall': createSnowFall,

  // Human Anatomy & Biology
  'cardiac-pulse': createCardiacPulse,
  'neural-synapse': createNeuralSynapse,
  'dna-double-helix': createDNADoubleHelix,
  'retinal-iris': createRetinalIris,
};

export function getAlgorithmRenderer(key: string): ArtRenderer {
  const factory = algorithmRegistry[key];
  if (!factory) {
    console.warn(`Algorithm key "${key}" not found in registry, falling back to organic-wave`);
    return createOrganicWave();
  }
  return factory();
}
