import { GoogleGenAI } from "@google/genai";
import { AIResponse, ThinkingCallback, AIResponseOptions } from "./types";
import {
  API_CONFIG,
  ERROR_MESSAGES,
  GEMINI_MODEL_MAPPING,
} from "@/config/ai-config";

/**
 * Gemini AI client
 * Uses a lazy initialization pattern to only create the client when needed
 */
let aiClient: GoogleGenAI | null = null;

const getAIClient = (): GoogleGenAI => {
  if (!aiClient) {
    // For Next.js, we need to use NEXT_PUBLIC_ prefixed env variables for client-side access
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
    if (!apiKey) {
      console.error(ERROR_MESSAGES.MISSING_API_KEY("Gemini"));
      throw new Error(ERROR_MESSAGES.MISSING_API_KEY("Gemini"));
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
};

/**
 * Map custom model IDs to actual Gemini model names
 * @param modelId - The custom model ID to map
 * @returns The actual Gemini model name
 */
const getGeminiModelName = (modelId: string): string => {
  return GEMINI_MODEL_MAPPING[modelId] || GEMINI_MODEL_MAPPING.default;
};

/**
 * Gemini specific response generation with enhanced error handling
 * @param userMessage - The user's message to process
 * @param modelId - The model ID to use
 * @param enableThinking - Whether to enable thinking mode
 * @param onThinking - Callback for streaming thinking updates
 * @returns Promise<AIResponse> with text and optional thinking content
 */
export async function generateGeminiResponse(
  userMessage: string,
  modelId: string,
  enableThinking: boolean = true,
  onThinking?: ThinkingCallback,
): Promise<AIResponse> {
  try {
    // Initialize AI client
    const ai = getAIClient();

    // Map our custom model ID to actual Gemini model name
    const actualModelName = getGeminiModelName(modelId);

    // Use streaming API to get real-time thinking content
    if (enableThinking) {
      let accumulatedThoughts = "";
      let accumulatedAnswer = "";

      try {
        // Use the streaming API to get real-time thinking content
        const streamResponse = await ai.models.generateContentStream({
          model: actualModelName,
          contents: userMessage,
          config: {
            thinkingConfig: {
              thinkingBudget: enableThinking ? undefined : 0,
              includeThoughts: true,
            },
          },
        });

        // Process the stream chunks
        for await (const chunk of streamResponse) {
          if (
            chunk.candidates &&
            chunk.candidates.length > 0 &&
            chunk.candidates[0].content &&
            chunk.candidates[0].content.parts
          ) {
            for (const part of chunk.candidates[0].content.parts) {
              if (!part.text) {
                continue;
              } else if (part.thought) {
                // This is a thinking part
                accumulatedThoughts += part.text;
                if (onThinking) {
                  onThinking(accumulatedThoughts);
                }
              } else {
                // This is the answer part
                accumulatedAnswer += part.text;
              }
            }
          }
        }

        // Return the accumulated thoughts and answer
        return {
          text: accumulatedAnswer || ERROR_MESSAGES.NO_RESPONSE,
          thinking: accumulatedThoughts,
        };
      } catch (error) {
        console.error("Error in streaming response:", error);
        // Log the error but continue to fallback method
        // Don't expose internal error details to the user
      }
    }

    // Generate the response using non-streaming API (fallback or when thinking is disabled)
    try {
      const response = await ai.models.generateContent({
        model: actualModelName,
        contents: userMessage,
        config: {
          thinkingConfig: {
            thinkingBudget: enableThinking ? undefined : 0,
            includeThoughts: enableThinking,
          },
        },
      });

      // Extract thinking content and final answer
      let thinking = "";
      let finalAnswer = "";

      if (response.candidates && response.candidates[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (!part.text) {
            continue;
          } else if (part.thought) {
            thinking += part.text + "\n\n";
          } else {
            finalAnswer += part.text;
          }
        }
      }

      return {
        text: finalAnswer || response.text || ERROR_MESSAGES.NO_RESPONSE,
        thinking: thinking.trim() || undefined,
      };
    } catch (error) {
      // Handle specific error types
      const err = error as Error;
      console.error("Error generating Gemini AI response:", err);

      // Return user-friendly error message
      return {
        text: ERROR_MESSAGES.GENERAL_ERROR,
        error: "api_error",
      };
    }
  } catch (error) {
    // Catch any unexpected errors
    console.error("Unexpected error in Gemini response generation:", error);
    return {
      text: ERROR_MESSAGES.GENERAL_ERROR,
      error: "unexpected_error",
    };
  }
}

/**
 * Generic AI response router - routes requests to appropriate provider
 * @param userMessage - The user's message to process
 * @param provider - The AI provider to use (gemini, openai, claude)
 * @param model - The model ID to use
 * @param options - Additional options including thinking mode and callbacks
 * @returns Promise<AIResponse> with text and optional thinking content
 */
export async function generateAIResponse(
  userMessage: string,
  provider: string,
  model: string,
  options: AIResponseOptions = {},
): Promise<AIResponse> {
  try {
    switch (provider.toLowerCase()) {
      case "gemini":
        return generateGeminiResponse(
          userMessage,
          model,
          options.thinkingEnabled,
          options.onThinking,
        );
      case "openai":
        return {
          text: ERROR_MESSAGES.PROVIDER_NOT_IMPLEMENTED("OpenAI"),
          error: "not_implemented",
        };
      case "claude":
        return {
          text: ERROR_MESSAGES.PROVIDER_NOT_IMPLEMENTED("Claude"),
          error: "not_implemented",
        };
      default:
        return {
          text: ERROR_MESSAGES.UNKNOWN_PROVIDER,
          error: "unknown_provider",
        };
    }
  } catch (error) {
    console.error("Error in generateAIResponse:", error);
    return {
      text: ERROR_MESSAGES.GENERAL_ERROR,
      error: "router_error",
    };
  }
}

/**
 * Legacy function for backward compatibility
 * @param userMessage - The user's message to process
 * @param enableThinking - Whether to enable thinking mode
 * @returns Promise<AIResponse> with text and optional thinking content
 */
export async function generateChatResponse(
  userMessage: string,
  enableThinking: boolean = true,
): Promise<AIResponse> {
  return generateAIResponse(userMessage, "gemini", API_CONFIG.DEFAULT_MODEL, {
    thinkingEnabled: enableThinking,
  });
}

/**
 * Test function for the Gemini API
 * @returns Promise<void>
 */
async function testGeminiAPI(): Promise<void> {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "How does AI work?",
      config: {
        thinkingConfig: {
          thinkingBudget: 0, // Disables thinking
        },
      },
    });
    console.log("Test response:", response.text);
  } catch (error) {
    console.error("Test failed:", error);
  }
}

export { testGeminiAPI };
