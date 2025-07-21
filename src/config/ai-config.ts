import { AIProvider } from "../lib/types";

/**
 * Configuration for AI providers and models
 * This centralized config file makes it easy to:
 * 1. Add new AI providers
 * 2. Add new models to existing providers
 * 3. Configure model properties and capabilities
 */

// Default API endpoint configurations
export const API_CONFIG = {
  GEMINI_API_KEY_ENV: "NEXT_PUBLIC_GEMINI_API_KEY",
  OPENAI_API_KEY_ENV: "NEXT_PUBLIC_OPENAI_API_KEY",
  CLAUDE_API_KEY_ENV: "NEXT_PUBLIC_CLAUDE_API_KEY",
  DEFAULT_MODEL: "gemini-2.5-flash",
  DEFAULT_PROVIDER: "Google Gemini",
};

// Error messages
export const ERROR_MESSAGES = {
  MISSING_API_KEY: (provider: string) =>
    `⚠️ ${provider} API key not configured. Please add your API key to .env.local file.`,
  GENERAL_ERROR:
    "I encountered an error while processing your request. Please try again.",
  PROVIDER_NOT_IMPLEMENTED: (provider: string) =>
    `${provider} integration not implemented yet`,
  UNKNOWN_PROVIDER: "Unknown AI provider",
  NO_RESPONSE: "I'm sorry, I couldn't generate a response.",
};

// Model mapping for Gemini
export const GEMINI_MODEL_MAPPING: Record<string, string> = {
  "gemini-2.5-flash-speed": "gemini-2.5-flash",
  "gemini-2.5-flash": "gemini-2.5-flash",
  "gemini-2.5-pro": "gemini-2.5-pro",
  default: "gemini-2.5-flash",
};

// AI Providers and their models
export const AI_PROVIDERS: AIProvider[] = [
  {
    name: "Google Gemini",
    models: [
      {
        id: "gemini-2.5-flash-speed",
        name: "Speed",
        description: "Quick responses with minimal processing",
        technicalInfo: "Model: gemini-2.5-flash • Thinking: disabled",
        thinkingEnabled: false,
        provider: "gemini",
      },
      {
        id: "gemini-2.5-flash",
        name: "Balanced",
        description: "Good balance of speed and response quality",
        technicalInfo: "Model: gemini-2.5-flash • Thinking: enabled",
        thinkingEnabled: true,
        provider: "gemini",
      },
      {
        id: "gemini-2.5-pro",
        name: "Quality",
        description: "Deep thinking for comprehensive responses",
        technicalInfo: "Model: gemini-2.5-pro • Thinking: enabled",
        thinkingEnabled: true,
        provider: "gemini",
      },
    ],
  },
  {
    name: "OpenAI",
    models: [
      {
        id: "gpt-4o",
        name: "GPT-4o",
        description: "Latest multimodal model",
        technicalInfo: "Model: gpt-4o • Context: 128k tokens",
        provider: "openai",
      },
      {
        id: "gpt-4o-mini",
        name: "GPT-4o Mini",
        description: "Fast and cost-effective",
        technicalInfo: "Model: gpt-4o-mini • Context: 128k tokens",
        provider: "openai",
      },
    ],
  },
  {
    name: "Anthropic Claude",
    models: [
      {
        id: "claude-3-5-sonnet",
        name: "Claude 3.5 Sonnet",
        description: "Best balance of intelligence and speed",
        technicalInfo: "Model: claude-3-5-sonnet • Context: 200k tokens",
        provider: "claude",
      },
      {
        id: "claude-3-haiku",
        name: "Claude 3 Haiku",
        description: "Fastest model for simple tasks",
        technicalInfo: "Model: claude-3-haiku • Context: 200k tokens",
        provider: "claude",
      },
    ],
  },
];

// UI configuration for the chat interface
export const UI_CONFIG = {
  THINKING_STYLES: {
    BACKGROUND:
      "bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800",
    TEXT: "text-amber-800 dark:text-amber-300 italic",
    ANIMATION: "animate-pulse",
  },
  MESSAGE_MAX_WIDTH: "max-w-[70%]",
  DEFAULT_AVATAR: {
    AI: "/ai-avatar.png",
    USER: "/user-avatar.png",
  },
};

// Provider icon mapping (string identifiers instead of React components)
export const PROVIDER_ICONS = {
  "google gemini": "sparkles",
  openai: "message-square",
  "anthropic claude": "bot",
  default: "brain",
};

// Model icon mapping (string identifiers instead of React components)
export const MODEL_ICONS = {
  speed: "zap",
  balanced: "scale",
  quality: "brain",
  default: "brain",
};

// Helper function to get icon name for providers
export const getProviderIconName = (providerName: string): string => {
  const key = providerName.toLowerCase();
  return (
    PROVIDER_ICONS[key as keyof typeof PROVIDER_ICONS] || PROVIDER_ICONS.default
  );
};

// Helper function to get icon name for models
export const getModelIconName = (modelName: string): string => {
  if (
    modelName.toLowerCase().includes("speed") ||
    modelName.toLowerCase().includes("mini") ||
    modelName.toLowerCase().includes("haiku")
  ) {
    return MODEL_ICONS.speed;
  } else if (
    modelName.toLowerCase().includes("balanced") ||
    modelName.toLowerCase().includes("sonnet")
  ) {
    return MODEL_ICONS.balanced;
  } else {
    return MODEL_ICONS.default;
  }
};
