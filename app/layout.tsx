import type { Metadata, Viewport } from "next";
import { Geist, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { ARTIST_DATA } from "@/data/content";
import SmoothScrollProvider from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import GrainOverlay from "@/components/ui/GrainOverlay";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const cormorantSerif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#F5F4EF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://nsrfilms.com"),
  title: `${ARTIST_DATA.name} — ${ARTIST_DATA.role}`,
  description: `${ARTIST_DATA.tagline} Speculative cinema, generative imagery, and visual direction.`,
  keywords: [
    "AI Filmmaker",
    "Generative Artist",
    "Visual Director",
    "Art Direction",
    "Cinematography",
    "Neural Aesthetics",
    "Speculative Fiction",
  ],
  authors: [{ name: ARTIST_DATA.name }],
  creator: ARTIST_DATA.name,
  openGraph: {
    title: `${ARTIST_DATA.name} — ${ARTIST_DATA.role}`,
    description: ARTIST_DATA.tagline,
    url: "https://nsrfilms.com",
    siteName: `${ARTIST_DATA.name} Portfolio`,
    images: [
      {
        url: "/media/hero/hero_cinematic.jpg",
        width: 1920,
        height: 1080,
        alt: `${ARTIST_DATA.name} Cinematic Universe`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${ARTIST_DATA.name} — ${ARTIST_DATA.role}`,
    description: ARTIST_DATA.tagline,
    images: ["/media/hero/hero_cinematic.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${cormorantSerif.variable} antialiased selection:bg-neutral-900 selection:text-neutral-50`}
    >
      <body className="min-h-screen bg-[#F5F4EF] text-[#111111] font-sans overflow-x-hidden selection:bg-[#111111] selection:text-[#F5F4EF]">
        <GrainOverlay />
        <CustomCursor />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
