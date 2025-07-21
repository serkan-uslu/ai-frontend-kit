import Link from "next/link";
import { ArrowLeft, CheckCircle2, Circle, Clock } from "lucide-react";

export default function RoadmapPage() {
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

          <h1 className="text-3xl font-bold text-foreground mb-6">Roadmap</h1>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-6">
              Our development roadmap outlines the planned features and
              improvements for AI Frontend Kit. We&apos;re continuously working
              to enhance the platform and add new capabilities.
            </p>

            <div className="space-y-12">
              {/* Completed Features */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="text-green-500" size={20} />
                  <span>Completed</span>
                </h2>

                <ul className="space-y-3 list-none pl-0">
                  <li className="flex items-start gap-3">
                    <CheckCircle2
                      className="text-green-500 mt-1 flex-shrink-0"
                      size={18}
                    />
                    <div>
                      <span className="font-medium">
                        Google Gemini API Integration
                      </span>
                      <p className="text-muted-foreground text-sm mt-1">
                        Complete integration with Gemini API including streaming
                        responses and thinking mode.
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <CheckCircle2
                      className="text-green-500 mt-1 flex-shrink-0"
                      size={18}
                    />
                    <div>
                      <span className="font-medium">Thinking Model UI</span>
                      <p className="text-muted-foreground text-sm mt-1">
                        Real-time display of AI thinking process with
                        collapsible interface.
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <CheckCircle2
                      className="text-green-500 mt-1 flex-shrink-0"
                      size={18}
                    />
                    <div>
                      <span className="font-medium">Markdown Support</span>
                      <p className="text-muted-foreground text-sm mt-1">
                        Rich text formatting in chat messages using
                        react-markdown.
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <CheckCircle2
                      className="text-green-500 mt-1 flex-shrink-0"
                      size={18}
                    />
                    <div>
                      <span className="font-medium">
                        Centralized Configuration
                      </span>
                      <p className="text-muted-foreground text-sm mt-1">
                        Extracted static configuration into dedicated config
                        files for easier customization.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* In Progress Features */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Clock className="text-amber-500" size={20} />
                  <span>In Progress</span>
                </h2>

                <ul className="space-y-3 list-none pl-0">
                  <li className="flex items-start gap-3">
                    <Clock
                      className="text-amber-500 mt-1 flex-shrink-0"
                      size={18}
                    />
                    <div>
                      <span className="font-medium">
                        OpenAI API Integration
                      </span>
                      <p className="text-muted-foreground text-sm mt-1">
                        Adding support for OpenAI models including GPT-4o and
                        streaming responses.
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <Clock
                      className="text-amber-500 mt-1 flex-shrink-0"
                      size={18}
                    />
                    <div>
                      <span className="font-medium">
                        Anthropic Claude Integration
                      </span>
                      <p className="text-muted-foreground text-sm mt-1">
                        Adding support for Claude models with streaming
                        capabilities.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Planned Features */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Circle className="text-blue-500" size={20} />
                  <span>Planned</span>
                </h2>

                <ul className="space-y-3 list-none pl-0">
                  <li className="flex items-start gap-3">
                    <Circle
                      className="text-blue-500 mt-1 flex-shrink-0"
                      size={18}
                    />
                    <div>
                      <span className="font-medium">Conversation History</span>
                      <p className="text-muted-foreground text-sm mt-1">
                        Save and load conversation history with local storage or
                        database integration.
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <Circle
                      className="text-blue-500 mt-1 flex-shrink-0"
                      size={18}
                    />
                    <div>
                      <span className="font-medium">
                        File Upload & Processing
                      </span>
                      <p className="text-muted-foreground text-sm mt-1">
                        Support for uploading and processing files in the chat
                        interface.
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <Circle
                      className="text-blue-500 mt-1 flex-shrink-0"
                      size={18}
                    />
                    <div>
                      <span className="font-medium">User Authentication</span>
                      <p className="text-muted-foreground text-sm mt-1">
                        Add user authentication and personalized experiences.
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <Circle
                      className="text-blue-500 mt-1 flex-shrink-0"
                      size={18}
                    />
                    <div>
                      <span className="font-medium">Voice Input & Output</span>
                      <p className="text-muted-foreground text-sm mt-1">
                        Support for voice interactions with speech-to-text and
                        text-to-speech capabilities.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
