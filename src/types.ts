/**
 * Configuration options for the Trail renderer
 */
export interface TrailConfig {
  /** Maximum number of points in the position history buffer */
  maxPoints?: number

  /** Minimum time (ms) between adding new points to the buffer */
  minTimeBetweenPoints?: number

  /** Line width at the head of the trail */
  baseWidth?: number

  /** Line width at the tail of the trail */
  tailWidth?: number

  /** Alpha opacity at the head of the trail */
  baseAlpha?: number

  /** Alpha opacity at the tail of the trail */
  tailAlpha?: number

  /** Color of the trail (hex) */
  color?: number
}

/**
 * Internal point structure for position history
 */
export interface TrailPoint {
  x: number
  y: number
  timestamp: number
}
