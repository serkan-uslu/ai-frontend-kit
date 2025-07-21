"use client";

import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  AI_PROVIDERS,
  getModelIconName,
  getProviderIconName,
} from "@/config/ai-config";
import { generateAIResponse } from "@/lib/gemini";
import { AIModel, Message } from "@/lib/types";
import { Bot, Brain, MessageSquare, Scale, Sparkles, Zap } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useState } from "react";
import { ChatInput } from "./chat-input";
import { ChatMessageArea } from "./chat-message-area";

// Helper function to get icon component for providers
const getProviderIcon = (providerName: string) => {
  const iconName = getProviderIconName(providerName);
  switch (iconName) {
    case "sparkles":
      return <Sparkles className="w-4 h-4" />;
    case "message-square":
      return <MessageSquare className="w-4 h-4" />;
    case "bot":
      return <Bot className="w-4 h-4" />;
    default:
      return <Brain className="w-4 h-4" />;
  }
};

// Helper function to get icon component for models
const getModelIcon = (modelName: string) => {
  const iconName = getModelIconName(modelName);
  switch (iconName) {
    case "zap":
      return <Zap className="w-4 h-4" />;
    case "scale":
      return <Scale className="w-4 h-4" />;
    default:
      return <Brain className="w-4 h-4" />;
  }
};

export function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState("Google Gemini");
  const [selectedModelId, setSelectedModelId] = useState("gemini-2.5-flash");

  const currentProvider =
    AI_PROVIDERS.find((p) => p.name === selectedProvider) || AI_PROVIDERS[0];
  const currentModel =
    currentProvider.models.find((m: AIModel) => m.id === selectedModelId) ||
    (selectedModelId === "coming-soon"
      ? {
          id: "coming-soon",
          name: "Coming Soon",
          description: "This model is not yet available",
          provider: "none",
          thinkingEnabled: false,
        }
      : currentProvider.models[0]);

  // When provider changes, select the first model or coming-soon
  const handleProviderChange = (providerName: string) => {
    setSelectedProvider(providerName);

    // When provider changes, select the first model or coming-soon
    const provider = AI_PROVIDERS.find((p) => p.name === providerName);
    if (provider && provider.models.length > 0) {
      setSelectedModelId(provider.models[0].id);
    } else {
      setSelectedModelId("coming-soon");
    }
  };

  const handleSendMessage = async (content: string) => {
    if (isLoading || !content.trim()) return;

    setIsLoading(true);

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Check if thinking is enabled for the current model
    const isThinkingEnabled = currentModel?.thinkingEnabled === true;
    let thinkingMessageId: string | undefined;

    if (isThinkingEnabled) {
      const thinkingMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Starting to think...",
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
        isThinking: true,
      };
      thinkingMessageId = thinkingMessage.id;
      setMessages((prev) => [...prev, thinkingMessage]);
    }

    // Define the thinking callback to update the thinking message in real-time
    const handleThinking = (thinking: string) => {
      if (thinkingMessageId) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === thinkingMessageId ? { ...msg, content: thinking } : msg,
          ),
        );
      }
    };

    try {
      const response = await generateAIResponse(
        content,
        currentModel?.provider || "gemini",
        selectedModelId,
        {
          thinkingEnabled: currentModel?.thinkingEnabled,
          onThinking: isThinkingEnabled ? handleThinking : undefined,
        },
      );

      if (isThinkingEnabled && thinkingMessageId) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === thinkingMessageId
              ? { ...m, finalAnswer: response.text }
              : m,
          ),
        );
      } else {
        // Add AI response as a new message if thinking was not enabled
        const aiMessage: Message = {
          id: (Date.now() + 2).toString(),
          content: response.text,
          isUser: false,
          timestamp: new Date().toLocaleTimeString(),
        };

        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error("Error generating response:", error);

      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I encountered an error. Please try again.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-[600px] w-full max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b p-4 gap-4">
        <div className="text-lg font-medium">AI Assistant</div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Provider Selector */}
          <Select value={selectedProvider} onValueChange={handleProviderChange}>
            <SelectTrigger className="w-full sm:w-[180px] flex-shrink-0">
              <div className="flex items-center gap-2">
                {getProviderIcon(selectedProvider)}
                <span className="truncate">{selectedProvider}</span>
              </div>
            </SelectTrigger>
            <SelectContent
              className="w-[var(--radix-select-trigger-width)] sm:w-auto"
              side="bottom"
              position="popper"
              sideOffset={8}
            >
              {AI_PROVIDERS.map((provider) => (
                <SelectItem key={provider.name} value={provider.name}>
                  <div className="flex items-center gap-2">
                    {getProviderIcon(provider.name)}
                    <span>{provider.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Model Selector */}
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <Select value={selectedModelId} onValueChange={setSelectedModelId}>
              <SelectTrigger className="w-full sm:w-[200px] flex-shrink-0">
                <div className="flex items-center gap-2">
                  {getModelIcon(currentModel.name)}
                  <div className="text-left min-w-0 flex-1 flex flex-row gap-2 items-center">
                    <div className="font-medium truncate">
                      {currentModel.name}
                    </div>
                    <div className="text-xs text-muted-foreground truncate hidden sm:inline">
                      {currentModel.provider}
                    </div>
                  </div>
                </div>
              </SelectTrigger>
              <SelectContent
                className="w-[var(--radix-select-trigger-width)] sm:w-[320px]"
                side="bottom"
                position="popper"
                sideOffset={8}
              >
                {selectedProvider === "Google Gemini" ? (
                  // Show actual models for Gemini
                  currentProvider.models.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      <div className="flex items-start gap-3 py-2">
                        {getModelIcon(model.name)}
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{model.name}</span>
                            <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                              {model.provider}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {model.description}
                          </span>
                          <span className="text-xs text-muted-foreground/70 font-mono">
                            {model.technicalInfo}
                          </span>
                        </div>
                      </div>
                    </SelectItem>
                  ))
                ) : (
                  // Show coming soon for other providers
                  <SelectItem value="coming-soon" disabled>
                    <div className="flex items-center gap-3 py-2 opacity-60">
                      <div className="w-4 h-4 rounded-full bg-muted-foreground/20 flex items-center justify-center">
                        <span className="text-xs">🚧</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">Coming Soon</span>
                        <span className="text-xs text-muted-foreground">
                          {selectedProvider} integration is in development
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                )}
              </SelectContent>
            </Select>

            {/* Status Indicator */}
            <div className="hidden sm:flex items-center gap-2 ml-auto sm:ml-0">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm text-muted-foreground">Ready</span>
            </div>

            {/* Theme Toggle */}
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      <ChatMessageArea messages={messages} isLoading={isLoading} />

      <ChatInput
        onSend={handleSendMessage}
        disabled={isLoading || selectedModelId === "coming-soon"}
        placeholder={
          selectedModelId === "coming-soon"
            ? `${selectedProvider} integration coming soon...`
            : `Ask me anything...`
        }
      />
    </Card>
  );
}
