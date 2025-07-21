import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="mb-8">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground flex items-center gap-2 mb-6 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to Chat</span>
          </Link>

          <h1 className="text-3xl font-bold text-foreground mb-6">
            About AI Frontend Kit
          </h1>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-4">
              AI Frontend Kit is a modern, customizable chat interface built for
              AI applications. It provides a ready-to-use boilerplate for
              integrating various AI models, with a focus on Google&apos;s
              Gemini API.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">Purpose</h2>
            <p>
              This project aims to simplify the development of AI-powered chat
              interfaces by providing a clean, modular, and extensible
              foundation. It handles the complexities of streaming responses,
              thinking states, and UI interactions, allowing developers to focus
              on their specific use cases.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">Key Benefits</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Ready-to-use UI components</strong> - Beautiful,
                responsive chat interface with minimal setup
              </li>
              <li>
                <strong>AI model integration</strong> - Pre-configured for
                Google Gemini with easy extension to other providers
              </li>
              <li>
                <strong>Thinking model support</strong> - Real-time display of
                AI thinking process before final answers
              </li>
              <li>
                <strong>Centralized configuration</strong> - Easy customization
                through config files
              </li>
              <li>
                <strong>TypeScript support</strong> - Full type safety
                throughout the codebase
              </li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">Inspiration</h2>
            <p>
              This project draws inspiration from{" "}
              <a
                href="https://simple-ai.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                simple-ai.dev
              </a>{" "}
              and leverages the excellent{" "}
              <a
                href="https://ui.shadcn.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                shadcn/ui
              </a>{" "}
              component library to create a polished user experience.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
