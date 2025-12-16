import Phaser from 'phaser'
import type { TrailConfig, TrailPoint } from './types'

/**
 * Trail renderer that creates smooth, tapering trails behind moving objects
 */
export class Trail extends Phaser.GameObjects.Graphics {
  private config: Required<TrailConfig>
  private points: TrailPoint[] = []
  private nextCreationTime: number = 0

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
   * @param t Processing time in milliseconds
   */
  public update(x: number, y: number, t: number): void {
    if (this.nextCreationTime <= t) {
      this.nextCreationTime = t + this.config.minTimeBetweenPoints

      // TODO: consider circular indexing for perf.
      if (this.points.length >= this.config.maxPoints) {
        this.points.shift()
      }

      this.points.push({
        x, y, timestamp: t
      })
    }

    this.clear()

    if (this.points.length < 2) {
      return
    }

    for (let i = 0; i < this.points.length - 1; i++) {
      const p1 = this.points[i]
      const p2 = this.points[i + 1]

      const t = i / (this.points.length - 1)

      const width = Phaser.Math.Linear(this.config.tailWidth, this.config.baseWidth, t)
      const alpha = Phaser.Math.Linear(this.config.tailAlpha, this.config.baseAlpha, t)

      this.lineStyle(width, this.config.color, alpha)
      this.lineBetween(p1.x, p1.y, p2.x, p2.y)
    }
    // TODO: Implement trail update logic
    // - Handle tail interpolation between samples
  }

  /**
   * Clear all trail points
   */
  public clearTrail(): void {
    this.points = []
    this.nextCreationTime = 0
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
