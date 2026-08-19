export interface StillArchiveItem {
  id: string;
  number: string;
  title: string;
  tag: string;
  category: string;
  year: string;
  src: string;
  aspectRatio: "3/4" | "16/9" | "4/5" | "1/1";
  elevation: number;
  rotation: number;
  description: string;
  medium: string;
  details?: string[];
}

export const STILL_ARCHIVE_ITEMS: StillArchiveItem[] = [
  {
    id: "still-01",
    number: "01",
    title: "DARK BLOOM",
    tag: "SUSPENSION",
    category: "SYNTHETIC BOTANY",
    year: "2026",
    src: "/media/archive/dark_bloom.jpg",
    aspectRatio: "3/4",
    elevation: -22,
    rotation: -2.5,
    description: "Bioluminescent organic flora in zero-gravity vacuum.",
    medium: "Diffusion Synthetics // Hasselblad 100c",
    details: ["Organic Volumetrics", "Synthetic Textures"],
  },
  {
    id: "still-02",
    number: "02",
    title: "FRACTURE MONUMENT",
    tag: "FRACTURE",
    category: "SPATIAL GEOMETRY",
    year: "2026",
    src: "/media/archive/suspension.jpg",
    aspectRatio: "3/4",
    elevation: 28,
    rotation: 3,
    description: "Multi-faceted chrome polyhedron suspended in a brutalist atrium.",
    medium: "Volumetric Architecture",
    details: ["Brutalist Atrium", "Raytraced Chrome"],
  },
  {
    id: "still-03",
    number: "03",
    title: "NEURAL GENESIS",
    tag: "CONSTELLATION",
    category: "HAUTE AVANT-GARDE",
    year: "2026",
    src: "/media/archive/neural.jpg",
    aspectRatio: "3/4",
    elevation: -14,
    rotation: -1.6,
    description: "High-editorial fashion exploring synthetic fluid biomaterials.",
    medium: "Bespoke Model LoRA // 80mm Glass",
    details: ["Liquid Textile", "Haute Couture"],
  },
  {
    id: "still-04",
    number: "04",
    title: "THE LAST MONOLITH",
    tag: "TEMPORAL VOID",
    category: "SPECULATIVE CINEMA",
    year: "2026",
    src: "/media/archive/monolith.jpg",
    aspectRatio: "3/4",
    elevation: 24,
    rotation: 2.2,
    description: "Extinct synthetic civilization relic on volcanic alien geology.",
    medium: "Diffusion Keyframe",
    details: ["Extinct Relic", "Cinematic Grain"],
  },
  {
    id: "still-05",
    number: "05",
    title: "SOLITARY ORBIT",
    tag: "CHRONO DRIFT",
    category: "ORBITAL SYSTEMS",
    year: "2025",
    src: "/media/archive/solitary.jpg",
    aspectRatio: "3/4",
    elevation: -26,
    rotation: -2.8,
    description: "Zero-gravity centrifuge world-building in deep planetary orbit.",
    medium: "Hard Sci-Fi Photorealism",
    details: ["Zero-G Station", "Atmospheric Giant"],
  },
  {
    id: "still-06",
    number: "06",
    title: "KINETIC VOID",
    tag: "EQUILIBRIUM",
    category: "ART INSTALLATION",
    year: "2025",
    src: "/media/archive/surreal.jpg",
    aspectRatio: "3/4",
    elevation: 16,
    rotation: 1.8,
    description: "Floating mirror sphere deforming under atmospheric currents.",
    medium: "Flux.1 Synthetics",
    details: ["Mirror Specularity", "Monolithic Scale"],
  },
];
