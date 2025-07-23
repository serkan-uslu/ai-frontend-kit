// Type definitions for AI Frontend Kit

/**
 * Generic AI response interface
 */
export interface AIProvider {
  name: string;
  models: AIModel[];
}

/**
 * AI Model interface
 */
export interface AIModel {
  id: string;
  name: string;
  description: string;
  technicalInfo?: string;
  thinkingEnabled?: boolean;
  provider: string;
}

/**
 * Response type that includes thinking content
 */
export interface AIResponse {
  text: string;
  thinking?: string;
  error?: string;
  tokenCount?: number;
  imageData?: string; // Base64 encoded image data
  isImage?: boolean; // Flag to indicate if this is an image response
}

/**
 * Gemini specific response type
 */
export interface GeminiResponse {
  text: string;
  imageData?: string; // Base64 encoded image data
}

/**
 * Callback for streaming thinking content
 */
export type ThinkingCallback = (thinking: string) => void;

/**
 * Chat message interface
 */
export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
  isThinking?: boolean;
  finalAnswer?: string;
  tokenCount?: number;
  imageData?: string; // Base64 encoded image data
  isImage?: boolean; // Flag to indicate if this is an image message
}

/**
 * Chat message history entry
 */
export interface ChatHistoryEntry {
  role: "user" | "model";
  parts: { text: string }[];
}

/**
 * Options for AI response generation
 */
export interface AIResponseOptions {
  thinkingEnabled?: boolean;
  onThinking?: ThinkingCallback;
  temperature?: number;
  maxTokens?: number;
  history?: ChatHistoryEntry[];
  generateImage?: boolean; // Flag to indicate if this is an image generation request
  editImage?: boolean; // Flag to indicate if this is an image editing request
  captionImage?: boolean; // Flag to indicate if this is an image captioning request
  imageData?: string; // Base64 encoded image data for image editing/captioning
  mimeType?: string; // MIME type of the image for image editing/captioning
}

/**
 * Error handling interface
 */
export interface AIError {
  message: string;
  code?: string;
  provider?: string;
}
