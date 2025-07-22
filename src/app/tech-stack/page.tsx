import { TechSection, TechItem } from "@/components/tech-stack/tech-section";
import { BackButton } from "@/components/ui/back-button";

// Tech stack data structure
const techStackData = [
  {
    title: "Frontend Framework",
    items: [
      {
        title: "Next.js",
        description:
          "React framework with server-side rendering, routing, and optimizations",
      },
      {
        title: "React",
        description:
          "Component-based UI library for building interactive interfaces",
      },
      {
        title: "TypeScript",
        description:
          "Strongly typed programming language that builds on JavaScript",
      },
      {
        title: "Tailwind CSS",
        description: "Utility-first CSS framework for rapid UI development",
      },
    ],
  },
  {
    title: "UI Components",
    items: [
      {
        title: "shadcn/ui",
        description:
          "Beautifully designed components built with Radix UI and Tailwind CSS",
      },
      {
        title: "Lucide Icons",
        description: "Beautiful & consistent icon set with React components",
      },
      {
        title: "React Markdown",
        description:
          "Markdown rendering for chat messages with code highlighting",
      },
    ],
  },
  {
    title: "AI Integration",
    items: [
      {
        title: "Google Gemini API",
        description: "Integration with Google's Gemini models for AI answers",
      },
      {
        title: "Provider Abstraction",
        description:
          "Modular architecture for easy integration of additional AI providers",
      },
      {
        title: "Streaming Responses",
        description:
          "Real-time streaming of AI responses for better user experience",
      },
      {
        title: "Thinking Model",
        description:
          "Support for displaying AI thinking process before final answers",
      },
    ],
  },
  {
    title: "Architecture & Principles",
    items: [
      {
        title: "SOLID Principles",
        description: "Design principles for maintainable and extensible code",
      },
      {
        title: "Atomic UI Design",
        description: "Component-based design system for consistent UI",
      },
      {
        title: "Centralized Configuration",
        description: "Dedicated config files for easy customization",
      },
      {
        title: "Error Handling",
        description: "Robust error handling throughout the application",
      },
    ],
  },
  {
    title: "Development Tools",
    items: [
      {
        title: "ESLint",
        description:
          "Static code analysis tool for identifying problematic patterns in JavaScript/TypeScript code",
      },
      {
        title: "Prettier",
        description:
          "Code formatter that enforces a consistent style across the codebase",
      },
      {
        title: "Husky",
        description:
          "Git hooks tool for running scripts before commits and pushes",
      },
      {
        title: "commitlint",
        description:
          "Lints commit messages to ensure they follow conventional commit format",
      },
    ],
  },
];

export default function TechStackPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="mb-8">
          <BackButton />

          <h1 className="text-3xl font-bold text-foreground mb-6">
            Tech Stack
          </h1>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-6">
              AI Frontend Kit is built with modern technologies to provide a
              robust, scalable foundation for AI chat applications.
            </p>

            <div className="space-y-8">
              {techStackData.map((section, index) => (
                <TechSection key={`section-${index}`} title={section.title}>
                  {section.items.map((item, itemIndex) => (
                    <TechItem
                      key={`item-${index}-${itemIndex}`}
                      title={item.title}
                      description={item.description}
                    />
                  ))}
                </TechSection>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
