# Formula Art — Generative Mathematical Art Studio

> A high-performance, zero-allocation generative art platform powered by pure mathematical formulas, Astro 5, HTML5 Canvas 2D, and an interactive Visual Studio.

[![Astro](https://img.shields.io/badge/Astro-5.3+-BC52EE.svg)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-3178C6.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4+-38BDF8.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-34D399.svg)](LICENSE)

---

## ✨ Features

- **61 Curated Mathematical Algorithms**: Featuring a deep-sea collection of 17 underwater/abyssal creatures, physics & mathematical study visualizations, fluid mechanics, weather systems, human biology, fractal geometry, and astrophysics.
- **Interactive Visual Studio (`/playground`)**: Sculpt generative art in real time using draggable radial rotary knobs, micro-sliders, archetype selectors, and style toggles.
- **Zero-Allocation Canvas Engine**: Pre-allocated typed arrays (`Float32Array`) and primitive registers running smooth 60 FPS animations with zero garbage collection spikes.
- **Visibility & Power Management**: Two-tier lifecycle pausing offscreen canvases via `content-visibility: auto` and `IntersectionObserver` to keep idle CPU usage at 0%.
- **Live Parameter Controls**: Real-time micro-sliders on every artwork detail page modulating mathematical variables with zero frame drops.
- **Export & Embed Suite**: 4K PNG snapshot download, 5-second 60 FPS WebM video recording, and standalone iframe embed code generation.
- **Sandboxed Code Execution**: Zero-trust isolated runtime (`sandbox="allow-scripts"`, omitting `allow-same-origin`) communicating via typed `postMessage` protocol.
- **Universal Fuzzy Search (`Cmd+K`)**: Instant client-side search across titles, categories, LaTeX formulas, and tags.

---

## 🎨 Algorithm Catalog (61 Production Artworks)

| Category | Count | Algorithms |
| :--- | :--- | :--- |
| **Sea & Deep-Sea Creatures** | 17 | Deep Sea Anglerfish, Giant Praya Siphonophore, Bioluminescent Comb Jelly, Vampire Squid from Hell, Dumbo Octopus Flight, Gulper Pelican Eel, Pacific Barreleye Fish, Pelagic Sea Angel, Abyssal Tripod Fish, Japanese Giant Spider Crab, Leafy Sea Dragon, Great Hammerhead Shark, Bioluminescent Jellyfish, Mathematical Crab, Deep Sea Prawn, Manta Ray Glide, Nautilus Shell Spiral |
| **Fluid & Weather Dynamics** | 7 | Atmospheric Tornado, Worthington Water Splash, Rainstorm Precipitation, Vortex Filament Drift, Curl Vector Field, Smoke Lattice, Viscous Gyre |
| **Physics & Mathematics Study** | 6 | Quantum Hydrogen Orbital, Lorenz Strange Attractor, Double Pendulum Chaos, Fourier Epicycles Transform, Maxwell's EM Wave Propagation, Spacetime Curvature & Geodesics |
| **Botany & Nature** | 5 | Atmospheric Snowfall, L-System Fractal Tree, Barnsley Fern IFS, Gerstner Ocean Waves, Coral Polyp Growth |
| **Non-Euclidean Geometry & Crystals** | 5 | Microscopic Snowflake Crystal, Hyperbolic Poincaré, Sacred Mandala, Moiré Interference, Penrose Subdivision |
| **Human Anatomy & Biology** | 4 | Cardiac Pulse & ECG, Neural Synaptic Network, DNA Double Helix, Retinal Iris Trabeculae |
| **Organic Harmonics** | 4 | Organic Wave, Phyllotaxis Spiral, Superformula Bloom, Perlin Tendrils |
| **Particle Systems** | 4 | Gravitational Swarm, Lissajous Web, Brownian Constellation, Boids Emergence |
| **Wave Mechanics** | 4 | Fourier Harmonics, Standing Wave Grid, Soliton Collision, Circular Ripples |
| **Space & Relativistic Astrophysics** | 3 | Black Hole Lensing, Keplerian Orbits, Spiral Galaxy Density |
| **Experimental Automata** | 2 | Continuous Life Automata, Julia Morphism |

---

## 🚀 Getting Started

### Installation
```bash
git clone https://github.com/fazleyrabby/formula-art.git
cd formula-art
pnpm install
```

### Development Server
```bash
pnpm dev
```
Open [http://localhost:4321](http://localhost:4321) in your browser.

### Production Build
```bash
pnpm build
```

---

## 📜 License

MIT License © 2026 [Formula Art](https://github.com/fazleyrabby/formula-art)
