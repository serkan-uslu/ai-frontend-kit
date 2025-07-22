import Link from "next/link";
import {
  ArrowLeft,
  Sparkles,
  MessageSquare,
  Brain,
  Zap,
  Code2,
  Palette,
} from "lucide-react";

export default function FeaturesPage() {
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

          <h1 className="text-3xl font-bold text-foreground mb-6">Features</h1>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Feature 1 - Chat History */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-border/40">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-md">
                  <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-medium">Chat History Support</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Seamless multi-turn conversations with context retention. The AI
                remembers previous messages in your conversation for more
                coherent and contextual responses.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-border/40">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-md">
                  <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-medium">Gemini API Integration</h3>
              </div>
              <p className="text-muted-foreground">
                Ready-to-use integration with Google&apos;s Gemini API,
                supporting multiple models with configurable parameters.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-border/40">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-md">
                  <Brain className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-lg font-medium">Thinking Model UI</h3>
              </div>
              <p className="text-muted-foreground">
                Real-time display of AI thinking process with collapsible
                interface, providing insight into the model&apos;s reasoning.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-border/40">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-md">
                  <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-medium">Markdown Support</h3>
              </div>
              <p className="text-muted-foreground">
                Full markdown rendering in chat messages, enabling rich text
                formatting, code blocks, lists, and more.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-border/40">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-md">
                  <Zap className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-medium">Model Selection</h3>
              </div>
              <p className="text-muted-foreground">
                Switch between different AI providers and models with an
                intuitive dropdown interface.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-border/40">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-md">
                  <Code2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-lg font-medium">TypeScript & SOLID</h3>
              </div>
              <p className="text-muted-foreground">
                Built with TypeScript and following SOLID principles for a
                maintainable, extensible codebase.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-border/40">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-md">
                  <Palette className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-lg font-medium">Theming & Dark Mode</h3>
              </div>
              <p className="text-muted-foreground">
                Fully responsive design with light and dark mode support using
                shadcn/ui components.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
