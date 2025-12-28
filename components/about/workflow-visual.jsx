"use client"

import { motion } from "framer-motion"
import { NextJsLogo, CloudflareLogo, DeepSeekLogo, ShieldLock } from "./tech-logos"
import { ArrowRight, Lock, Database, Code2 } from "lucide-react"

export function WorkflowVisual() {
    return (
        <div className="w-full py-12 px-4">
            {/* Desktop Horizontal Workflow */}
            <div className="hidden md:flex items-center justify-center gap-4 relative">
                <Node
                    icon={<NextJsLogo className="h-12 w-12" />}
                    label="Next.js Frontend"
                    sub="Browser"
                    delay={0}
                />

                <Connector />

                <Node
                    icon={<CloudflareLogo className="h-12 w-12" />}
                    label="Cloudflare Worker"
                    sub="Secure Proxy"
                    delay={0.2}
                    badged
                />

                <Connector />

                <Node
                    icon={<DeepSeekLogo className="h-12 w-12 text-blue-500" />}
                    label="DeepSeek LLM"
                    sub="AI Engine"
                    delay={0.4}
                />
            </div>

            {/* Mobile Vertical Workflow */}
            <div className="flex flex-col md:hidden items-center gap-8">
                <Node
                    icon={<NextJsLogo className="h-12 w-12" />}
                    label="Next.js"
                    sub="Frontend"
                    delay={0}
                />
                <ArrowRight className="h-6 w-6 rotate-90 text-muted-foreground/50" />
                <Node
                    icon={<CloudflareLogo className="h-12 w-12" />}
                    label="Worker"
                    sub="Secure Proxy"
                    delay={0.2}
                    badged
                />
                <ArrowRight className="h-6 w-6 rotate-90 text-muted-foreground/50" />
                <Node
                    icon={<DeepSeekLogo className="h-12 w-12 text-blue-500" />}
                    label="DeepSeek"
                    sub="LLM"
                    delay={0.4}
                />
            </div>
        </div>
    )
}

function Node({ icon, label, sub, delay, badged }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className="flex flex-col items-center gap-3 relative group"
        >
            <div className="relative p-6 rounded-2xl bg-card border border-border/50 shadow-xl backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-primary/10 group-hover:border-primary/20">
                {icon}
                {badged && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: delay + 0.5, type: "spring" }}
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

function Connector() {
    return (
        <div className="h-1 w-24 bg-muted relative overflow-hidden rounded-full mx-2">
            <motion.div
                className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
        </div>
    )
}
