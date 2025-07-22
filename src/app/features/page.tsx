import { FeatureItem } from "@/components/features/feature-item";
import { BackButton } from "@/components/ui/back-button";
import { Brain, MessageSquare, Palette, Sparkles, Zap } from "lucide-react";

// Features data structure
const featuresData = [
  {
    title: "Chat History Support",
    description:
      "Seamless multi-turn conversations with context retention. The AI remembers previous messages in your conversation for more coherent and contextual responses.",
    icon: <MessageSquare />,
    iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Gemini API Integration",
    description:
      "Ready-to-use integration with Google's Gemini API, supporting multiple models with configurable parameters.",
    icon: <Sparkles />,
    iconBgColor: "bg-purple-100 dark:bg-purple-900/30",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  {
    title: "Thinking Model UI",
    description:
      "Real-time display of AI thinking process with collapsible interface, providing insight into the model's reasoning.",
    icon: <Brain />,
    iconBgColor: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    title: "Markdown Support",
    description:
      "Full markdown rendering in chat messages, enabling rich text formatting, code blocks, lists, and more.",
    icon: <MessageSquare />,
    iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Model Selection",
    description:
      "Switch between different AI providers and models with an intuitive dropdown interface.",
    icon: <Zap />,
    iconBgColor: "bg-green-100 dark:bg-green-900/30",
    iconColor: "text-green-600 dark:text-green-400",
  },
  {
    title: "Theming & Dark Mode",
    description:
      "Fully responsive design with light and dark mode support using shadcn/ui components.",
    icon: <Palette />,
    iconBgColor: "bg-indigo-100 dark:bg-indigo-900/30",
    iconColor: "text-indigo-600 dark:text-indigo-400",
  },
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="mb-8">
          <BackButton />

          <h1 className="text-3xl font-bold text-foreground mb-6">Features</h1>

          <div className="grid gap-6 md:grid-cols-2">
            {featuresData.map((feature, index) => (
              <FeatureItem
                key={`feature-${index}`}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                iconBgColor={feature.iconBgColor}
                iconColor={feature.iconColor}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
