"use client"
import { useState, useEffect } from "react"
import { getFavorites, toggleFavorite } from "@/lib/storage"
import { FavoritesList } from "@/components/favorites-list"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        setFavorites(getFavorites())
    }, [])

    const handleRemove = (joke) => {
        const newFavs = toggleFavorite(joke, favorites)
        setFavorites(newFavs)
    }

    const filtered = favorites.filter(joke => {
        if (!search) return true
        const content = joke.type === "single" ? joke.joke : joke.setup + joke.delivery
        return content.toLowerCase().includes(search.toLowerCase())
    })

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black tracking-tight mb-2">Your Favorites 🌟</h1>
                    <p className="text-muted-foreground">The jokes that made the cut.</p>
                </div>
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search favorites..."
                        className="pl-9 bg-muted/50 border-none shadow-inner"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <FavoritesList favorites={filtered} onRemove={handleRemove} />
        </div>
    )
}
