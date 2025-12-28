export const transitions = {
    page: {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        transition: { duration: 0.3, ease: "easeInOut" }
    },
    card: {
        initial: { opacity: 0, scale: 0.95, y: 20 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
        transition: { type: "spring", stiffness: 300, damping: 25 }
    },
    punchline: {
        initial: { opacity: 0, height: 0 },
        animate: { opacity: 1, height: "auto" },
        exit: { opacity: 0, height: 0 },
        transition: { duration: 0.3, ease: "easeOut" }
    },
    stagger: {
        container: {
            hidden: { opacity: 0 },
            show: {
                opacity: 1,
                transition: {
                    staggerChildren: 0.1
                }
            }
        },
        item: {
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 }
        }
    }
}
