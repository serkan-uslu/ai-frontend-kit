"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full py-4 px-6 border-t border-border/40 mt-6">
      <div className="flex justify-center items-center gap-6 text-sm text-muted-foreground">
        <Link href="/about" className="hover:text-foreground transition-colors">
          About
        </Link>
        <Link
          href="/features"
          className="hover:text-foreground transition-colors"
        >
          Features
        </Link>
        <Link
          href="/roadmap"
          className="hover:text-foreground transition-colors"
        >
          Roadmap
        </Link>
        <Link
          href="/tech-stack"
          className="hover:text-foreground transition-colors"
        >
          Tech Stack
        </Link>
      </div>
    </footer>
  );
}
