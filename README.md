# phaser-trail-renderer

Smooth, tapering trail renderer for Phaser 3 game objects.

## Installation

```bash
npm install phaser-trail-renderer
# or
yarn add phaser-trail-renderer
```

## Usage

```typescript
import { Trail } from 'phaser-trail-renderer'

// In your scene
const trail = new Trail(this, {
  maxPoints: 10,
  minTimeBetweenPoints: 50,
  baseWidth: 4,
  tailWidth: 0.5,
  baseAlpha: 1.0,
  tailAlpha: 0.0,
  color: 0xff0000,
})

// In your game object's update method
trail.update(this.x, this.y, dt)
```

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

MIT
