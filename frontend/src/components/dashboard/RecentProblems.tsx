import { CheckCircle2, XCircle, AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Update mock data
const problems = [
    {
        id: 1,
        title: "Matrix Multiplication Basics",
        module: "Linear Algebra",
        status: "completed",
        score: "100%",
        date: "2 hours ago",
        review: false,
    },
    {
        id: 2,
        title: "Determinants of 3x3 Matrices",
        module: "Linear Algebra",
        status: "completed",
        score: "90%",
        date: "5 hours ago",
        review: false,
    },
    {
        id: 3,
        title: "Eigenvalue Computation",
        module: "Linear Algebra",
        status: "failed",
        score: "45%",
        date: "Yesterday",
        review: true,
    },
    {
        id: 4,
        title: "Vector Spaces Introduction",
        module: "Linear Algebra",
        status: "in_progress",
        score: "-",
        date: "Yesterday",
        review: false,
    },
    {
        id: 5,
        title: "Gaussian Elimination",
        module: "Linear Algebra",
        status: "completed",
        score: "85%",
        date: "2 days ago",
        review: false
    }
];


const StatusIcon = ({ status }: { status: string }) => {
    switch (status) {
        case "completed":
            return <CheckCircle2 className="h-5 w-5 text-success" />;
        case "failed":
            return <XCircle className="h-5 w-5 text-error" />;
        case "in_progress":
            return <AlertCircle className="h-5 w-5 text-warning" />;
        default:
            return null;
    }
};

export function RecentProblems() {
    return (
        <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-foreground">Recent Activity</h3>
                <Link href="/practice" className="text-sm font-medium text-primary hover:underline flex items-center">
                    View all <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-border text-muted-foreground">
                            <th className="pb-3 pl-2 font-medium">Problem</th>
                            <th className="pb-3 font-medium">Module</th>
                            <th className="pb-3 font-medium">Status</th>
                            <th className="pb-3 font-medium">Score</th>
                            <th className="pb-3 font-medium">Time</th>
                            <th className="pb-3 font-medium text-right">Review</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {problems.map((problem) => (
                            <tr key={problem.id} className="group hover:bg-muted/50 transition-colors">
                                <td className="py-3 pl-2 font-medium text-foreground group-hover:text-primary transition-colors">
                                    {problem.title}
                                </td>
                                <td className="py-3 text-muted-foreground">{problem.module}</td>
                                <td className="py-3">
                                    <div className="flex items-center gap-2">
                                        <StatusIcon status={problem.status} />
                                        <span className="capitalize text-muted-foreground text-xs">
                                            {problem.status.replace("_", " ")}
                                        </span>
                                    </div>
                                </td>
                                <td className="py-3 font-medium">
                                    <span className={cn(
                                        problem.score === "100%" ? "text-success" :
                                            problem.score === "45%" ? "text-error" : "text-muted-foreground"
                                    )}>
                                        {problem.score}
                                    </span>
                                </td>
                                <td className="py-3 text-muted-foreground">{problem.date}</td>
                                <td className="py-3 text-right">
                                    {problem.review ? (
                                        <button className="text-xs font-medium text-warning hover:text-warning/80">
                                            Needs Review
                                        </button>
                                    ) : (
                                        <span className="text-muted-foreground/30">-</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
