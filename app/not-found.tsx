import Link from "next/link";
import { ARTIST_DATA } from "@/data/content";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0C0B0A] text-[#F5F4EF] px-6 text-center select-none">
      <p className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-4">
        ERROR 404 — UNEXPLORED REALM
      </p>
      <h1 className="font-serif italic text-6xl md:text-8xl tracking-tight text-white mb-6">
        Frame Missing
      </h1>
      <p className="font-sans text-neutral-400 max-w-md text-sm md:text-base leading-relaxed mb-8">
        The cinematic sequence you are seeking does not exist in this archive.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-700 hover:border-white text-xs font-mono uppercase tracking-wider text-neutral-300 hover:text-white transition-all duration-300"
      >
        <span>← RETURN TO ARCHIVE</span>
      </Link>
    </div>
  );
}
