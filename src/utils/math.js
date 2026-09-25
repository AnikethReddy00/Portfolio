/**
 * Utility math functions for smooth, frame-rate independent pointer-following mechanics.
 */

/**
 * Applies a smooth non-linear response curve to normalized cursor coordinates (-1 to 1).
 * Near center (0): softer sensitivity to prevent micro-jitters
 * Near edges (±1): progressively stronger engagement without hard thresholds or dead zones.
 * 
 * @param {number} val - Input value between -1 and 1
 * @param {number} exponent - Softness exponent (e.g. 1.25 to 1.5)
 * @returns {number} Shaped value between -1 and 1
 */
export function shapeCursorInput(val, exponent = 1.35) {
  const sign = Math.sign(val);
  const abs = Math.abs(val);
  // Smooth power curve preserving sign: sign * (abs^exponent)
  return sign * Math.pow(Math.min(1.0, abs), exponent);
}

/**
 * Critically damped exponential decay for frame-rate-independent smoothing.
 * Equivalent to THREE.MathUtils.damp, but self-contained and highly optimized.
 * 
 * @param {number} current - Current value
 * @param {number} target - Target value
 * @param {number} lambda - Damping speed (higher = faster response, typical 8-16)
 * @param {number} delta - Frame delta time in seconds
 * @returns {number} Interpolated value
 */
export function smoothDamp(current, target, lambda, delta) {
  // Cap delta to prevent extreme jumps if tab loses focus
  const clampedDelta = Math.min(delta, 0.1);
  return target + (current - target) * Math.exp(-lambda * clampedDelta);
}

/**
 * Clamp a number between min and max.
 */
export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/**
 * Convert degrees to radians.
 */
export function degToRad(degrees) {
  return (degrees * Math.PI) / 180;
}
