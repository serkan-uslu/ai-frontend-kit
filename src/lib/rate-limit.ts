/**
 * Simple in-memory rate limiter
 * Protects API routes from abuse and DoS attacks
 */

// Store IP addresses and their request timestamps
const ipRequests: Record<string, number[]> = {};

// Rate limit configuration
const RATE_LIMIT = 10; // requests per window
const RATE_WINDOW = 60 * 1000; // 1 minute in milliseconds

/**
 * Helper function to apply rate limiting to API routes
 * @param req - The incoming request
 * @returns Rate limit result with success status and headers
 */
export async function applyRateLimit(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
  const now = Date.now();

  // Initialize if this is the first request from this IP
  if (!ipRequests[ip]) {
    ipRequests[ip] = [];
  }

  // Clean up old requests outside the current window
  ipRequests[ip] = ipRequests[ip].filter(
    (timestamp) => now - timestamp < RATE_WINDOW,
  );

  // Check if the IP has exceeded the rate limit
  const requestCount = ipRequests[ip].length;
  const remaining = Math.max(0, RATE_LIMIT - requestCount);
  const success = requestCount < RATE_LIMIT;

  // Add the current request timestamp if within limits
  if (success) {
    ipRequests[ip].push(now);
  }

  // Calculate reset time (when the oldest request will expire)
  const oldestTimestamp = ipRequests[ip][0] || now;
  const resetTime = oldestTimestamp + RATE_WINDOW;

  return {
    success,
    headers: {
      "X-RateLimit-Limit": RATE_LIMIT.toString(),
      "X-RateLimit-Remaining": remaining.toString(),
      "X-RateLimit-Reset": new Date(resetTime).toISOString(),
    },
    status: success ? 200 : 429,
  };
}
