"use client"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2, Copy } from "lucide-react"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { transitions } from "@/lib/motion"

export function FavoritesList({ favorites, onRemove }) {
    if (!favorites.length) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-lg border-muted h-64">
                <div className="text-4xl mb-4 grayscale opacity-50">😶</div>
                <h3 className="text-lg font-bold">No saved jokes yet</h3>
                <p className="text-muted-foreground max-w-sm mt-2">
                    You have strict standards! Hit the heart icon on the main stage to save your favorites.
                </p>
            </div>
        )
    }

    const copyJoke = (joke) => {
        const text = joke.type === "single" ? joke.joke : `${joke.setup}\n\n${joke.delivery}`
        navigator.clipboard.writeText(text)
        toast.success("Copied to clipboard")
    }

    return (
        <motion.div
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 pb-8"
            variants={transitions.stagger.container}
            initial="hidden"
            animate="show"
        >
            <AnimatePresence mode="popLayout">
                {favorites.map(joke => (
                    <motion.div
                        key={joke.id}
                        layout
                        variants={transitions.stagger.item}
                        exit={{ opacity: 0, scale: 0.8 }}
                    >
                        <Card className="h-full flex flex-col justify-between hover:border-primary/50 transition-colors">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <Badge variant="secondary" className="font-mono text-[10px]">{joke.category}</Badge>
                                    <Badge variant="outline" className="font-mono text-[10px]">#{joke.id}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-4 text-sm font-medium">
                                {joke.type === "single" ? (
                                    <p>{joke.joke}</p>
                                ) : (
                                    <div className="space-y-4">
                                        <p>{joke.setup}</p>
                                        <p className="text-primary font-bold">{joke.delivery}</p>
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter className="flex justify-end gap-2 pt-2 border-t mt-4 bg-muted/20">
                                <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => copyJoke(joke)}>
                                    <Copy className="h-4 w-4" />
                                </Button>
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={() => onRemove(joke)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>
    )
}
