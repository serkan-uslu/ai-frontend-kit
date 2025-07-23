import { GoogleGenAI } from "@google/genai";
import {
  AIResponse,
  ThinkingCallback,
  AIResponseOptions,
  ChatHistoryEntry,
  GeminiResponse,
} from "./types";
import { API_CONFIG, ERROR_MESSAGES } from "@/config/ai-config";
import { callAIAPI } from "./api-client";

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
  history?: ChatHistoryEntry[],
): Promise<AIResponse> {
  try {
    // Call the secure API client
    // Pass the onThinking callback directly to the API client for streaming updates
    const response = await callAIAPI(userMessage, "gemini", modelId, {
      thinkingEnabled: enableThinking,
      onThinking: onThinking,
      history: history,
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
 * Generate an image using Gemini
 * @param prompt - The prompt to generate an image from
 * @returns Promise<AIResponse> with image data and text
 */
export async function generateGeminiImage(prompt: string): Promise<AIResponse> {
  try {
    // Call the secure API client with image generation flag
    const response = await callAIAPI(prompt, "gemini", "gemini-pro-vision", {
      generateImage: true,
    });

    return {
      ...response,
      isImage: true,
    };
  } catch (error) {
    console.error("Error generating image with Gemini:", error);
    return {
      text: ERROR_MESSAGES.GENERAL_ERROR,
      error: "image_generation_error",
    };
  }
}

/**
 * Edit an image using Gemini with text prompt and existing image
 * @param prompt - The text prompt describing the desired edit
 * @param imageData - Base64 encoded image data
 * @param mimeType - MIME type of the image (e.g., image/png, image/jpeg)
 * @returns Promise<AIResponse> with edited image data and text
 */
export async function editImageWithGemini(
  prompt: string,
  imageData: string,
  mimeType: string = "image/jpeg",
): Promise<AIResponse> {
  try {
    // Call the secure API client with image editing flag
    const response = await callAIAPI(
      prompt,
      "gemini",
      "gemini-2.0-flash-preview-image-generation",
      {
        editImage: true,
        imageData,
        mimeType,
      },
    );

    return {
      ...response,
      isImage: true,
    };
  } catch (error) {
    console.error("Error editing image with Gemini:", error);
    return {
      text: ERROR_MESSAGES.GENERAL_ERROR,
      error: "image_editing_error",
    };
  }
}

/**
 * Caption an image using Gemini with text prompt and existing image
 * @param imageData - Base64 encoded image data
 * @param mimeType - MIME type of the image (e.g., image/png, image/jpeg)
 * @param prompt - The text prompt describing the desired caption
 * @returns Promise<AIResponse> with captioned image data and text
 */
export async function captionImageWithGemini(
  imageData: string,
  mimeType: string,
  prompt: string = "Caption this image.",
): Promise<GeminiResponse> {
  try {
    const genAI = new GoogleGenAI({
      apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || "",
    });

    // Remove data URI prefix if present (e.g., data:image/png;base64,)
    let cleanImageData = imageData;
    if (imageData.includes("base64,")) {
      cleanImageData = imageData.split("base64,")[1];
    }

    const contents = [
      {
        inlineData: {
          mimeType: mimeType,
          data: cleanImageData,
        },
      },
      { text: prompt },
    ];

    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
    });

    return {
      text: result.text || "",
      imageData: undefined,
    };
  } catch (error) {
    console.error("Error captioning image with Gemini:", error);
    throw error;
  }
}

/**
 * Test function for the Gemini API
 * @returns Promise<void>
 */
