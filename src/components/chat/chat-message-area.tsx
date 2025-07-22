"use client";

// import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./chat-message";
import { useEffect, useRef } from "react";
import { Message } from "@/lib/types";

interface ChatMessageAreaProps {
  messages: Message[];
  isLoading?: boolean;
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
        <div className="w-4 h-4 rounded-full bg-muted-foreground/20" />
      </div>
      <div className="bg-muted/50 border-muted-foreground/20 rounded-lg p-3">
        <div className="flex items-center gap-1">
          <div
            className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <div
            className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <div
            className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
}

export function ChatMessageArea({
  messages,
  isLoading = false,
}: ChatMessageAreaProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      <div className="flex-1 overflow-y-auto px-2 sm:px-4 py-2 scroll-smooth">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center p-4">
            <div className="text-muted-foreground">
              <div className="text-lg mb-2">🤖 AI Assistant</div>
              <div>Hi! I&apos;m powered by Google Gemini AI.</div>
              <div className="text-sm mt-2 opacity-75">
                How can I help you today?
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-0">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.content}
                isUser={message.isUser}
                timestamp={message.timestamp}
                isThinking={message.isThinking}
                finalAnswer={message.finalAnswer}
                tokenCount={message.tokenCount}
              />
            ))}
            {isLoading && <TypingIndicator />}
            {/* Invisible element to scroll to */}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
    </div>
  );
}
