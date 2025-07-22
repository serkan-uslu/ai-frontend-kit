import { RoadmapSection, RoadmapItem } from "@/components/roadmap/roadmap-item";
import { BackButton } from "@/components/ui/back-button";

// Roadmap data structure
const roadmapData = {
  completed: [
    {
      title: "Google Gemini API Integration",
      description:
        "Complete integration with Gemini API including streaming responses and thinking mode.",
    },
    {
      title: "Chat History Support",
      description:
        "Implemented chat history context for multi-turn conversations, sending previous messages to the AI for more coherent responses.",
    },
    {
      title: "Thinking Model UI",
      description:
        "Real-time display of AI thinking process with collapsible interface.",
    },
    {
      title: "Markdown Support",
      description:
        "Rich text formatting in chat messages using react-markdown.",
    },
    {
      title: "Code Syntax Highlighting",
      description: "Syntax highlighting for code blocks in chat messages.",
    },
    {
      title: "Dark Mode Support",
      description:
        "Toggle between light and dark themes for better user experience.",
    },
    {
      title: "Responsive Design",
      description: "Mobile-friendly interface that works across devices.",
    },
    {
      title: "Flow View",
      description: "Alternative visualization of chat as a flow diagram.",
    },
    {
      title: "Token Count Display",
      description: "Shows token usage for each AI response.",
    },
  ],
  inProgress: [
    {
      title: "Image Generation",
      description: "Adding support for AI image generation capabilities.",
    },
    {
      title: "Video Generation",
      description: "Implementing AI-powered video generation features.",
    },
    {
      title: "Speech Generation",
      description: "Adding text-to-speech capabilities for voice output.",
    },
    {
      title: "Music Generation",
      description: "Integrating AI music generation capabilities.",
    },
    {
      title: "Long Context Support",
      description:
        "Enhancing the chat interface to handle very long conversation contexts.",
    },
    {
      title: "Structured Output",
      description: "Supporting structured data responses from AI models.",
    },
    {
      title: "Function Calling",
      description: "Implementing function calling capabilities for AI models.",
    },
    {
      title: "Document Understanding",
      description: "Adding support for document analysis and understanding.",
    },
    {
      title: "Image Understanding",
      description:
        "Implementing image analysis and understanding capabilities.",
    },
    {
      title: "Video Understanding",
      description:
        "Adding support for video analysis and content understanding.",
    },
    {
      title: "Audio Understanding",
      description:
        "Implementing audio analysis and speech recognition features.",
    },
    {
      title: "Code Execution",
      description:
        "Adding support for safe code execution within the chat interface.",
    },
    {
      title: "URL Context",
      description:
        "Implementing URL analysis and web page context understanding.",
    },
    {
      title: "Google Search Integration",
      description:
        "Adding Google Search capabilities to enhance AI responses with real-time information.",
    },
  ],
  planned: [
    {
      title: "OpenAI API Integration",
      description:
        "Adding support for OpenAI models including GPT-4o and streaming responses.",
    },
    {
      title: "Anthropic Claude Integration",
      description:
        "Adding support for Claude models with streaming capabilities.",
    },
    {
      title: "File Upload & Processing",
      description:
        "Support for uploading and processing files in the chat interface.",
    },
    {
      title: "User Authentication",
      description: "Add user authentication and personalized experiences.",
    },
    {
      title: "Voice Input & Output",
      description:
        "Support for voice interactions with speech-to-text and text-to-speech capabilities.",
    },
  ],
};

export default function RoadmapPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="mb-8">
          <BackButton />

          <h1 className="text-3xl font-bold text-foreground mb-6">Roadmap</h1>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-6">
              Our development roadmap outlines the planned features and
              improvements for AI Frontend Kit. We&apos;re continuously working
              to enhance the platform and add new capabilities.
            </p>

            <div className="space-y-12">
              <RoadmapSection title="Completed" status="completed">
                {roadmapData.completed.map((item, index) => (
                  <RoadmapItem
                    key={`completed-${index}`}
                    title={item.title}
                    description={item.description}
                    status="completed"
                  />
                ))}
              </RoadmapSection>

              <RoadmapSection title="In Progress" status="inProgress">
                {roadmapData.inProgress.map((item, index) => (
                  <RoadmapItem
                    key={`inprogress-${index}`}
                    title={item.title}
                    description={item.description}
                    status="inProgress"
                  />
                ))}
              </RoadmapSection>

              <RoadmapSection title="Planned" status="planned">
                {roadmapData.planned.map((item, index) => (
                  <RoadmapItem
                    key={`planned-${index}`}
                    title={item.title}
                    description={item.description}
                    status="planned"
                  />
                ))}
              </RoadmapSection>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
