/**
 * Procedurally generates a high-DPI tileable 3D LEGO stud pattern
 * and binds it to CSS custom property `--lego-stud-tile` on document.documentElement.
 */
export function injectProceduralLegoBaseplate(tileSizePx = 72) {
  if (typeof document === 'undefined') return '';

  const canvas = document.createElement('canvas');
  canvas.width = tileSizePx;
  canvas.height = tileSizePx;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const cx = tileSizePx / 2;
  const cy = tileSizePx / 2;
  const r = tileSizePx * 0.29; // Stud radius (matches 4.8mm stud on 8.0mm pitch)

  ctx.clearRect(0, 0, tileSizePx, tileSizePx);

  // 1. Subtle 1px tile grid seam for baseplate realism
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.045)';
  ctx.lineWidth = 1;
  ctx.strokeRect(0.5, 0.5, tileSizePx - 1, tileSizePx - 1);

  // 2. Directional 45-deg Bottom-Right Cast Shadow from Stud Cylinder
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx + r * 0.18, cy + r * 0.22, r * 1.02, 0, Math.PI * 2);
  const shadowGrad = ctx.createRadialGradient(
    cx + r * 0.2,
    cy + r * 0.24,
    r * 0.4,
    cx + r * 0.2,
    cy + r * 0.24,
    r * 1.25
  );
  shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0.22)');
  shadowGrad.addColorStop(0.65, 'rgba(0, 0, 0, 0.09)');
  shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = shadowGrad;
  ctx.fill();
  ctx.restore();

  // 3. Ambient Occlusion Crevice Ring at Base of Stud
  ctx.beginPath();
  ctx.arc(cx, cy, r + 1.2, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.14)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // 4. Cylindrical Stud Body Extrusion (Shaded Top-Left to Bottom-Right)
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  const bodyGrad = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
  bodyGrad.addColorStop(0, 'rgba(255, 255, 255, 0.42)');
  bodyGrad.addColorStop(0.45, 'rgba(255, 255, 255, 0.05)');
  bodyGrad.addColorStop(0.85, 'rgba(0, 0, 0, 0.12)');
  bodyGrad.addColorStop(1, 'rgba(0, 0, 0, 0.22)');
  ctx.fillStyle = bodyGrad;
  ctx.fill();

  // 5. Top Flat Face of Stud
  const topRadius = r * 0.86;
  ctx.beginPath();
  ctx.arc(cx - 0.5, cy - 0.8, topRadius, 0, Math.PI * 2);
  const topFaceGrad = ctx.createLinearGradient(
    cx - topRadius,
    cy - topRadius,
    cx + topRadius,
    cy + topRadius
  );
  topFaceGrad.addColorStop(0, 'rgba(255, 255, 255, 0.28)');
  topFaceGrad.addColorStop(0.6, 'rgba(255, 255, 255, 0.04)');
  topFaceGrad.addColorStop(1, 'rgba(0, 0, 0, 0.06)');
  ctx.fillStyle = topFaceGrad;
  ctx.fill();

  // 6. Specular Bevel Rim Highlight (Top-Left 45-deg Catchlight)
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.92, Math.PI * 0.85, Math.PI * 1.65);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.lineWidth = 1.6;
  ctx.lineCap = 'round';
  ctx.stroke();

  // 7. Bottom-Right Rim Counter-Shade
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.94, Math.PI * -0.15, Math.PI * 0.65);
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.18)';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // 8. Subtle Embossed "LEGO" Stamp Relief on Stud Cap
  ctx.save();
  ctx.translate(cx, cy - 0.5);
  ctx.font = `900 ${Math.max(6, Math.round(tileSizePx * 0.11))}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
  ctx.fillText('LEGO', -0.4, -0.4);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.11)';
  ctx.fillText('LEGO', 0.4, 0.4);
  ctx.restore();

  const dataUrl = canvas.toDataURL('image/png');
  document.documentElement.style.setProperty('--lego-stud-tile', `url("${dataUrl}")`);
  document.documentElement.style.setProperty('--lego-stud-size', `${tileSizePx / 2}px`);
  return dataUrl;
}
