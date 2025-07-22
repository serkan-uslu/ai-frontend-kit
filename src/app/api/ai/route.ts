import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { ERROR_MESSAGES, GEMINI_MODEL_MAPPING } from "@/config/ai-config";
import { applyRateLimit } from "@/lib/rate-limit";

// Server-side AI client
let aiClient: GoogleGenAI | null = null;

const getServerAIClient = (): GoogleGenAI => {
  if (!aiClient) {
    // Access API key securely on the server side
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
 */
const getGeminiModelName = (modelId: string): string => {
  return GEMINI_MODEL_MAPPING[modelId] || GEMINI_MODEL_MAPPING.default;
};

/**
 * API route handler for AI requests
 */
// Helper function to create a streaming response
function createStreamResponse(stream: ReadableStream) {
  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimit = await applyRateLimit(req);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        {
          status: 429,
          headers: rateLimit.headers,
        },
      );
    }

    // Parse request body
    const {
      userMessage,
      provider,
      modelId,
      enableThinking = true,
      history = [],
    } = await req.json();

    // Validate request
    if (!userMessage) {
      return NextResponse.json(
        { error: "User message is required" },
        { status: 400 },
      );
    }

    // Handle different providers
    switch (provider?.toLowerCase()) {
      case "gemini":
        try {
          // Initialize AI client
          const ai = getServerAIClient();

          // Map custom model ID to actual Gemini model name
          const actualModelName = getGeminiModelName(modelId);

          // Create a streaming response
          const encoder = new TextEncoder();
          const stream = new ReadableStream({
            async start(controller) {
              try {
                if (enableThinking) {
                  // Create a chat with history if provided
                  const chat = ai.chats.create({
                    model: actualModelName,
                    history: history.length > 0 ? history : undefined,
                  });

                  // Use streaming API for thinking content
                  const streamResponse = await chat.sendMessageStream({
                    message: userMessage,
                    config: {
                      thinkingConfig: {
                        includeThoughts: true,
                      },
                    },
                  });

                  let accumulatedThoughts = "";
                  let accumulatedAnswer = "";

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
                          // Send thinking update
                          const data = JSON.stringify({
                            type: "thinking",
                            content: accumulatedThoughts,
                          });
                          controller.enqueue(
                            encoder.encode(`data: ${data}\n\n`),
                          );
                        } else {
                          // This is the answer part
                          accumulatedAnswer += part.text;
                        }
                      }
                    }
                  }

                  // Count tokens for the response
                  let tokenCount = 0;
                  try {
                    const countResponse = await ai.models.countTokens({
                      model: actualModelName,
                      contents: userMessage,
                    });
                    tokenCount = countResponse.totalTokens || 0;
                  } catch (error) {
                    console.error("Error counting tokens:", error);
                  }

                  // Send the final answer with token count
                  const finalData = JSON.stringify({
                    type: "final",
                    content: accumulatedAnswer || ERROR_MESSAGES.NO_RESPONSE,
                    thinking: accumulatedThoughts,
                    tokenCount: tokenCount,
                  });
                  controller.enqueue(encoder.encode(`data: ${finalData}\n\n`));
                } else {
                  // Non-streaming API when thinking is disabled
                  // Create a chat with history if provided
                  const chat = ai.chats.create({
                    model: actualModelName,
                    history: history.length > 0 ? history : undefined,
                  });

                  // Send message without streaming
                  const response = await chat.sendMessage({
                    message: userMessage,
                    config: {
                      thinkingConfig: {
                        thinkingBudget: 0,
                        includeThoughts: false,
                      },
                    },
                  });

                  // Count tokens for the response
                  let tokenCount = 0;
                  try {
                    const countResponse = await ai.models.countTokens({
                      model: actualModelName,
                      contents: userMessage,
                    });
                    tokenCount = countResponse.totalTokens || 0;
                  } catch (error) {
                    console.error("Error counting tokens:", error);
                  }

                  // Send the final answer with token count
                  const finalData = JSON.stringify({
                    type: "final",
                    content: response.text || ERROR_MESSAGES.NO_RESPONSE,
                    tokenCount: tokenCount,
                  });
                  controller.enqueue(encoder.encode(`data: ${finalData}\n\n`));
                }
              } catch (error) {
                console.error("Error in streaming response:", error);
                const errorData = JSON.stringify({
                  type: "error",
                  content: ERROR_MESSAGES.GENERAL_ERROR,
                });
                controller.enqueue(encoder.encode(`data: ${errorData}\n\n`));
              } finally {
                controller.close();
              }
            },
          });

          return createStreamResponse(stream);
        } catch (error) {
          console.error("Error generating Gemini AI response:", error);
          return NextResponse.json(
            { error: ERROR_MESSAGES.GENERAL_ERROR },
            { status: 500 },
          );
        }

      case "openai":
        return NextResponse.json(
          { error: ERROR_MESSAGES.PROVIDER_NOT_IMPLEMENTED("OpenAI") },
          { status: 501 },
        );

      case "claude":
        return NextResponse.json(
          { error: ERROR_MESSAGES.PROVIDER_NOT_IMPLEMENTED("Claude") },
          { status: 501 },
        );

      default:
        return NextResponse.json(
          { error: ERROR_MESSAGES.UNKNOWN_PROVIDER },
          { status: 400 },
        );
    }
  } catch (error) {
    console.error("Unexpected error in AI API route:", error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.GENERAL_ERROR },
      { status: 500 },
    );
  }
}
