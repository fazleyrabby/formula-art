# Formula Art — Generative Mathematical Art Studio

> A high-performance, zero-allocation generative art platform powered by pure mathematical formulas, Astro 5, HTML5 Canvas 2D, and an interactive Visual Studio.

[![Astro](https://img.shields.io/badge/Astro-5.3+-BC52EE.svg)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-3178C6.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4+-38BDF8.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-34D399.svg)](LICENSE)

---

## ✨ Features

- **38 Curated Mathematical Algorithms**: Spanning 10 disciplines (Sea Creatures, Botany & Nature, Human Anatomy, Organic, Fluid Dynamics, Particle Systems, Non-Euclidean Geometry, Wave Mechanics, Relativistic Astrophysics, and Experimental).
- **Interactive Visual Studio (`/playground`)**: Sculpt generative art in real time using draggable radial rotary knobs, micro-sliders, archetype selectors, and style toggles.
- **Zero-Allocation Canvas Engine**: Pre-allocated typed arrays (`Float32Array`) and primitive registers running smooth 60 FPS animations with zero garbage collection spikes.
- **Visibility & Power Management**: Two-tier lifecycle pausing offscreen canvases via `content-visibility: auto` and `IntersectionObserver` to keep idle CPU usage at 0%.
- **Live Parameter Controls**: Real-time micro-sliders on every artwork detail page modulating mathematical variables with zero frame drops.
- **Export & Embed Suite**: 4K PNG snapshot download, 5-second 60 FPS WebM video recording, and standalone iframe embed code generation.
- **Sandboxed Code Execution**: Zero-trust isolated runtime (`sandbox="allow-scripts"`, omitting `allow-same-origin`) communicating via typed `postMessage` protocol.
- **Universal Fuzzy Search (`Cmd+K`)**: Instant client-side search across titles, categories, LaTeX formulas, and tags.

---

## 🎨 Algorithm Catalog

| Category | Count | Algorithms |
| :--- | :--- | :--- |
| **Sea Creatures** | 5 | Bioluminescent Jellyfish, Mathematical Crab, Deep Sea Prawn, Manta Ray Glide, Nautilus Shell Spiral |
| **Botany & Nature** | 4 | L-System Fractal Tree, Barnsley Fern IFS, Gerstner Ocean Waves, Coral Polyp Growth |
| **Human Anatomy** | 4 | Cardiac Pulse & ECG, Neural Synaptic Network, DNA Double Helix, Retinal Iris Trabeculae |
| **Organic** | 4 | Organic Wave, Phyllotaxis Spiral, Superformula Bloom, Perlin Tendrils |
| **Fluid Dynamics** | 4 | Vortex Filament Drift, Curl Vector Field, Smoke Lattice, Viscous Gyre |
| **Particle Systems** | 4 | Gravitational Swarm, Lissajous Web, Brownian Constellation, Boids Emergence |
| **Geometry** | 4 | Hyperbolic Poincaré, Sacred Mandala, Moiré Interference, Penrose Subdivision |
| **Wave Mechanics** | 4 | Fourier Harmonics, Standing Wave Grid, Soliton Collision, Circular Ripples |
| **Space & Physics** | 3 | Black Hole Lensing, Keplerian Orbits, Spiral Galaxy Density |
| **Experimental** | 2 | Continuous Life Automata, Julia Morphism |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17.0 or higher
- pnpm, npm, or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/fazleyrabby/formula-art.git

# Navigate to the project directory
cd formula-art

# Install dependencies
pnpm install # or npm install
```

### Development Server
```bash
pnpm dev # or npm run dev
```
Open [http://localhost:4321](http://localhost:4321) in your browser.

### Production Build
```bash
pnpm build # or npm run build
pnpm preview # or npm run preview
```

---

## 📜 License

MIT License © 2026 [Formula Art](https://github.com/fazleyrabby/formula-art)
