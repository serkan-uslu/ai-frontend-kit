"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full px-6">
      {/* GitHub Link - Moved to footer */}
      <div className="flex justify-center border-b border-border/40 mb-2">
        <a
          href="https://github.com/serkan-uslu/ai-frontend-kit"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 p-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          title="View on GitHub"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-github"
          >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
          <span>View project on GitHub</span>
        </a>
      </div>
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
