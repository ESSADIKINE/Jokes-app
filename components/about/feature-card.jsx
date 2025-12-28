import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function FeatureCard({ icon, title, description, className }) {
    return (
        <Card className={cn("border-border/50 bg-card/50 backdrop-blur-sm shadow-sm transition-all hover:bg-card/80 hover:shadow-md", className)}>
            <CardHeader>
                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {icon}
                </div>
                <CardTitle className="text-lg font-bold tracking-tight">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {description}
                </p>
            </CardContent>
        </Card>
    )
}
