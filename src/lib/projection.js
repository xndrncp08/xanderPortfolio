// Just enough 3D for two canvases: a perspective projection and a closed
// Catmull-Rom spline. No library — it's twenty lines of trigonometry.

// Rotates [x, y, z] by yaw (around y) then pitch (around x), and projects it
// with the camera `dist` units back. Returns [screenX, screenY, depth].
export function project([x, y, z], { yaw, pitch, dist, scale, cx, cy }) {
  const cosY = Math.cos(yaw), sinY = Math.sin(yaw);
  const x1 = x * cosY - z * sinY;
  const z1 = x * sinY + z * cosY;
  const cosP = Math.cos(pitch), sinP = Math.sin(pitch);
  const y2 = y * cosP - z1 * sinP;
  const z2 = y * sinP + z1 * cosP;
  const f = dist / (dist + z2);
  return [cx + x1 * f * scale, cy - y2 * f * scale, z2];
}

// Samples a closed loop through `points` ([x, z] pairs) into `n` evenly spaced
// (by parameter) [x, z] points.
export function sampleLoop(points, n) {
  const out = [];
  const m = points.length;
  for (let i = 0; i < n; i++) {
    const t = (i / n) * m;
    const k = Math.floor(t);
    const u = t - k;
    const [p0, p1, p2, p3] = [-1, 0, 1, 2].map((o) => points[(k + o + m) % m]);
    const c = (a, b, cc, d) =>
      0.5 * (2 * b + (-a + cc) * u + (2 * a - 5 * b + 4 * cc - d) * u * u + (-a + 3 * b - 3 * cc + d) * u * u * u);
    out.push([c(p0[0], p1[0], p2[0], p3[0]), c(p0[1], p1[1], p2[1], p3[1])]);
  }
  return out;
}
