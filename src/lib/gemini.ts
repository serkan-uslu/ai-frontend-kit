import { AIResponse, ThinkingCallback, AIResponseOptions } from "./types";
import { API_CONFIG, ERROR_MESSAGES } from "@/config/ai-config";
import { callAIAPI } from "./api-client";

/**
 * Legacy compatibility layer for the AI client
 * Now uses the secure API client instead of direct AI service access
 */

// No longer needed as we're using the API client
// This is kept as a comment for reference
const getAIClient = () => {
  throw new Error("This function should not be called anymore");
};

// Model mapping is now handled server-side
// This is kept as a comment for reference
// const getGeminiModelName = (modelId: string): string => {};

/**
 * Gemini specific response generation using the secure API client
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
    // Call the secure API client
    // Pass the onThinking callback directly to the API client for streaming updates
    const response = await callAIAPI(userMessage, "gemini", modelId, {
      thinkingEnabled: enableThinking,
      onThinking: onThinking,
    });

    // No need to call onThinking here as it's now handled by the streaming API
    // The API client will call onThinking as thinking updates arrive

    return response;
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
    // Use the secure API client for all providers
    return await callAIAPI(userMessage, provider, model, options);
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
