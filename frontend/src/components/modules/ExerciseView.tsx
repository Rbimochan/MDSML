"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { apiClient } from "@/lib/api";

interface ExerciseViewProps {
  onComplete: () => void;
  problemId?: string;
  correctAnswer?: string;
}

export function ExerciseView({ onComplete, problemId, correctAnswer = "4" }: ExerciseViewProps) {
    const [answer, setAnswer] = useState("");
    const [status, setStatus] = useState<"idle" | "correct" | "incorrect" | "loading">("idle");
    const [feedback, setFeedback] = useState<string>("");

    const handleSubmit = async () => {
        if (!answer.trim()) {
            setFeedback("Please enter an answer");
            return;
        }

        setStatus("loading");

        if (problemId) {
            try {
                const result = await apiClient.submitProblem(problemId, undefined, answer.trim());
                
                if (result.is_correct) {
                    setStatus("correct");
                    setFeedback(result.feedback || "Correct! Great job!");
                    setTimeout(onComplete, 1500);
                } else {
                    setStatus("incorrect");
                    setFeedback(result.feedback || "Not quite right. Try again!");
                }
            } catch (error: any) {
                setStatus("incorrect");
                setFeedback(error.detail || "Error submitting answer");
            }
        } else {
            // Fallback: mock validation
            if (answer.trim() === correctAnswer) {
                setStatus("correct");
                setFeedback(`Correct! The answer is ${correctAnswer}.`);
                setTimeout(onComplete, 1500);
            } else {
                setStatus("incorrect");
                setFeedback("Incorrect. Try setting up the characteristic equation.");
            }
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
                                disabled={status === "loading"}
                                placeholder="Enter value..."
                                className={cn(
                                    "flex h-12 w-full rounded-md border text-lg px-4 bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20",
                                    status === "incorrect" ? "border-error text-error focus:border-error" : "border-input",
                                    status === "correct" ? "border-success text-success bg-success/5" : ""
                                )}
                            />
                            <button
                                onClick={handleSubmit}
                                disabled={status === "loading" || !answer}
                                className="rounded-md bg-primary px-6 font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                            >
                                {status === "loading" ? "..." : "Check"}
                            </button>
                        </div>

                        {feedback && (
                            <div className={cn(
                                "flex items-center gap-2 animate-in fade-in slide-in-from-top-2",
                                status === "correct" ? "text-success" : "text-error"
                            )}>
                                {status === "correct" ? (
                                    <CheckCircle2 className="h-5 w-5" />
                                ) : (
                                    <XCircle className="h-5 w-5" />
                                )}
                                <span className="font-medium">{feedback}</span>
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
