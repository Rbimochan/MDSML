import { ArrowRight, PlayCircle, Clock } from "lucide-react";
import Link from "next/link";

export function NextUpCard() {
    return (
        <div className="group relative overflow-hidden rounded-2xl border border-border bg-background p-6 shadow-sm transition-all hover:shadow-md">
            {/* Background Gradient Blob */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl transition-all group-hover:bg-primary/20" />

            <div className="relative z-10">
                <div className="mb-4 flex items-center justify-between">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                        Current Module
                    </span>
                    <span className="flex items-center text-xs font-medium text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" /> 15 min left
                    </span>
                </div>

                <h2 className="mb-2 text-2xl font-bold text-foreground">
                    Linear Algebra: Eigenvectors
                </h2>
                <p className="mb-6 max-w-lg text-muted-foreground">
                    Master the computation of eigenvalues and eigenvectors to understand dimensionality reduction techniques like PCA.
                </p>

                <div className="flex items-center gap-4">
                    <Link
                        href="/modules/eigenvectors"
                        className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-primary/25 active:translate-y-0"
                    >
                        <PlayCircle className="mr-2 h-4 w-4" />
                        Continue Learning
                    </Link>

                    <div className="h-2 w-32 overflow-hidden rounded-full bg-muted">
                        <div className="h-full w-[65%] rounded-full bg-primary" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">65% Complete</span>
                </div>
            </div>
        </div>
    );
}
