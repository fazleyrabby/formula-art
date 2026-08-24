// High-performance zero-allocation 3D perspective projection helpers

export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export interface ProjectedPoint {
  x: number;
  y: number;
  scale: number;
  depth: number; // 0 (far) to 1 (near)
}

// Rotates and projects a 3D point onto a 2D screen with perspective
export function project3D(
  x: number,
  y: number,
  z: number,
  rotX: number,
  rotY: number,
  rotZ: number,
  cx: number,
  cy: number,
  fov: number = 450,
  cameraDist: number = 500
): ProjectedPoint {
  // 1. Yaw (Y-axis rotation)
  const cosY = Math.cos(rotY);
  const sinY = Math.sin(rotY);
  const x1 = x * cosY + z * sinY;
  const z1 = -x * sinY + z * cosY;

  // 2. Pitch (X-axis rotation)
  const cosX = Math.cos(rotX);
  const sinX = Math.sin(rotX);
  const y2 = y * cosX - z1 * sinX;
  const z2 = y * sinX + z1 * cosX;

  // 3. Roll (Z-axis rotation)
  const cosZ = Math.cos(rotZ);
  const sinZ = Math.sin(rotZ);
  const x3 = x1 * cosZ - y2 * sinZ;
  const y3 = x1 * sinZ + y2 * cosZ;
  const z3 = z2;

  // 4. Perspective Division
  const distance = z3 + cameraDist;
  const scale = distance > 10 ? fov / distance : 0.01;
  const screenX = cx + x3 * scale;
  const screenY = cy + y3 * scale;

  // Normalized depth factor for fog / opacity (clamped 0 to 1)
  const depth = Math.max(0.1, Math.min(1.0, (z3 + cameraDist * 0.6) / (cameraDist * 1.2)));

  return {
    x: screenX,
    y: screenY,
    scale,
    depth,
  };
}
