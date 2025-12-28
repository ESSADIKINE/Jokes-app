export const BASE_URL = "https://v2.jokeapi.dev/joke/"

export function buildJokeUrl(params) {
  const {
    categories = ["Any"],
    blacklistFlags = [],
    lang = "en",
    type = "Any",
    contains = "",
    amount = 1,
    safeMode = false,
  } = params

  // Categories
  // If categories are empty, default to Any is handled by caller or default arg, 
  // but if explicit empty array passed, might want 'Any'. 
  // API format: /joke/Cat1,Cat2
  const categoryPath = (categories && categories.length > 0 && !categories.includes("Any")) 
    ? categories.join(",") 
    : "Any"

  const searchParams = new URLSearchParams()

  // Blacklist
  if (blacklistFlags && blacklistFlags.length > 0) {
    searchParams.set("blacklistFlags", blacklistFlags.join(","))
  }

  // Language
  if (lang && lang !== "en") {
    searchParams.set("lang", lang)
  }

  // Type
  if (type && type !== "Any") {
    searchParams.set("type", type.toLowerCase())
  }

  // Contains
  if (contains.trim()) {
    searchParams.set("contains", contains.trim())
  }

  // Amount
  if (amount > 1) {
    searchParams.set("amount", amount.toString())
  }

  // Safe Mode
  if (safeMode) {
    searchParams.set("safe-mode", "")
  }

  const queryString = searchParams.toString()
  return `${BASE_URL}${categoryPath}${queryString ? "?" + queryString : ""}`
}
