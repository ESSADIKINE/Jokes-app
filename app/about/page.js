"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Activity, Server, AlertCircle } from "lucide-react"
import { toast } from "sonner"

export default function AboutPage() {
    const [info, setInfo] = useState(null)
    const [ping, setPing] = useState(null)

    useEffect(() => {
        fetch("/api/meta/info").then(res => res.json()).then(setInfo).catch(console.error)
    }, [])

    const handlePing = async () => {
        const start = Date.now()
        try {
            const res = await fetch("/api/meta/ping")
            const end = Date.now()
            if (res.ok) {
                setPing(end - start)
                toast.success(`Pong! Took ${end - start}ms`)
            }
        } catch {
            toast.error("Ping failed")
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fly-in-y-4 duration-500">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-black tracking-tight">About Jokes 😄</h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    A premium joke experience powered by JokeAPI, built with Next.js 14, standardized with Tailwind CSS and shadcn/ui.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Server className="h-5 w-5" />
                            API Statistics
                        </CardTitle>
                        <CardDescription>Real-time data from JokeAPI</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {info ? (
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Version</span>
                                    <span className="font-mono">{info.version}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Total Jokes</span>
                                    <span className="font-mono font-bold text-primary">{info.jokes?.totalCount}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Safe Jokes</span>
                                    <span className="font-mono">{info.jokes?.safeJokesCount}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-muted-foreground">Status</span>
                                    <Button size="sm" variant="outline" onClick={handlePing}>
                                        {ping ? `Ping: ${ping}ms` : "Ping API"}
                                        <Activity className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="animate-pulse h-20 bg-muted/20 rounded" />
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <AlertCircle className="h-5 w-5" />
                            Rate Limiting
                        </CardTitle>
                        <CardDescription>How we handle API traffic</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm text-muted-foreground">
                        <p>
                            JokeAPI imposes a limit of approximately <strong>120 requests per minute</strong>.
                        </p>
                        <div className="bg-muted p-4 rounded-lg flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <Badge variant="outline">429</Badge>
                                <span>Too Many Requests</span>
                            </div>
                            <p>
                                If you hit the limit, we automatically catch the 429 error and reading the <code>Retry-After</code> header to show you a countdown.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
