import { ChatContainer } from "@/components/chat/chat-container";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-4xl">
        <div className="mb-4 sm:mb-8 px-2 sm:px-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            AI Frontend Kit
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Modern AI chat interface built with Next.js,
            <a
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              shadcn/ui
            </a>{" "}
            and inspired by{" "}
            <a
              href="https://simple-ai.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              simple-ai.dev
            </a>
          </p>
        </div>
        <ChatContainer />
        <Footer />
      </div>
    </main>
  );
}
