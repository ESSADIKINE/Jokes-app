export function parseRateLimitHeaders(headers) {
    const limit = headers.get("ratelimit-limit")
    const remaining = headers.get("ratelimit-remaining")
    const reset = headers.get("ratelimit-reset")
    const retryAfter = headers.get("retry-after")

    return {
        limit: limit ? parseInt(limit, 10) : null,
        remaining: remaining ? parseInt(remaining, 10) : null,
        reset: reset ? parseInt(reset, 10) : null,
        retryAfter: retryAfter ? parseInt(retryAfter, 10) : 60 // Default 60 if missing on 429
    }
}
