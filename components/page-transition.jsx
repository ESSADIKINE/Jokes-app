"use client"
import { motion, AnimatePresence } from "framer-motion"
import { transitions } from "@/lib/motion"
import { usePathname } from "next/navigation"

export function PageTransition({ children }) {
    const pathname = usePathname()

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={transitions.page}
                className="flex-1 w-full flex flex-col"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}
