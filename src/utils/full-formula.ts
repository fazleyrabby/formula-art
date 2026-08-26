import type { ArtworkData } from '../types/artwork';

/**
 * Generates a full multi-part mathematical system in LaTeX
 * for display on the interactive Fullscreen Whiteboard / Chalkboard.
 */
function formatSqrt(str: string): string {
  let res = str;
  let idx = 0;
  while ((idx = res.indexOf('sqrt(', idx)) !== -1) {
    let openCount = 1;
    let i = idx + 5;
    while (i < res.length && openCount > 0) {
      if (res[i] === '(') openCount++;
      else if (res[i] === ')') openCount--;
      i++;
    }
    if (openCount === 0) {
      res = res.substring(0, idx) + '\\sqrt{' + res.substring(idx + 5, i - 1) + '}' + res.substring(i);
    } else {
      idx += 5;
    }
  }
  return res;
}

export function getFullMathematicalSystem(artwork: ArtworkData): string {
  const { mathNotation, formulaCompact, parameters = [] } = artwork;

  // Format compact formula into clean LaTeX representation
  let cleanCompact = (formulaCompact || '').replace(/Math\./g, '');
  cleanCompact = formatSqrt(cleanCompact);
  cleanCompact = cleanCompact
    .replace(/\*/g, ' \\cdot ')
    .replace(/·/g, ' \\cdot ')
    .replace(/²/g, '^2')
    .replace(/³/g, '^3')
    .replace(/Σ/g, '\\sum ')
    .replace(/Δ/g, '\\Delta ')
    .replace(/Ω/g, '\\Omega ')
    .replace(/Γ/g, '\\Gamma ')
    .replace(/π/g, '\\pi ')
    .replace(/√/g, '\\sqrt ')
    .replace(/sin\(/g, '\\sin(')
    .replace(/cos\(/g, '\\cos(')
    .replace(/exp\(/g, '\\exp(')
    .replace(/atan2\(([^,]+),([^)]+)\)/g, '\\operatorname{atan2}($1, $2)')
    .replace(/PI/g, '\\pi ')
    .replace(/_θ/g, '_{\\theta}')
    .replace(/_σ/g, '_{\\sigma}')
    .replace(/_ρ/g, '_{\\rho}')
    .replace(/_ω/g, '_{\\omega}')
    .replace(/_theta/g, '_{\\theta}')
    .replace(/_rho/g, '_{\\rho}')
    .replace(/_phi/g, '_{\\phi}')
    .replace(/_psi/g, '_{\\psi}')
    .replace(/_funnel/g, '_{\\text{funnel}}')
    .replace(/_core/g, '_{\\text{core}}')
    .replace(/_arm_dendrite/g, '_{\\text{arm, dendrite}}')
    .replace(/σ/g, '\\sigma ')
    .replace(/ρ/g, '\\rho ')
    .replace(/ω/g, '\\omega ')
    .replace(/θ/g, '\\theta ')
    .replace(/₀/g, '_0')
    .replace(/₁/g, '_1')
    .replace(/₂/g, '_2')
    .replace(/\btheta\b/gi, '\\theta ')
    .replace(/\brho\b/gi, '\\rho ')
    .replace(/\bkappa\b/gi, '\\kappa ')
    .replace(/dist\(/g, '\\operatorname{dist}(');

  // Parameter system definitions in LaTeX
  const paramEquations = parameters.slice(0, 4).map((p) => {
    const keySymbol = p.key.length === 1 ? p.key : `\\lambda_{${p.key}}`;
    const cleanLabel = (p.label || '').replace(/&/g, '\\&');
    return `${keySymbol} = ${p.defaultValue} \\quad \\text{(${cleanLabel})}`;
  });

  const paramBlock = paramEquations.length > 0
    ? `\n\\\\[6pt] \\text{[Parameter State]} \\quad & ${paramEquations.join(', \\; ')}`
    : '';

  // Return a comprehensive, beautifully structured LaTeX mathematical system
  return `\\begin{aligned}
\\text{[Governing Law]} \\quad & ${mathNotation} \\\\[8pt]
\\text{[Discrete Progression]} \\quad & ${cleanCompact} \\\\[8pt]
\\text{[Domain \\& Space]} \\quad & \\mathbf{x} \\in \\mathbb{R}^2, \\quad t \\in \\mathbb{R}^+, \\quad \\omega \\in [0, 2\\pi] ${paramBlock}
\\end{aligned}`;
}
