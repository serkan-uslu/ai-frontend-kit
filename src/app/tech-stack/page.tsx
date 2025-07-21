import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TechStackPage() {
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
            Tech Stack
          </h1>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-6">
              AI Frontend Kit is built with modern technologies to provide a
              robust, scalable foundation for AI chat applications.
            </p>

            <div className="space-y-8">
              {/* Frontend */}
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Frontend Framework
                </h2>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-border/40">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h3 className="font-medium mb-2">Next.js</h3>
                      <p className="text-sm text-muted-foreground">
                        React framework with server-side rendering, routing, and
                        optimizations
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">React</h3>
                      <p className="text-sm text-muted-foreground">
                        Component-based UI library for building interactive
                        interfaces
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">TypeScript</h3>
                      <p className="text-sm text-muted-foreground">
                        Strongly typed programming language that builds on
                        JavaScript
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Tailwind CSS</h3>
                      <p className="text-sm text-muted-foreground">
                        Utility-first CSS framework for rapid UI development
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* UI Components */}
              <div>
                <h2 className="text-xl font-semibold mb-4">UI Components</h2>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-border/40">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h3 className="font-medium mb-2">shadcn/ui</h3>
                      <p className="text-sm text-muted-foreground">
                        Beautifully designed components built with Radix UI and
                        Tailwind CSS
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Lucide Icons</h3>
                      <p className="text-sm text-muted-foreground">
                        Beautiful & consistent icon set with React components
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">React Markdown</h3>
                      <p className="text-sm text-muted-foreground">
                        Markdown rendering for chat messages with code
                        highlighting
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Integration */}
              <div>
                <h2 className="text-xl font-semibold mb-4">AI Integration</h2>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-border/40">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h3 className="font-medium mb-2">Google Gemini API</h3>
                      <p className="text-sm text-muted-foreground">
                        Integration with Google&apos;s Gemini models for text
                        generation
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Streaming Responses</h3>
                      <p className="text-sm text-muted-foreground">
                        Real-time streaming of AI responses for better user
                        experience
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Thinking Model</h3>
                      <p className="text-sm text-muted-foreground">
                        Support for displaying AI thinking process before final
                        answers
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Provider Abstraction</h3>
                      <p className="text-sm text-muted-foreground">
                        Modular architecture for easy integration of additional
                        AI providers
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Architecture */}
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Architecture & Principles
                </h2>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-border/40">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h3 className="font-medium mb-2">SOLID Principles</h3>
                      <p className="text-sm text-muted-foreground">
                        Design principles for maintainable and extensible code
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Atomic UI Design</h3>
                      <p className="text-sm text-muted-foreground">
                        Component-based design system for consistent UI
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">
                        Centralized Configuration
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Dedicated config files for easy customization
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Error Handling</h3>
                      <p className="text-sm text-muted-foreground">
                        Robust error handling throughout the application
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Development Tools */}
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Development Tools
                </h2>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-border/40">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h3 className="font-medium mb-2">ESLint</h3>
                      <p className="text-sm text-muted-foreground">
                        Static code analysis tool for identifying problematic
                        patterns in JavaScript/TypeScript code
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Prettier</h3>
                      <p className="text-sm text-muted-foreground">
                        Code formatter that enforces a consistent style across
                        the codebase
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Husky</h3>
                      <p className="text-sm text-muted-foreground">
                        Git hooks tool for running scripts before commits and
                        pushes
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">commitlint</h3>
                      <p className="text-sm text-muted-foreground">
                        Lints commit messages to ensure they follow conventional
                        commit format
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
