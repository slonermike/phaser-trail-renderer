# phaser-trail-renderer

Tapering trail renderer for Phaser 3 game objects. Creates motion trails similar to Unity's TrailRenderer component.

## Features

- ✨ Tapering trails with configurable width and alpha fade
- ⏱️ Time-based point sampling (efficient, no per-frame overhead)
- 🔄 Object pooling support for high-performance games
- 🎨 Fully configurable appearance (color, width, opacity, length)
- 📦 TypeScript definitions included

**Note:** Tail interpolation for ultra-smooth trails is planned but not yet implemented. Current implementation samples at fixed intervals.

## Installation

```bash
npm install phaser-trail-renderer
# or
yarn add phaser-trail-renderer
```

## Quick Start

```typescript
import { Trail } from 'phaser-trail-renderer'

// In your scene
const trail = new Trail(this, {
  color: 0xff0000,
  baseWidth: 4,
  tailWidth: 0.5,
})

// In your game object's update method
update(time: number, delta: number) {
  trail.update(this.x, this.y, time)
}
```

## Usage with Object Pooling

For pooled objects like projectiles or particles, create the trail once and reuse it:

```typescript
class Projectile extends Phaser.GameObjects.Sprite {
  private trail: Trail

  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0, 'bullet')

    // Create trail once in constructor
    this.trail = new Trail(scene, {
      color: 0x00ffff,
      baseWidth: 3,
      tailWidth: 0.5,
      maxPoints: 15,
      minTimeBetweenPoints: 30,
    })
  }

  spawn(x: number, y: number) {
    this.setPosition(x, y)
    this.setActive(true)

    // Clear previous trail data
    this.trail.clearTrail()
    this.trail.setVisible(true)
  }

  update(time: number, delta: number) {
    // Update trail with current position and scene time
    this.trail.update(this.x, this.y, time)
  }

  despawn() {
    this.setActive(false)

    // Hide trail but don't destroy (for pooling)
    this.trail.setVisible(false)
  }
}
```

## Configuration

All configuration options and their defaults:

```typescript
interface TrailConfig {
  /** Maximum number of points in the trail buffer (default: 10) */
  maxPoints?: number

  /** Minimum milliseconds between point samples (default: 50) */
  minTimeBetweenPoints?: number

  /** Line width at the head (newest point) of the trail (default: 4) */
  baseWidth?: number

  /** Line width at the tail (oldest point) of the trail (default: 0.5) */
  tailWidth?: number

  /** Alpha opacity at the head of the trail (default: 1.0) */
  baseAlpha?: number

  /** Alpha opacity at the tail of the trail (default: 0.0) */
  tailAlpha?: number

  /** Color of the trail in hex format (default: 0xffffff) */
  color?: number
}
```

### Visual Explanation

- **Head** (newest point): Uses `baseWidth` and `baseAlpha`
- **Tail** (oldest point): Uses `tailWidth` and `tailAlpha`
- Points in between are interpolated linearly

## API Reference

### `new Trail(scene, config?)`

Creates a new trail renderer.

**Parameters:**
- `scene: Phaser.Scene` - The scene this trail belongs to
- `config?: TrailConfig` - Optional configuration object

### `trail.update(x, y, time)`

Updates the trail with the current position.

**Parameters:**
- `x: number` - Current x position
- `y: number` - Current y position
- `time: number` - Current scene time in milliseconds (from Phaser's update loop)

**Note:** Use `time` from Phaser's `update(time, delta)` method, not `delta`.

### `trail.clearTrail()`

Clears all trail points and resets the internal state. Useful when respawning pooled objects.

### `trail.destroy(fromScene?)`

Destroys the trail and cleans up resources. Only call this when permanently removing the trail.

## Roadmap

- [ ] Tail interpolation between sample points for smoother appearance
- [ ] Gradient color support (color shifts along trail)
- [ ] Texture support for trails
- [ ] Curve smoothing options (Catmull-Rom splines, Bezier curves)
- [ ] Per-segment callbacks for custom effects

## Development

```bash
# Install dependencies
yarn install

# Build the library
yarn build

# Watch mode for development
yarn dev
```

## License

MIT © [Mike Slone](https://slone.tech)
