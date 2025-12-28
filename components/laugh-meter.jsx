"use client"
import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react"

export function LaughMeter({ trigger }) {
    const controls = useAnimation()

    useEffect(() => {
        if (trigger) {
            controls.start({
                width: ["0%", "70%", "50%", "95%", "0%"],
                backgroundColor: ["#facc15", "#fb923c", "#facc15", "#22c55e", "#facc15"],
                transition: { duration: 2.5, ease: "easeInOut" }
            })
        }
    }, [trigger, controls])

    return (
        <div className="w-full space-y-1 my-4">
            <div className="flex justify-between text-[10px] text-muted-foreground uppercase tracking-wider font-bold">
                <span>Audience Laughter</span>
                <span>😂 Loud</span>
            </div>
            <div className="h-1.5 w-full bg-secondary/50 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]"
                    animate={controls}
                    initial={{ width: "0%" }}
                />
            </div>
        </div>
    )
}
