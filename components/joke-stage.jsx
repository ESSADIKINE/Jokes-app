"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Copy, Heart, Share2, Eye, Mic2, Sparkles, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { transitions } from "@/lib/motion"
import { LaughMeter } from "./laugh-meter"
import { TranslatePanel } from "./translate-panel"
import { translateText } from "@/lib/translator-api"
import { Globe } from "lucide-react"

export function JokeStage({ joke, loading, error, onNext, isFavorite, onToggleFavorite }) {
    const [revealed, setRevealed] = useState(false)
    const [showTranslate, setShowTranslate] = useState(false)
    const [translating, setTranslating] = useState(false)
    const [translationResult, setTranslationResult] = useState(null)
    const [translationError, setTranslationError] = useState(null)

    // Auto-reveal if single, hide if twopart
    useEffect(() => {
        if (joke) {
            setRevealed(joke.type === "single")
            setShowTranslate(false)
            setTranslationResult(null)
            setTranslationError(null)
        }
    }, [joke])

    const handleTranslate = async (config) => {
        setTranslating(true)
        setTranslationResult(null)
        setTranslationError(null)
        try {
            const res = await translateText(config)
            if (res.ok) {
                setTranslationResult(res.translated)
            } else {
                setTranslationError(res.error || "Translation failed")
            }
        } catch (err) {
            setTranslationError(err.message)
        } finally {
            setTranslating(false)
        }
    }

    const copyJoke = () => {
        if (!joke) return
        const text = joke.type === "single"
            ? joke.joke
            : `${joke.setup}\n\n${joke.delivery}`

        navigator.clipboard.writeText(text)
        toast.success("Joke copied to clipboard! 📋")
    }

    const shareJoke = async () => {
        if (!joke) return
        const text = joke.type === "single" ? joke.joke : `${joke.setup} ${joke.delivery}`

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Jokes 😄',
                    text: text,
                    url: window.location.href
                })
            } catch (err) {
                console.log('Share cancelled')
            }
        } else {
            copyJoke()
        }
    }

    // Determine flags to show
    const activeFlags = joke?.flags
        ? Object.entries(joke.flags).filter(([k, v]) => v).map(([k]) => k)
        : []

    return (
        <div className="flex flex-col h-full min-h-[400px]">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="bg-primary/20 p-2 rounded-full ring-2 ring-primary/10">
                        <Mic2 className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight">Main Stage</h2>
                </div>
                {joke && <Badge variant="secondary" className="font-mono">#{joke.id}</Badge>}
            </div>

            {/* Stage Card */}
            <div className="flex-1 relative perspective-1000">
                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center justify-center h-full min-h-[300px]"
                        >
                            <div className="flex flex-col items-center gap-4 text-muted-foreground animate-pulse">
                                <Sparkles className="h-10 w-10 text-yellow-500 animate-spin" />
                                <p>Preparing the mic...</p>
                            </div>
                        </motion.div>
                    ) : error ? (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="h-full flex flex-col items-center justify-center text-center p-8 bg-destructive/5 rounded-xl border border-destructive/20"
                        >
                            <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
                            <h3 className="text-lg font-bold text-destructive">Tough Crowd...</h3>
                            <p className="text-muted-foreground mt-2">{error}</p>
                            <Button onClick={onNext} className="mt-4" variant="outline">
                                Try Another
                            </Button>
                        </motion.div>
                    ) : joke ? (
                        <motion.div
                            key={joke.id}
                            variants={transitions.card}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="relative w-full h-full"
                        >
                            <Card className="h-full border-2 border-primary/10 shadow-xl bg-card/60 backdrop-blur-sm shadow-primary/5 flex flex-col">
                                <CardContent className="p-8 md:p-12 flex flex-col items-center justify-center flex-1 text-center space-y-8">

                                    {/* Setup / Single Joke */}
                                    <div className="space-y-6 w-full max-w-2xl">
                                        <h3 className="text-2xl md:text-4xl font-black leading-tight tracking-tight text-foreground">
                                            {joke.type === "single" ? joke.joke : joke.setup}
                                        </h3>
                                    </div>

                                    {/* Punchline (Two Part) */}
                                    {joke.type === "twopart" && (
                                        <div className="w-full max-w-2xl">
                                            <AnimatePresence>
                                                {!revealed ? (
                                                    <motion.div
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                    >
                                                        <Button
                                                            onClick={() => setRevealed(true)}
                                                            size="lg"
                                                            className="rounded-full px-8 font-bold text-lg animate-bounce shadow-lg shadow-primary/20"
                                                        >
                                                            Reveal Punchline 👀
                                                        </Button>
                                                    </motion.div>
                                                ) : (
                                                    <motion.div
                                                        variants={transitions.punchline}
                                                        initial="initial"
                                                        animate="animate"
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="pt-8 pb-4 relative">
                                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                                                            <p className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-500 italic">
                                                                {joke.delivery}
                                                            </p>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    )}

                                    <LaughMeter trigger={revealed || joke.type === "single"} />

                                </CardContent>

                                <TranslatePanel
                                    isOpen={showTranslate}
                                    onClose={() => setShowTranslate(false)}
                                    originalText={joke ? (joke.type === "single" ? joke.joke : `${joke.setup}\n\n${joke.delivery}`) : ""}
                                    onTranslate={handleTranslate}
                                    loading={translating}
                                    result={translationResult}
                                    error={translationError}
                                />

                                {/* Footer Actions */}
                                <div className="p-4 bg-muted/30 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <div className="flex gap-2 flex-wrap">
                                        <Badge variant="outline" className="border-primary/20 bg-primary/5">{joke.category}</Badge>
                                        {joke.lang !== "en" && <Badge variant="outline">{joke.lang}</Badge>}
                                        {activeFlags.map(f => (
                                            <Badge key={f} variant="destructive" className="capitalize">{f}</Badge>
                                        ))}
                                        {joke.safe && <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50/10">Safe</Badge>}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button size="icon" variant="ghost" onClick={copyJoke} title="Copy">
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                        <Button size="icon" variant="ghost" onClick={shareJoke} title="Share">
                                            <Share2 className="h-4 w-4" />
                                        </Button>
                                        <Button size="icon" variant="ghost" onClick={() => setShowTranslate(!showTranslate)} title="Translate">
                                            <Globe className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={() => {
                                                onToggleFavorite(joke)
                                                const exists = isFavorite(joke.id)
                                                if (!exists) toast.success("Added to favorites! ⭐")
                                                else toast.info("Removed from favorites")
                                            }}
                                            className={cn("transition-all", isFavorite(joke.id) && "text-red-500 hover:text-red-600")}
                                        >
                                            <Heart className={cn("h-4 w-4", isFavorite(joke.id) && "fill-current")} />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground">
                            Get started by picking a mood!
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
