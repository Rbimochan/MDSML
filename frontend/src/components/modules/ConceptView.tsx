"use client";

import { ArrowRight } from "lucide-react";

export function ConceptView({ onComplete }: { onComplete: () => void }) {
    return (
        <div className="p-8">
            <div className="prose prose-slate dark:prose-invert max-w-none">
                <h2>Understanding Eigenvalues</h2>
                <p className="lead">
                    Eigenvalues are a special set of scalars associated with a linear system of equations (i.e., a matrix equation) that are sometimes also known as characteristic roots, characteristic values, proper values, or latent roots.
                </p>

                <div className="my-8 rounded-xl bg-muted/30 p-6 border border-border">
                    <h3 className="text-lg font-semibold mb-4">Geometric Intepretation</h3>
                    <p>
                        If we consider a matrix <strong>A</strong> as a transformation of space, an eigenvector is a vector whose direction does not change when that transformation is applied.
                    </p>
                    <div className="mt-6 flex justify-center">
                        {/* Placeholder for interactive visualization */}
                        <div className="h-64 w-full max-w-lg rounded-lg bg-background border border-border flex items-center justify-center text-muted-foreground">
                            Interactive Visualization Placeholder
                        </div>
                    </div>
                </div>

                <h3>The Characteristic Equation</h3>
                <p>
                    To find the eigenvalues, we solve the characteristic equation:
                </p>
                <div className="my-4 rounded-lg bg-background p-4 border border-border text-center font-mono text-lg">
                    det(A - λI) = 0
                </div>
            </div>

            <div className="mt-8 flex justify-end">
                <button
                    onClick={onComplete}
                    className="flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                    Continue to Exercise <ArrowRight className="ml-2 h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
