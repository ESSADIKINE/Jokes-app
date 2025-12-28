const STORAGE_KEY = "jokes-favorites"

export function getFavorites() {
    if (typeof window === "undefined") return []
    try {
        const saved = localStorage.getItem(STORAGE_KEY)
        return saved ? JSON.parse(saved) : []
    } catch (error) {
        console.error("Failed to parse favorites", error)
        return []
    }
}

export function saveFavorites(favs) {
    if (typeof window === "undefined") return
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favs))
    } catch (error) {
        console.error("Failed to save favorites", error)
    }
}

export function toggleFavorite(joke, currentFavs) {
    const isFav = currentFavs.some(f => f.id === joke.id)
    let newFavs
    if (isFav) {
        newFavs = currentFavs.filter(f => f.id !== joke.id)
    } else {
        // Add to top
        newFavs = [joke, ...currentFavs]
    }
    saveFavorites(newFavs)
    return newFavs
}
