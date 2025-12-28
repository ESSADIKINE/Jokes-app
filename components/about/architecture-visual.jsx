"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { NextJsLogo, CloudflareLogo, DeepSeekLogo, JokeApiLogo } from "./tech-logos-extended"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ArrowLeftRight, Lock, Database, Code2 } from "lucide-react"

export function ArchitectureVisual() {
    return (
        <div className="w-full py-12 px-4">
            <Tabs defaultValue="pipeline-a" className="w-full">
                <div className="flex justify-center mb-8">
                    <TabsList className="grid w-full max-w-md grid-cols-2">
                        <TabsTrigger value="pipeline-a">Jokes Pipeline</TabsTrigger>
                        <TabsTrigger value="pipeline-b">AI Translation</TabsTrigger>
                    </TabsList>
                </div>

                <AnimatePresence mode="wait">
                    <TabsContent key="pipeline-a" value="pipeline-a" className="relative h-[300px]">
                        <PipelineA />
                    </TabsContent>
                    <TabsContent key="pipeline-b" value="pipeline-b" className="relative h-[300px]">
                        <PipelineB />
                    </TabsContent>
                </AnimatePresence>
            </Tabs>
        </div>
    )
}

function PipelineA() {
    return (
        <div className="flex items-center justify-center gap-4 md:gap-8 h-full">
            <Node
                icon={<NextJsLogo className="h-12 w-12" />}
                label="Browser UI"
                sub="Next.js Client"
            />
            <Connector label="GET /api/jokes" />
            <Node
                icon={<Code2 className="h-12 w-12 text-foreground" />}
                label="Route Handler"
                sub="Proxy Layer"
                highlight
            />
            <Connector label="External Fetch" />
            <Node
                icon={<JokeApiLogo className="h-12 w-12 text-primary" />}
                label="JokeAPI"
                sub="v2.jokeapi.dev"
            />
        </div>
    )
}

function PipelineB() {
    return (
        <div className="flex items-center justify-center gap-4 md:gap-8 h-full">
            <Node
                icon={<NextJsLogo className="h-12 w-12" />}
                label="Browser UI"
                sub="Next.js Client"
            />
            <Connector label="POST /translate" />
            <Node
                icon={<CloudflareLogo className="h-12 w-12" />}
                label="Cloudflare Worker"
                sub="Secure Enclave"
                badged
            />
            <Connector label="LLM Inference" />
            <Node
                icon={<DeepSeekLogo className="h-12 w-12 text-blue-500" />}
                label="DeepSeek"
                sub="AI Model"
            />
        </div>
    )
}

function Node({ icon, label, sub, badged, highlight }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-3 relative group"
        >
            <div className={`relative p-6 rounded-2xl bg-card border shadow-xl backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-primary/10 group-hover:border-primary/20 ${highlight ? 'border-primary/50 bg-primary/5' : 'border-border/50'}`}>
                {icon}
                {badged && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="absolute -top-2 -right-2 bg-green-500 text-white p-1.5 rounded-full shadow-lg"
                        title="Secure Environment"
                    >
                        <Lock className="h-3 w-3" />
                    </motion.div>
                )}
            </div>
            <div className="text-center">
                <h4 className="font-bold text-sm tracking-tight">{label}</h4>
                <p className="text-xs text-muted-foreground">{sub}</p>
            </div>
        </motion.div>
    )
}

function Connector({ label }) {
    return (
        <div className="flex flex-col items-center gap-2 w-24 md:w-32">
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{label}</span>
            <div className="h-1 w-full bg-muted relative overflow-hidden rounded-full">
                <motion.div
                    className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-transparent via-primary to-transparent opacity-70"
                    animate={{ x: ["-100%", "300%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
            </div>
        </div>
    )
}
