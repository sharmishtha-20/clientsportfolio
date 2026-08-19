export interface ArtistConfig {
  name: string;
  role: string;
  tagline: string;
  location: string;
  year: string;
  email: string;
  drive: string;
  socials: {
    instagram: string;
    linkedin: string;
    behance: string;
    x: string;
  };
}

export interface NavItem {
  label: string;
  href: string;
  number: string;
}

export interface PracticeItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  media: {
    type: "video" | "image";
    src: string;
    poster: string;
  };
  details: string[];
}

export const ARTIST_DATA: ArtistConfig = {
  name: "NSR",
  role: "AI FILMMAKER & VISUAL ARTIST",
  tagline: "The machine can generate the image. The imagination still belongs to the human.",
  location: "CHANDIGARH / DEHRADUN",
  year: "2026",
  email: "nsraicreator@gmail.com",
  drive: "https://drive.google.com/drive/folders/15lMitaO6g6YG80Sfic0nzpfRuymVy9pA",
  socials: {
    instagram: "https://www.instagram.com/nsr.exz?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==",
    behance: "https://www.behance.net/nishchasinghr",
    linkedin: "",
    x: ""
  },
};

export const NAV_ITEMS: NavItem[] = [
  { label: "MIND", href: "#mind", number: "01" },
  { label: "MOVING ARCHIVE", href: "#practice", number: "02" },
  { label: "STILL ARCHIVE", href: "#archive", number: "03" },
  { label: "REALITY", href: "#reality", number: "04" },
  { label: "CONTACT", href: "#contact", number: "05" },
];

export const HERO_CONTENT = {
  subtitle: "AI FILMMAKER / GENERATIVE ARTIST",
  headline: "DIRECTING THE UNSEEN",
  description: "Crafting speculative worlds, cinematic narratives, and hyper-real visual universes at the frontier of human imagination and neural networks.",
  media: {
    videoSrc: "/media/hero/hero_video.mp4",
    fallbackImage: "/media/hero/hero_cinematic.jpg",
    posterImage: "/media/hero/hero_poster.jpg",
  },
  scrollPrompt: "SCROLL TO ENTER",
};

export interface MindConfig {
  sectionNumber: string;
  sectionTitle: string;
  statementLines: string[];
  bio: string[];
  portrait: {
    src: string;
    alt: string;
    caption: string;
  };
}

export const MIND_CONTENT: MindConfig = {
  sectionNumber: "01",
  sectionTitle: "THE MIND BEHIND THE MACHINE",
  statementLines: [
    "I DON'T USE AI",
    "TO REPLACE",
    "IMAGINATION.",
    "I USE IT",
    "TO EXPAND IT.",
  ],
  bio: [
    "Working at the frontier of generative synthesis and cinematic storytelling, I direct neural networks rather than merely prompting them. Every frame is treated as an editorial canvas where algorithmic serendipity meets deliberate human intent.",
    "From speculative world-building and narrative cinema to high-concept fashion visuals, my practice explores what happens when artificial intelligence is stripped of its gimmicks and elevated into a medium of pure aesthetic expression.",
  ],
  portrait: {
    src: "/media/portraits/ai_portrait.jpg",
    alt: "AI Generated Portrait of NSR",
    caption: "SYNTHETIC DIRECTORIAL PERSONA // 2026",
  },
};

/**
 * MOVING ARCHIVE (PRACTICE ITEMS)
 * -------------------------------------------------------------
 * Sequences ordered exactly 01 -> 02 -> 03 -> 04.
 */
export const PRACTICE_ITEMS: PracticeItem[] = [
  {
    id: "sequence-01",
    title: "SPECULATIVE CINEMA",
    subtitle: "AI DIRECTED FILM // 01",
    description: "Photorealistic sci-fi cinematography and temporal coherence direct from multi-model neural pipelines.",
    media: {
      type: "video",
      src: "/media/practice/01.mp4",
      poster: "/media/practice/film.jpg",
    },
    details: ["Temporal Coherence", "4K Neural Diffusion", "Cinematic Grain"],
  },
  {
    id: "sequence-02",
    title: "KINETIC EDITORIAL",
    subtitle: "HAUTE AVANT-GARDE // 02",
    description: "High-concept fashion motion exploring fluid textile dynamics and medium-format synthetic optics.",
    media: {
      type: "video",
      src: "/media/practice/02.mp4",
      poster: "/media/practice/generative.jpg",
    },
    details: ["Fluid Dynamics", "Hasselblad Optics", "Subsurface Materiality"],
  },
  {
    id: "sequence-03",
    title: "MONUMENTAL WORLDS",
    subtitle: "SPATIAL ARCHITECTURE // 03",
    description: "Immersive architectural scale, volumetric light, and brutalist hallucinations that defy physical constraints.",
    media: {
      type: "video",
      src: "/media/practice/03.mp4",
      poster: "/media/practice/direction.jpg",
    },
    details: ["Volumetric Fog", "Monolithic Scale", "Atmospheric Depth"],
  },
  {
    id: "sequence-04",
    title: "VISIONARY REALMS",
    subtitle: "SYNTHETIC NARRATIVE // 04",
    description: "Unseen speculative horizons crafted at the bleeding edge of human imagination and neural generation.",
    media: {
      type: "video",
      src: "/media/practice/04.mp4",
      poster: "/media/practice/art.jpg",
    },
    details: ["Neural Rendering", "Dynamic Atmosphere", "Original Score"],
  },
];

export const REALITY_CONTENT = {
  sectionNumber: "04",
  opening: "EVERYTHING YOU'VE SEEN WAS CREATED.",
  fragments: ["THE WORLDS.", "THE FACES.", "THE FILMS.", "THE IMPOSSIBLE."],
  aiPortraitText: "EVEN THIS.",
  revealText: "BUT THIS IS REAL.",
  philosophy: {
    line1: "AI CAN GENERATE THE IMAGE.",
    line2: "THE IMAGINATION",
    line3: "STILL BELONGS TO THE HUMAN.",
  },
  aiImage: "/media/reality/ai_portrait.jpg",
  realImage: "/media/reality/real_portrait.jpg",
};

export const CTA_CONTENT = {
  headlineTop: "MAKE SOMETHING",
  headlineBottom: "THAT DOESN'T EXIST YET.",
  subheading: "Have a film, campaign, or visual world in mind?",
  action: "LET'S BUILD IT.",
};
