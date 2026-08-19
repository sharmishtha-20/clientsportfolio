# 3D / WebGL Extensibility Architecture

This directory is reserved for future Three.js, React Three Fiber (R3F), Drei, and custom GLSL shader experiences.

## Architecture Guidelines
- **Modularity**: Any 3D scenes should be dynamically loaded with `next/dynamic` (`ssr: false`) to avoid blocking initial server rendering or inflating main bundle size.
- **Graceful Degradation**: Always provide CSS/Canvas/Poster fallbacks for low-powered mobile devices or when `prefers-reduced-motion` is active.
- **Performance**:
  - Limit particle counts and render loop calculations.
  - Pause RAF loop when canvas is off-screen using IntersectionObserver.
  - Dispose geometries, materials, and textures on component unmount.

## Future Potential Components
- `HeroScene.tsx` — Subtle ambient 3D camera drift over generative terrain or floating monolith.
- `ShaderTransition.tsx` — Custom WebGL displacement dissolve for AI vs. Real image transitions.
- `ParticleField.tsx` — Interactive neural constellation.
