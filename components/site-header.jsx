import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-14 max-w-screen-2xl items-center">
                <div className="ml-4 mr-4 flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block text-lg">
                            Jokes 😄
                        </span>
                    </Link>
                    <nav className="flex items-center gap-6 text-sm font-medium">
                        <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/60 hover:text-foreground">Home</Link>
                        <Link href="/favorites" className="transition-colors hover:text-foreground/80 text-foreground/60 hover:text-foreground">Favorites</Link>
                        <Link href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60 hover:text-foreground">About</Link>
                    </nav>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                    </div>
                    <nav className="flex items-center">
                        <ThemeToggle />
                    </nav>
                </div>
            </div>
        </header>
    )
}
