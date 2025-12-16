import Phaser from 'phaser'
import type { TrailConfig, TrailPoint } from './types'

/**
 * Trail renderer that creates smooth, tapering trails behind moving objects
 */
export class Trail extends Phaser.GameObjects.Graphics {
  private config: Required<TrailConfig>
  private points: TrailPoint[] = []
  private timeSinceLastPoint: number = 0

  constructor(scene: Phaser.Scene, config: TrailConfig = {}) {
    super(scene)

    // Default configuration
    this.config = {
      maxPoints: config.maxPoints ?? 10,
      minTimeBetweenPoints: config.minTimeBetweenPoints ?? 50,
      baseWidth: config.baseWidth ?? 4,
      tailWidth: config.tailWidth ?? 0.5,
      baseAlpha: config.baseAlpha ?? 1.0,
      tailAlpha: config.tailAlpha ?? 0.0,
      color: config.color ?? 0xffffff,
    }

    scene.add.existing(this)
  }

  /**
   * Update the trail with the current position of the followed object
   * @param x Current x position
   * @param y Current y position
   * @param dt Delta time in milliseconds
   */
  public update(x: number, y: number, dt: number): void {
    // TODO: Implement trail update logic
    // - Add points to buffer based on time sampling
    // - Render trail with tapering
    // - Handle tail interpolation between samples
  }

  /**
   * Clear all trail points
   */
  public clearTrail(): void {
    this.points = []
    this.timeSinceLastPoint = 0
    this.clear()
  }

  /**
   * Destroy the trail and clean up resources
   */
  public destroy(fromScene?: boolean): void {
    this.clearTrail()
    super.destroy(fromScene)
  }
}
