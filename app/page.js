"use client"

import { useState, useEffect, useCallback } from "react"
import { ControlBooth } from "@/components/control-booth"
import { JokeStage } from "@/components/joke-stage"
import { useKeyboardShortcuts } from "@/lib/shortcuts"
import { parseRateLimitHeaders } from "@/lib/rateLimit"
import { getFavorites, toggleFavorite } from "@/lib/storage"
import { toast } from "sonner"

export default function Home() {
  const [filters, setFilters] = useState({
    categories: ["Any"],
    blacklistFlags: ["nsfw", "racist", "sexist", "explicit"],
    lang: "en",
    type: "Any",
    contains: "",
    amount: 1,
    safeMode: true
  })

  // Start with null joke
  const [joke, setJoke] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [rateLimit, setRateLimit] = useState({ remaining: null, reset: null })
  const [favorites, setFavoritesState] = useState([])
  const [retryCountdown, setRetryCountdown] = useState(0)

  // Load favorites on mount
  useEffect(() => {
    setFavoritesState(getFavorites())
  }, [])

  const fetchJoke = useCallback(async (overrideFilters = {}) => {
    if (retryCountdown > 0) {
      toast.error(`Rate limit hit! Wait ${retryCountdown}s`)
      return
    }

    setLoading(true)
    setError(null)

    // Merge current filters with overrides (like surprise)
    const activeFilters = { ...filters, ...overrideFilters }

    // Build query params manually because helper handles the logic but we need to pass strict params to our proxy
    const params = new URLSearchParams()

    // Convert array to string for URL
    if (activeFilters.categories.join(",") !== "Any") {
      params.set("categories", activeFilters.categories.join(","))
    }

    if (activeFilters.blacklistFlags && activeFilters.blacklistFlags.length > 0) {
      params.set("blacklistFlags", activeFilters.blacklistFlags.join(","))
    }

    params.set("lang", activeFilters.lang)

    if (activeFilters.type !== "Any") {
      params.set("type", activeFilters.type)
    }

    if (activeFilters.contains) {
      params.set("contains", activeFilters.contains)
    }

    if (activeFilters.amount > 1) {
      params.set("amount", activeFilters.amount)
    }

    if (activeFilters.safeMode) {
      params.set("safe-mode", "")
    }

    try {
      const res = await fetch(`/api/jokes?${params.toString()}`)

      // Check for fetch error
      if (!res.ok && res.status !== 429) {
        throw new Error(`Error: ${res.statusText}`)
      }

      // Handle Rate Limit Headers
      const rLimit = parseRateLimitHeaders(res.headers)
      setRateLimit(prev => ({ ...prev, ...rLimit }))

      if (res.status === 429) {
        const waitTime = rLimit.retryAfter || 60
        setRetryCountdown(waitTime)
        setError(`Rate limit hit! Please wait ${waitTime} seconds.`)
        return
      }

      const data = await res.json()

      if (data.error) {
        // JokeAPI internal error (e.g. no jokes found)
        setError(data.message || "No jokes found with these filters!")
        setJoke(null)
        if (data.active) {
          // Rate limit triggered inside JSON sometimes
          setRetryCountdown(60)
          setError("Rate limit hit!")
        }
      } else {
        setJoke(data)
      }

    } catch (err) {
      setError(err.message || "Failed to fetch")
      setJoke(null)
    } finally {
      setLoading(false)
    }
  }, [filters, retryCountdown])

  // Countdown timer
  useEffect(() => {
    if (retryCountdown > 0) {
      const timer = setInterval(() => {
        setRetryCountdown(c => c - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [retryCountdown])

  const handleFavorite = (targetJoke) => {
    if (!targetJoke) return
    const newFavs = toggleFavorite(targetJoke, favorites)
    setFavoritesState(newFavs)
  }

  // Shortcuts
  useKeyboardShortcuts({
    "j": () => fetchJoke(),
    "alt+j": () => fetchJoke(), // some browsers block j
    "enter": () => fetchJoke(),
  })

  const isFavorite = (id) => favorites.some(f => f.id === id)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-8rem)] min-h-[600px]">
      {/* Control Booth */}
      <div className="lg:col-span-4 xl:col-span-3">
        <ControlBooth
          filters={filters}
          setFilters={setFilters}
          onGetJoke={(mode) => {
            if (mode === "surprise") {
              // Surprise: Reset specific filters logic can go here
              // For now just fetch with current settings or pure random
              fetchJoke()
            } else {
              fetchJoke()
            }
          }}
          loading={loading || retryCountdown > 0}
          rateLimit={rateLimit}
        />
      </div>

      {/* Main Stage */}
      <div className="lg:col-span-8 xl:col-span-9 h-full flex flex-col">
        <JokeStage
          joke={joke}
          loading={loading}
          error={error}
          onNext={() => fetchJoke()}
          isFavorite={isFavorite}
          onToggleFavorite={handleFavorite}
        />
      </div>
    </div>
  )
}
