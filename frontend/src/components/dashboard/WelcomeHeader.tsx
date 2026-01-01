import { Zap, Trophy, Target } from "lucide-react";

export function WelcomeHeader({ userName = "Alex" }: { userName?: string }) {
    return (
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Welcome back, {userName}
                </h1>
                <p className="mt-1 text-muted-foreground">
                    You're on a roll! Continue your journey in Linear Algebra.
                </p>
            </div>

            <div className="flex gap-3">
                <div className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 shadow-sm">
                    <Zap className="h-4 w-4 text-warning fill-warning" />
                    <span className="text-sm font-medium">7 Day Streak</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 shadow-sm">
                    <Trophy className="h-4 w-4 text-primary fill-primary" />
                    <span className="text-sm font-medium">Top 5%</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 shadow-sm">
                    <Target className="h-4 w-4 text-error fill-error" />
                    <span className="text-sm font-medium">85% Mastery</span>
                </div>
            </div>
        </div>
    );
}
