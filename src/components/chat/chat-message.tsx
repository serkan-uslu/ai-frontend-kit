"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Bot, User, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
  isThinking?: boolean;
  finalAnswer?: string;
}

export function ChatMessage({
  message,
  isUser,
  timestamp,
  isThinking = false,
  finalAnswer,
}: ChatMessageProps) {
  // Always start collapsed if there's a final answer
  const [isCollapsed, setIsCollapsed] = useState(!!finalAnswer);

  // Auto-collapse when finalAnswer becomes available
  useEffect(() => {
    if (finalAnswer) {
      setIsCollapsed(true);
    }
  }, [finalAnswer]);
  return (
    <div
      className={cn(
        "flex w-full mb-4 gap-3",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      {!isUser && (
        <Avatar className="w-8 h-8 mt-1">
          <AvatarImage src="/ai-avatar.png" />
          <AvatarFallback>
            <Bot className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}

      <Card
        className={cn(
          "max-w-[70%] relative",
          isUser
            ? "bg-primary text-primary-foreground"
            : isThinking
              ? "bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800/50"
              : "bg-muted/50 border-muted-foreground/20",
        )}
      >
        <CardContent className={cn("p-3", isThinking && "pb-1")}>
          {isThinking && finalAnswer && (
            <div className="flex justify-between items-center mb-2">
              <div className="text-xs font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <span className="inline-block w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                Thinking
              </div>
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/40 p-1 rounded-full"
              >
                {isCollapsed ? (
                  <ChevronDown size={14} />
                ) : (
                  <ChevronUp size={14} />
                )}
              </button>
            </div>
          )}

          <div className="mt-2">
            {isThinking && (
              <div
                className={cn(
                  "p-3 rounded-md mb-2",
                  isCollapsed ? "hidden" : "block",
                  "bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800",
                  "animate-pulse",
                )}
              >
                <div className="text-sm text-amber-800 dark:text-amber-300 italic">
                  <ReactMarkdown>{message}</ReactMarkdown>
                </div>
              </div>
            )}

            {/* Show final answer if available, otherwise show regular message */}
            {isThinking && finalAnswer ? (
              <div className="text-sm">
                <ReactMarkdown>{finalAnswer}</ReactMarkdown>
              </div>
            ) : (
              !isThinking && (
                <div className="text-sm">
                  <ReactMarkdown>{message}</ReactMarkdown>
                </div>
              )
            )}
          </div>

          {timestamp && (
            <div
              className={cn(
                "text-xs mt-2 opacity-70",
                isUser
                  ? "text-primary-foreground/70"
                  : isThinking
                    ? "text-amber-700/70 dark:text-amber-400/70"
                    : "text-muted-foreground",
              )}
            >
              {timestamp}
            </div>
          )}
        </CardContent>
      </Card>

      {isUser && (
        <Avatar className="w-8 h-8 mt-1">
          <AvatarImage src="/user-avatar.png" />
          <AvatarFallback>
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
