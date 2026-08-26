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
  let cleanCompact = formulaCompact.replace(/Math\./g, '');
  cleanCompact = formatSqrt(cleanCompact);
  cleanCompact = cleanCompact
    .replace(/\*/g, ' \\cdot ')
    .replace(/sin\(/g, '\\sin(')
    .replace(/cos\(/g, '\\cos(')
    .replace(/exp\(/g, '\\exp(')
    .replace(/atan2\(([^,]+),([^)]+)\)/g, '\\operatorname{atan2}($1, $2)')
    .replace(/PI/g, '\\pi')
    .replace(/σ/g, '\\sigma')
    .replace(/ρ/g, '\\rho')
    .replace(/ω/g, '\\omega')
    .replace(/₀/g, '_0')
    .replace(/theta/gi, '\\theta')
    .replace(/rho/gi, '\\rho')
    .replace(/kappa/gi, '\\kappa')
    .replace(/dist\(/g, '\\operatorname{dist}(');

  // Parameter system definitions in LaTeX
  const paramEquations = parameters.slice(0, 4).map((p) => {
    const keySymbol = p.key.length === 1 ? p.key : `\\lambda_{${p.key}}`;
    return `${keySymbol} = ${p.defaultValue} \\quad \\text{(${p.label})}`;
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
