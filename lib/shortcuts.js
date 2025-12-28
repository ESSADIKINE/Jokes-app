import { useEffect } from "react"

export function useKeyboardShortcuts(shortcuts) {
    useEffect(() => {
        const handleKeyDown = (event) => {
            // Ignore if typing in input
            if (["INPUT", "TEXTAREA"].includes(event.target.tagName)) return

            const key = event.key.toLowerCase()
            const ctrl = event.ctrlKey || event.metaKey
            const shift = event.shiftKey
            const alt = event.altKey

            // Build key string: 'j', 'ctrl+j', 'shift+j'
            const parts = []
            if (ctrl) parts.push("ctrl")
            if (alt) parts.push("alt")
            if (shift) parts.push("shift")
            parts.push(key)

            const keyCombo = parts.join("+")

            const handler = shortcuts[keyCombo]
            if (handler) {
                event.preventDefault()
                handler()
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [shortcuts])
}
