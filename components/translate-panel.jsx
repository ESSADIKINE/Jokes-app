"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Languages, Sparkles, Copy, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export function TranslatePanel({
    isOpen,
    onClose,
    originalText,
    onTranslate,
    loading,
    result,
    error
}) {
    const [targetLang, setTargetLang] = useState("darija_ar")
    const [jokeMode, setJokeMode] = useState(false)

    const handleTranslate = () => {
        onTranslate({
            text: originalText,
            output: targetLang,
            mode: jokeMode ? "joke" : "normal"
        })
    }

    const copyResult = () => {
        if (!result) return
        navigator.clipboard.writeText(result)
        toast.success("Translation copied! 📋")
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-border/50 bg-muted/30 overflow-hidden"
                >
                    <div className="p-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <h4 className="flex items-center gap-2 font-semibold text-sm">
                                <Languages className="h-4 w-4 text-primary" />
                                Translate to Darija
                            </h4>
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onClose}>
                                <X className="h-3 w-3" />
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Controls */}
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-xs">Target Script</Label>
                                    <Select value={targetLang} onValueChange={setTargetLang}>
                                        <SelectTrigger className="h-8">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="darija_ar">Darija (Arabic 🇲🇦)</SelectItem>
                                            <SelectItem value="darija_latin">Darija (Latin)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex items-center justify-between bg-background p-2 rounded border border-input">
                                    <div className="flex flex-col">
                                        <Label className="text-xs font-semibold flex items-center gap-1">
                                            Joke Mode <Sparkles className="h-3 w-3 text-yellow-500" />
                                        </Label>
                                        <span className="text-[10px] text-muted-foreground">Optimize for humor</span>
                                    </div>
                                    <Switch checked={jokeMode} onCheckedChange={setJokeMode} />
                                </div>

                                <Button
                                    size="sm"
                                    className="w-full"
                                    onClick={handleTranslate}
                                    disabled={loading || !originalText}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-3 w-3 animate-spin" /> Translating...
                                        </>
                                    ) : "Translate Now"}
                                </Button>
                            </div>

                            {/* Output */}
                            <div className="relative">
                                <Textarea
                                    readOnly
                                    placeholder="Translation will appear here..."
                                    value={result || (error ? `Error: ${error}` : "")}
                                    className={cn(
                                        "h-full min-h-[120px] resize-none text-sm bg-background pr-8",
                                        error && "border-destructive text-destructive",
                                        result && targetLang === "darija_ar" && "font-arabic text-right dir-rtl"
                                    )}
                                />
                                {result && (
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="absolute top-2 right-2 h-6 w-6"
                                        onClick={copyResult}
                                    >
                                        <Copy className="h-3 w-3" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
