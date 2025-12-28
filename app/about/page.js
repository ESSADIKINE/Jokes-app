"use client"

import { motion } from "framer-motion"
import { Shield, Zap, Sparkles, Server, Lock, ExternalLink, ArrowRight, Layers, Keyboard, Star, Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ArchitectureVisual } from "@/components/about/architecture-visual"
import { FeatureCard } from "@/components/about/feature-card"
import { AboutHero } from "@/components/about/about-hero"
import { NextJsLogo, CloudflareLogo, DeepSeekLogo, TailwindLogo, FramerLogo, ShadcnLogo, JokeApiLogo } from "@/components/about/tech-logos-extended"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function AboutPage() {
    return (
        <div className="container mx-auto max-w-6xl py-12 md:py-20 space-y-32">

            <AboutHero />

            {/* Feature Pillars */}
            <section className="grid md:grid-cols-3 gap-6">
                <FeatureCard
                    icon={<Layers className="h-5 w-5" />}
                    title="Jokes Discovery"
                    description="Browse thousands of jokes with granular filters for category, type, and safety flags. Powered by our custom Next.js proxy for optimal performance."
                    className="h-full"
                />
                <FeatureCard
                    icon={<Sparkles className="h-5 w-5" />}
                    title="AI Translation"
                    description="Instantly translate humor into Moroccan Darija (Arabic or Latin) using our secure AI pipeline acting as a cultural bridge."
                    className="h-full bg-primary/5 border-primary/20"
                />
                <FeatureCard
                    icon={<Keyboard className="h-5 w-5" />}
                    title="Power User UX"
                    description="Designed for speed with keyboard shortcuts (J, R, F), favorites management, and responsive animations that feel alive."
                    className="h-full"
                />
            </section>

            {/* Architecture Visual */}
            <section className="scroll-mt-24 space-y-8" id="architecture">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl md:text-3xl font-bold tracking-tight">Dual-Pipeline Architecture</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Two distinct, optimized workflows handle content delivery and AI processing independently.
                    </p>
                </div>
                <div className="bg-muted/20 border border-border/50 rounded-3xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-grid-white/5 opacity-10 pointer-events-none" />
                    <ArchitectureVisual />
                </div>
            </section>

            {/* Tech Stack */}
            <section className="space-y-12">
                <div className="text-center">
                    <h2 className="text-2xl font-bold tracking-tight mb-2">Built With</h2>
                    <p className="text-muted-foreground">Modern stack for maximum performance.</p>
                </div>

                <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-80 hover:opacity-100 transition-opacity">
                    <TechItem icon={<NextJsLogo className="h-10 w-10" />} label="Next.js 14" />
                    <TechItem icon={<CloudflareLogo className="h-10 w-10" />} label="Workers" />
                    <TechItem icon={<DeepSeekLogo className="h-10 w-10 text-blue-500" />} label="DeepSeek" />
                    <TechItem icon={<TailwindLogo className="h-10 w-10" />} label="Tailwind" />
                    <TechItem icon={<ShadcnLogo className="h-10 w-10 text-foreground" />} label="shadcn/ui" />
                    <TechItem icon={<FramerLogo className="h-10 w-10" />} label="Motion" />
                    <TechItem icon={<JokeApiLogo className="h-10 w-10 text-primary" />} label="JokeAPI" />
                </div>
            </section>

        </div>
    )
}

function TechItem({ icon, label }) {
    return (
        <div className="flex flex-col items-center gap-3">
            <div className="p-3 bg-muted/30 rounded-xl">
                {icon}
            </div>
            <span className="text-sm font-medium">{label}</span>
        </div>
    )
}
