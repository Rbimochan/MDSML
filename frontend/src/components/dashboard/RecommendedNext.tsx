import { ArrowRight, AlertTriangle, PlayCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function RecommendedNext() {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Review Card - Warning/Yellow */}
            <div className="group relative overflow-hidden rounded-xl border border-warning/20 bg-warning/5 p-5 transition-all hover:border-warning/50 hover:shadow-sm">
                <div className="flex items-start justify-between">
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <span className="inline-flex items-center rounded-md bg-warning/10 px-2 py-1 text-xs font-medium text-warning-foreground text-yellow-600 dark:text-yellow-500">
                                <AlertTriangle className="mr-1 h-3 w-3" />
                                Review Needed
                            </span>
                        </div>
                        <h3 className="mb-1 text-lg font-semibold text-foreground">
                            Linear Transformations
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Your mastery dropped to 60%. Quick review recommended.
                        </p>
                    </div>
                </div>
                <div className="mt-4">
                    <Link
                        href="/modules/linear-transformations/review"
                        className="inline-flex items-center text-sm font-semibold text-warning-foreground text-yellow-700 hover:text-yellow-800 dark:text-yellow-500 dark:hover:text-yellow-400"
                    >
                        Start Review <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>

            {/* Challenge Card - Green/Success */}
            <div className="group relative overflow-hidden rounded-xl border border-success/20 bg-success/5 p-5 transition-all hover:border-success/50 hover:shadow-sm">
                <div className="flex items-start justify-between">
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <span className="inline-flex items-center rounded-md bg-success/10 px-2 py-1 text-xs font-medium text-success text-green-600 dark:text-green-500">
                                <PlayCircle className="mr-1 h-3 w-3" />
                                Recommended Next
                            </span>
                        </div>
                        <h3 className="mb-1 text-lg font-semibold text-foreground">
                            Challenge: Eigenvalue Computation
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Ready for advanced problems? Earn 2x points.
                        </p>
                    </div>
                </div>
                <div className="mt-4">
                    <Link
                        href="/modules/eigenvalues/challenge"
                        className="inline-flex items-center text-sm font-semibold text-success text-green-700 hover:text-green-800 dark:text-green-500 dark:hover:text-green-400"
                    >
                        Accept Challenge <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
