import { NextResponse } from "next/server"
import { buildJokeUrl } from "@/lib/jokeapi"

export async function GET(request) {
    const { searchParams } = new URL(request.url)

    // Reconstruct params object from query string
    // Note: Client side will pass them as query params to this route
    const categories = searchParams.get("categories")
        ? searchParams.get("categories").split(",")
        : ["Any"]

    const blacklistFlags = searchParams.get("blacklistFlags")
        ? searchParams.get("blacklistFlags").split(",")
        : []

    const params = {
        categories,
        blacklistFlags,
        lang: searchParams.get("lang") || "en",
        type: searchParams.get("type") || "Any",
        contains: searchParams.get("contains") || "",
        amount: parseInt(searchParams.get("amount") || "1", 10),
        safeMode: searchParams.has("safe-mode")
    }

    const url = buildJokeUrl(params)

    try {
        const res = await fetch(url)
        const data = await res.json()

        // Forward Rate Limit Headers
        const headers = new Headers()
        const rateLimitKeys = [
            "RATELIMIT-LIMIT",
            "RATELIMIT-REMAINING",
            "RATELIMIT-RESET",
            "RETRY-AFTER"
        ]

        // Node-fetch / specific fetch implementations might capitalize differently, 
        // but URL standard says headers are case insensitive.
        // We iterate specific keys we care about.
        res.headers.forEach((value, key) => {
            if (rateLimitKeys.includes(key.toUpperCase())) {
                headers.set(key, value)
            }
        })

        return NextResponse.json(data, {
            status: res.status,
            headers
        })
    } catch (error) {
        console.error("Proxy Error:", error)
        return NextResponse.json(
            { error: true, internalError: true, message: "Failed to fetch joke" },
            { status: 500 }
        )
    }
}
