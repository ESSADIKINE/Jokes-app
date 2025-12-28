"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Zap, ShieldCheck } from "lucide-react"

export function AboutHero() {
    return (
        <section className="text-center space-y-8 py-16 relative">
            <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full opacity-50 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10"
            >
                <div className="flex justify-center gap-3 mb-6 flex-wrap">
                    <Badge variant="outline" className="border-primary/20 bg-primary/10 text-primary px-3 py-1">
                        v1.0.0
                    </Badge>
                    <Badge variant="outline" className="border-blue-500/20 bg-blue-500/10 text-blue-500 px-3 py-1">
                        AI-Powered
                    </Badge>
                    <Badge variant="outline" className="border-green-500/20 bg-green-500/10 text-green-500 px-3 py-1">
                        Secure
                    </Badge>
                </div>

                <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
                    <span className="block text-foreground">Premium Comedy,</span>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-blue-500 animate-gradient-x">
                        Engineer Grade.
                    </span>
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    A modern showcase of Next.js 14 architecture, featuring a robust jokes API proxy
                    and a secure, edge-deployed AI translation pipeline.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-center gap-8 pt-8 text-muted-foreground/60"
            >
                <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    <span className="text-sm font-medium">Fast Performance</span>
                </div>
                <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4" />
                    <span className="text-sm font-medium">Edge Security</span>
                </div>
                <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-sm font-medium">Premium UX</span>
                </div>
            </motion.div>
        </section>
    )
}
