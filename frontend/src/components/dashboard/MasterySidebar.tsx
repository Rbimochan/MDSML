import { TrendingUp, Award, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

// Simple Progress Ring Component
const ProgressRing = ({
    percent,
    color,
    label
}: {
    percent: number;
    color: string;
    label: string
}) => {
    const radius = 24;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percent / 100) * circumference;

    return (
        <div className="flex items-center gap-3">
            <div className="relative h-14 w-14">
                <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 60 60">
                    <circle
                        className="text-muted"
                        strokeWidth="4"
                        stroke="currentColor"
                        fill="transparent"
                        r={radius}
                        cx="30"
                        cy="30"
                    />
                    <circle
                        style={{ color }}
                        strokeWidth="4"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r={radius}
                        cx="30"
                        cy="30"
                    />
                </svg>
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-foreground">
                    {percent}%
                </span>
            </div>
            <div>
                <p className="text-sm font-medium text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground">Level 4</p>
            </div>
        </div>
    );
};

export function MasterySidebar() {
    return (
        <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-background p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Concept Mastery</h3>
                    <button className="text-muted-foreground hover:text-foreground">
                        <MoreHorizontal className="h-4 w-4" />
                    </button>
                </div>

                <div className="space-y-4">
                    <ProgressRing percent={85} color="var(--success)" label="Vectors" />
                    <ProgressRing percent={60} color="var(--warning)" label="Matrices" />
                    <ProgressRing percent={40} color="var(--error)" label="Eigenvalues" />
                </div>

                <button className="mt-4 w-full rounded-lg bg-muted py-2 text-xs font-medium text-foreground hover:bg-muted/80">
                    View Detailed Analytics
                </button>
            </div>

            <div className="rounded-2xl border border-border bg-primary/5 p-5 shadow-sm">
                <div className="mb-3 flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    <h3 className="font-bold text-primary">Daily Challenge</h3>
                </div>
                <p className="mb-3 text-sm text-muted-foreground">
                    Complete 3 Matrix Multiplication problems to keep your streak!
                </p>
                <div className="h-2 w-full overflow-hidden rounded-full bg-background/50">
                    <div className="h-full w-1/3 rounded-full bg-primary" />
                </div>
                <p className="mt-2 text-xs font-medium text-primary">1/3 Completed</p>
            </div>

            {/* Leaderboard Section */}
            <div className="rounded-2xl border border-border bg-background p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Leaderboard</h3>
                    <button className="text-xs text-primary font-medium hover:underline">View All</button>
                </div>
                <div className="space-y-4">
                    {/* Top Users Mockup */}
                    {[
                        { name: "Jordan Lee", score: 9850, rank: 1, avatar: "J" },
                        { name: "Casey Smith", score: 9200, rank: 2, avatar: "C" },
                        { name: "Alex (You)", score: 8900, rank: 3, avatar: "A" }
                    ].map((user) => (
                        <div key={user.rank} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className={cn(
                                    "flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold",
                                    user.rank === 1 ? "bg-warning/20 text-warning" :
                                        user.rank === 2 ? "bg-muted text-muted-foreground" :
                                            user.rank === 3 ? "bg-orange-500/20 text-orange-600" : "text-muted-foreground"
                                )}>
                                    {user.rank}
                                </span>
                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                                    {user.avatar}
                                </div>
                                <span className="text-sm font-medium text-foreground">{user.name}</span>
                            </div>
                            <span className="text-xs font-bold text-muted-foreground">{user.score}</span>
                        </div>
                    ))}
                </div>
                <div className="mt-4 pt-3 border-t border-border">
                    <p className="text-xs text-center text-muted-foreground">Top 3 users this week</p>
                </div>
            </div>
        </div>
    );
}
