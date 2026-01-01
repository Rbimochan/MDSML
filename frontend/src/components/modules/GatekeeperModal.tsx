"use client";

import { useState } from "react";
import { X, ShieldCheck, Trophy, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface GatekeeperModalProps {
    isOpen: boolean;
    onClose: () => void;
    tierTitle: string;
    onUnlock: () => void;
}

export function GatekeeperModal({ isOpen, onClose, tierTitle, onUnlock }: GatekeeperModalProps) {
    const [step, setStep] = useState<"intro" | "exam" | "success">("intro");
    // Mock exam state
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleStart = () => setStep("exam");

    const handleSubmit = () => {
        setIsSubmitting(true);
        // Simulate API call / Grading
        setTimeout(() => {
            setIsSubmitting(false);
            setStep("success");
            onUnlock();
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg rounded-2xl bg-background shadow-2xl border border-border overflow-hidden animate-in zoom-in-95 duration-200">

                {/* Header with Close Button */}
                <div className="relative border-b border-border p-6 text-center">
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 rounded-full p-2 hover:bg-muted transition-colors"
                    >
                        <X className="h-4 w-4 text-muted-foreground" />
                    </button>

                    {step === "intro" && (
                        <div className="flex flex-col items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <h2 className="text-xl font-bold">Unlock Tier: {tierTitle}</h2>
                        </div>
                    )}

                    {step === "exam" && (
                        <div className="flex flex-col items-center gap-3">
                            <h2 className="text-xl font-bold">Gatekeeper Exam</h2>
                            <p className="text-sm text-muted-foreground">Prove your mastery of {tierTitle}</p>
                        </div>
                    )}

                    {step === "success" && (
                        <div className="flex flex-col items-center gap-3">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
                                <Trophy className="h-8 w-8 fill-current" />
                            </div>
                            <h2 className="text-xl font-bold text-success">Exam Passed!</h2>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-6">
                    {step === "intro" && (
                        <div className="space-y-4 text-center">
                            <p className="text-muted-foreground">
                                To advance to the next tier, you must pass a comprehensive exam covering the current topics.
                            </p>
                            <div className="rounded-lg bg-muted/50 p-4 text-sm">
                                <ul className="space-y-2 text-left">
                                    <li className="flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-foreground" />
                                        <span>10 Questions</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-foreground" />
                                        <span>80% Passing Score</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-foreground" />
                                        <span>No Time Limit</span>
                                    </li>
                                </ul>
                            </div>
                            <button
                                onClick={handleStart}
                                className="w-full rounded-lg bg-primary py-3 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                            >
                                Start Exam
                            </button>
                        </div>
                    )}

                    {step === "exam" && (
                        <div className="space-y-6">
                            {/* Mock Question */}
                            <div className="space-y-3">
                                <p className="font-medium">Question 1 of 10</p>
                                <p className="text-lg">If a vector v is an eigenvector of matrix A, what is A multiplied by v?</p>
                                <div className="space-y-2">
                                    {[
                                        "The zero vector",
                                        "A scalar multiple of v (λv)",
                                        "A vector orthogonal to v",
                                        "The identity matrix"
                                    ].map((option, i) => (
                                        <button
                                            key={i}
                                            className={cn(
                                                "w-full rounded-lg border border-border p-3 text-left text-sm transition-all hover:border-primary hover:bg-primary/5",
                                                i === 1 ? "bg-primary/5 border-primary" : "" // Mock selection
                                            )}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="w-full flex items-center justify-center rounded-lg bg-primary py-3 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
                            >
                                {isSubmitting ? "Submitting..." : "Submit Answers"}
                            </button>
                        </div>
                    )}

                    {step === "success" && (
                        <div className="space-y-4 text-center">
                            <p className="text-muted-foreground">
                                Congratulations! You have unlocked the next tier of the curriculum.
                            </p>
                            <button
                                onClick={onClose}
                                className="w-full flex items-center justify-center gap-2 rounded-lg bg-success py-3 font-semibold text-success-foreground hover:bg-success/90 transition-colors"
                            >
                                Continue Learning <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
