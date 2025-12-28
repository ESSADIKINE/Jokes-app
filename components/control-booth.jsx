"use client"

import { Search, Dice5, Eraser } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"

const CATEGORIES = ["Programming", "Misc", "Dark", "Pun", "Spooky", "Christmas"]
const FLAGS = ["nsfw", "religious", "political", "racist", "sexist", "explicit"]
const LANGUAGES = [
    { value: "en", label: "English" },
    { value: "cs", label: "Czech" },
    { value: "de", label: "German" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" },
    { value: "pt", label: "Portuguese" },
]

const MOODS = [
    { id: "geek", label: "Geek Mode 🤓", filters: { categories: ["Programming"] } },
    { id: "pun", label: "Pun Party 😆", filters: { categories: ["Pun"] } },
    { id: "spooky", label: "Spooky 👻", filters: { categories: ["Spooky"] } },
    { id: "holiday", label: "Holiday 🎄", filters: { categories: ["Christmas"] } },
    { id: "wildcard", label: "Wildcard 🎲", filters: { categories: ["Any"] } },
]

export function ControlBooth({ filters, setFilters, onGetJoke, loading, rateLimit }) {
    const updateFilter = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }))
    }

    const applyMood = (mood) => {
        setFilters(prev => ({
            ...prev,
            ...mood.filters,
            // Reset others
            contains: "",
        }))
    }

    return (
        <Card className="h-full border-muted/40 shadow-sm">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold">Control Booth 🎛️</CardTitle>
                    {rateLimit && (
                        <span className={cn(
                            "text-xs font-mono px-2 py-1 rounded bg-muted",
                            rateLimit.remaining < 10 && "text-destructive bg-destructive/10"
                        )}>
                            Limit: {rateLimit.remaining}
                        </span>
                    )}
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Moods */}
                <div className="space-y-2">
                    <Label>Mood Presets</Label>
                    <div className="flex flex-wrap gap-2">
                        {MOODS.map(mood => (
                            <Button
                                key={mood.id}
                                variant="outline"
                                size="sm"
                                className="h-7 text-xs rounded-full hover:bg-primary/10 hover:text-primary border-primary/20"
                                onClick={() => applyMood(mood)}
                            >
                                {mood.label}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Categories */}
                <div className="space-y-2">
                    <Label>Categories</Label>
                    <ToggleGroup
                        type="multiple"
                        value={filters.categories.includes("Any") ? [] : filters.categories}
                        onValueChange={(val) => {
                            if (val.length === 0) updateFilter("categories", ["Any"])
                            else updateFilter("categories", val)
                        }}
                        className="justify-start flex-wrap gap-2"
                    >
                        {CATEGORIES.map(cat => (
                            <ToggleGroupItem
                                key={cat}
                                value={cat}
                                aria-label={`Toggle ${cat}`}
                                className="h-7 px-3 text-xs data-[state=on]:bg-primary data-[state=on]:text-primary-foreground border border-input"
                            >
                                {cat}
                            </ToggleGroupItem>
                        ))}
                    </ToggleGroup>
                </div>

                {/* Language & Type */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Language</Label>
                        <Select value={filters.lang} onValueChange={(val) => updateFilter("lang", val)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                                {LANGUAGES.map(l => (
                                    <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Type</Label>
                        <Select value={filters.type} onValueChange={(val) => updateFilter("type", val)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Any" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Any">Any</SelectItem>
                                <SelectItem value="single">Single</SelectItem>
                                <SelectItem value="twopart">Two Part</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Search */}
                <div className="space-y-2">
                    <Label>Contains</Label>
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search string..."
                            className="pl-8"
                            value={filters.contains}
                            onChange={(e) => updateFilter("contains", e.target.value)}
                        />
                    </div>
                </div>

                {/* Blacklist */}
                <div className="space-y-2">
                    <Label>Blacklist Flags</Label>
                    <ToggleGroup
                        type="multiple"
                        value={filters.blacklistFlags}
                        onValueChange={(val) => updateFilter("blacklistFlags", val)}
                        className="justify-start flex-wrap gap-2"
                    >
                        {FLAGS.map(flag => (
                            <ToggleGroupItem
                                key={flag}
                                value={flag}
                                className="h-6 px-2 text-[10px] data-[state=on]:bg-destructive data-[state=on]:text-destructive-foreground border-destructive/30"
                            >
                                {flag}
                            </ToggleGroupItem>
                        ))}
                    </ToggleGroup>
                </div>

                {/* Safe Mode */}
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label>Safe Mode</Label>
                        <p className="text-xs text-muted-foreground">Exclude explicit content</p>
                    </div>
                    <Switch
                        checked={filters.safeMode}
                        onCheckedChange={(val) => updateFilter("safeMode", val)}
                    />
                </div>

                <div className="pt-4 flex flex-col gap-2">
                    <Button
                        size="lg"
                        className="w-full text-base font-semibold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
                        onClick={() => onGetJoke()}
                        disabled={loading}
                    >
                        {loading ? "Fetching..." : "Get Joke 😂"}
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" onClick={() => onGetJoke("surprise")}>
                            Surprise 🎲
                        </Button>
                        <Button variant="ghost" onClick={() => setFilters({
                            categories: ["Any"],
                            blacklistFlags: ["nsfw", "religious", "political", "racist", "sexist", "explicit"],
                            lang: "en",
                            type: "Any",
                            contains: "",
                            amount: 1,
                            safeMode: true
                        })}>
                            Reset <Eraser className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}
