import { AIResponse, AIResponseOptions } from "./types";
import { ERROR_MESSAGES } from "@/config/ai-config";

/**
 * Client-side function to call the secure AI API with streaming support
 * @param userMessage - The user's message to process
 * @param provider - The AI provider to use (gemini, openai, claude)
 * @param model - The model ID to use
 * @param options - Additional options including thinking mode and callbacks
 * @returns Promise<AIResponse> with text and optional thinking content
 */
export async function callAIAPI(
  userMessage: string,
  provider: string,
  model: string,
  options: AIResponseOptions = {},
): Promise<AIResponse> {
  try {
    // Call our secure server-side API
    const response = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userMessage,
        provider,
        modelId: model,
        enableThinking: options.thinkingEnabled,
        history: options.history || [],
        generateImage: options.generateImage || false,
        editImage: options.editImage || false,
        imageData: options.imageData || null,
        mimeType: options.mimeType || null,
      }),
    });

    // Handle non-200 responses
    if (!response.ok) {
      // Handle rate limiting specifically
      if (response.status === 429) {
        return {
          text: "You've reached the rate limit. Please try again in a moment.",
          error: "rate_limit",
        };
      }

      const errorData = await response.json().catch(() => ({}));
      return {
        text: errorData.error || ERROR_MESSAGES.GENERAL_ERROR,
        error: "api_error",
      };
    }

    // Check if this is a streaming response
    if (response.headers.get("Content-Type")?.includes("text/event-stream")) {
      // Handle streaming response
      if (!response.body) {
        throw new Error("No response body");
      }

      // Create a reader to process the stream
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let finalText = "";
      let finalThinking = "";
      let finalTokenCount: number | undefined;

      // Process the stream and call the thinking callback as data arrives
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          // Decode the chunk and split by SSE format (data: {...}\n\n)
          const chunk = decoder.decode(value, { stream: true });
          const events = chunk.split("\n\n").filter(Boolean);

          for (const event of events) {
            if (event.startsWith("data: ")) {
              try {
                // Parse the JSON data
                const jsonData = JSON.parse(event.slice(6));

                if (jsonData.type === "thinking" && options.onThinking) {
                  // Update thinking content
                  finalThinking = jsonData.content;
                  options.onThinking(finalThinking);
                } else if (jsonData.type === "final") {
                  // Final response
                  finalText = jsonData.content;
                  if (jsonData.thinking) {
                    finalThinking = jsonData.thinking;
                  }
                  // Extract token count if available
                  if (jsonData.tokenCount !== undefined) {
                    finalTokenCount = jsonData.tokenCount;
                  }
                } else if (jsonData.type === "error") {
                  // Error in stream
                  finalText = jsonData.content;
                }
              } catch (e) {
                console.error("Error parsing SSE data:", e);
              }
            }
          }
        }
      } finally {
        reader.releaseLock();
      }

      return {
        text: finalText || ERROR_MESSAGES.NO_RESPONSE,
        thinking: finalThinking || undefined,
        tokenCount: finalTokenCount,
      };
    } else {
      // Handle regular JSON response (fallback or image generation)
      const data = await response.json();

      // Check if this is an image response
      if (data.type === "image") {
        return {
          text: data.content || "Image generated successfully.",
          imageData: data.imageData,
          isImage: true,
        };
      }

      // Regular text response
      return {
        text: data.text || ERROR_MESSAGES.NO_RESPONSE,
        thinking: data.thinking,
        tokenCount: data.tokenCount,
      };
    }
  } catch (error) {
    console.error("Error calling AI API:", error);
    return {
      text: ERROR_MESSAGES.GENERAL_ERROR,
      error: "network_error",
    };
  }
}
