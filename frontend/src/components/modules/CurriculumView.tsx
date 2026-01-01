"use client";

import { useState } from "react";
import { Lock, CheckCircle, Circle, ArrowRight, Star, Trophy } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { GatekeeperModal } from "@/components/modules/GatekeeperModal";

export interface Topic {
    id: string;
    title: string;
    description: string;
    status: 'locked' | 'active' | 'completed';
    points: number;
}

export interface Tier {
    id: number;
    title: string;
    description: string;
    requiredPoints: number;
    isLocked: boolean;
    topics: Topic[];
    gatekeeperExam?: {
        title: string;
        passingScore: number;
        questions: number;
    };
}

interface CurriculumViewProps {
    title: string;
    description: string;
    initialTiers: Tier[];
    basePath: string; // e.g. "/foundation/linear-algebra"
}

export function CurriculumView({ title, description, initialTiers, basePath }: CurriculumViewProps) {
    const [tiers, setTiers] = useState<Tier[]>(initialTiers);
    const [userPoints, setUserPoints] = useState(1250); // Mock starting points
    const [isGatekeeperOpen, setIsGatekeeperOpen] = useState(false);
    const [activeGatekeeperTier, setActiveGatekeeperTier] = useState<number | null>(null);

    const handleTierComplete = (tierId: number) => {
        // Unlock next tier
        const nextTierId = tierId + 1;
        if (nextTierId <= tiers.length) {
            setTiers(prev => prev.map(t =>
                t.id === nextTierId ? { ...t, isLocked: false } : t
            ));
        }
    };

    const handleStartGatekeeper = (tierId: number) => {
        setActiveGatekeeperTier(tierId);
        setIsGatekeeperOpen(true);
    };

    return (
        <div className="min-h-screen bg-background text-foreground p-8 pb-32">
            <div className="max-w-4xl mx-auto space-y-12">

                {/* Header */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
                            <p className="text-lg text-muted-foreground mt-2">{description}</p>
                        </div>
                        <div className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-full border border-border">
                            <Trophy className="text-yellow-500 h-5 w-5" />
                            <span className="font-mono font-bold">{userPoints} XP</span>
                        </div>
                    </div>
                </div>

                {/* Timeline / Tiers */}
                <div className="relative space-y-16 pl-8 before:absolute before:left-3.5 before:top-4 before:h-full before:w-0.5 before:bg-border/50">

                    {tiers.map((tier, index) => (
                        <div key={tier.id} className={cn("relative transition-all duration-500", tier.isLocked ? "opacity-50 blur-[2px] hover:blur-none hover:opacity-75" : "opacity-100")}>

                            {/* Tier Connector Node */}
                            <div className={cn(
                                "absolute -left-[35px] top-2 flex h-8 w-8 items-center justify-center rounded-full border-4 transition-colors",
                                tier.isLocked
                                    ? "border-background bg-muted text-muted-foreground"
                                    : "border-background bg-primary text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.5)]"
                            )}>
                                {tier.isLocked ? <Lock size={14} /> : <span className="text-xs font-bold">{tier.id}</span>}
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold">{tier.title}</h2>
                                    {!tier.isLocked && (
                                        <span className="text-xs font-medium px-2 py-1 rounded bg-green-500/10 text-green-500 border border-green-500/20">
                                            Current Tier
                                        </span>
                                    )}
                                </div>
                                <p className="text-muted-foreground">{tier.description}</p>

                                {/* Topics Grid */}
                                <div className="grid gap-4 md:grid-cols-2">
                                    {tier.topics.map((topic) => (
                                        <Link
                                            key={topic.id}
                                            href={tier.isLocked ? "#" : `${basePath}/${topic.id}`}
                                            className={cn(
                                                "group relative flex items-center gap-4 rounded-xl border p-4 transition-all",
                                                tier.isLocked
                                                    ? "pointer-events-none border-border bg-muted/50"
                                                    : "border-border bg-card hover:border-primary/50 hover:shadow-lg hover:-translate-y-1"
                                            )}
                                        >
                                            <div className={cn(
                                                "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors",
                                                topic.status === 'completed' ? "bg-green-500/10 text-green-500" :
                                                    topic.status === 'active' ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                                            )}>
                                                {topic.status === 'completed' ? <CheckCircle size={20} /> :
                                                    topic.status === 'active' ? <Circle size={20} /> : <Lock size={20} />}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-semibold truncate">{topic.title}</h3>
                                                    {topic.status === 'completed' && <Star size={12} className="text-yellow-500 fill-yellow-500" />}
                                                </div>
                                                <p className="text-xs text-muted-foreground truncate">{topic.description}</p>
                                            </div>

                                            <ArrowRight size={16} className="opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-muted-foreground" />
                                        </Link>
                                    ))}
                                </div>

                                {/* Gatekeeper Exam Access */}
                                {!tier.isLocked && tier.gatekeeperExam && (
                                    <div className="mt-6 rounded-xl border border-dashed border-primary/30 bg-primary/5 p-6 text-center">
                                        <h3 className="font-semibold text-primary mb-2">Tier {tier.id} Gatekeeper: {tier.gatekeeperExam.title}</h3>
                                        <p className="text-sm text-muted-foreground mb-4">Pass this exam to unlock Tier {tier.id + 1}.</p>
                                        <button
                                            onClick={() => handleStartGatekeeper(tier.id)}
                                            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                                        >
                                            Start Gatekeeper Exam <ArrowRight size={16} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Gatekeeper Modal */}
            <GatekeeperModal
                isOpen={isGatekeeperOpen}
                onClose={() => setIsGatekeeperOpen(false)}
                tierTitle={activeGatekeeperTier ? `Tier ${activeGatekeeperTier}: ${tiers.find(t => t.id === activeGatekeeperTier)?.gatekeeperExam?.title || "Exam"}` : "Exam"}
                onUnlock={() => {
                    if (activeGatekeeperTier) {
                        handleTierComplete(activeGatekeeperTier);
                        setIsGatekeeperOpen(false);
                    }
                }}
            />
        </div>
    );
}
