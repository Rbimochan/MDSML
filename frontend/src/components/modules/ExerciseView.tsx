"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function ExerciseView({ onComplete }: { onComplete: () => void }) {
    const [answer, setAnswer] = useState("");
    const [status, setStatus] = useState<"idle" | "correct" | "incorrect">("idle");

    const handleSubmit = () => {
        // Mock validation for λ = 4
        if (answer.trim() === "4") {
            setStatus("correct");
            onComplete();
        } else {
            setStatus("incorrect");
        }
    };

    return (
        <div className="p-8">
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Calculate the Eigenvalue</h2>
                <p className="text-muted-foreground">
                    Find the largest eigenvalue for the following matrix:
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                <div className="flex flex-col justify-center items-center rounded-xl border border-border bg-muted/10 p-10">
                    <div className="font-mono text-2xl bg-background p-6 rounded-lg border border-border shadow-sm">
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <span>3</span><span>1</span>
                            <span>1</span><span>3</span>
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">Matrix A</p>
                </div>

                <div className="flex flex-col justify-center space-y-6">
                    <div className="space-y-4">
                        <label className="block text-sm font-medium">Your Answer (λ₁)</label>
                        <div className="flex gap-4">
                            <input
                                type="text"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                placeholder="Enter value..."
                                className={cn(
                                    "flex h-12 w-full rounded-md border text-lg px-4 bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20",
                                    status === "incorrect" ? "border-error text-error focus:border-error" : "border-input confirm-border-primary",
                                    status === "correct" ? "border-success text-success bg-success/5" : ""
                                )}
                            />
                            <button
                                onClick={handleSubmit}
                                className="rounded-md bg-primary px-6 font-semibold text-primary-foreground hover:bg-primary/90"
                            >
                                Check
                            </button>
                        </div>

                        {status === "correct" && (
                            <div className="flex items-center gap-2 text-success animate-in fade-in slide-in-from-top-2">
                                <CheckCircle2 className="h-5 w-5" />
                                <span className="font-medium">Correct! The eigenvalues are 4 and 2.</span>
                            </div>
                        )}

                        {status === "incorrect" && (
                            <div className="flex items-center gap-2 text-error animate-in fade-in slide-in-from-top-2">
                                <XCircle className="h-5 w-5" />
                                <span className="font-medium">Incorrect. Try setting up the characteristic equation.</span>
                            </div>
                        )}
                    </div>

                    {status === "correct" && (
                        <div className="pt-4 border-t border-border">
                            <button
                                onClick={onComplete} // Redundant click here but good for flow
                                className="w-full flex items-center justify-center rounded-lg bg-secondary px-4 py-3 text-sm font-semibold text-secondary-foreground hover:bg-secondary/80"
                            >
                                Verify with Python <ArrowRight className="ml-2 h-4 w-4" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
