import { AIProvider } from "../lib/types";

export const API_CONFIG = {
  GEMINI_API_KEY_ENV: "NEXT_PUBLIC_GEMINI_API_KEY",
  DEFAULT_MODEL: "gemini-2.5-flash",
  DEFAULT_PROVIDER: "Google Gemini",
};

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

export const GEMINI_MODEL_MAPPING: Record<string, string> = {
  "gemini-2.5-flash-speed": "gemini-2.5-flash",
  "gemini-2.5-flash": "gemini-2.5-flash",
  "gemini-2.5-pro": "gemini-2.5-pro",
  default: "gemini-2.5-flash",
};

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
];

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

export const PROVIDER_ICONS = {
  "google gemini": "sparkles",
  openai: "message-square",
  "anthropic claude": "bot",
  default: "brain",
};

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
