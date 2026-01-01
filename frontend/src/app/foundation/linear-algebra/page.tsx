"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Lock, PlayCircle, BookOpen, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { GatekeeperModal } from "@/components/modules/GatekeeperModal";

const initialCurriculum = [
    {
        tier: 1,
        title: "The Foundational Structures",
        subtitle: "Data Representation",
        description: "How ML stores \"meaning\" and \"facts\".",
        topics: [
            { id: "scalars-vectors-matrices", title: "Scalars, Vectors, Matrices, and Tensors", status: "completed" },
            { id: "vector-spaces", title: "Vector Spaces and Subspaces", status: "in_progress" },
            { id: "linear-independence", title: "Linear Independence and Span", status: "locked" },
            { id: "basis-change", title: "Basis and Change of Basis", status: "locked" },
        ]
    },
    {
        tier: 2,
        title: "Vector & Matrix Arithmetic",
        subtitle: "The Engine",
        description: "The \"physics\" of moving and comparing data.",
        topics: [
            { id: "matrix-multiplication", title: "Matrix Multiplication (Dot Product)", status: "locked" },
            { id: "hadamard-product", title: "Hadamard Product", status: "locked" },
            { id: "identity-inverse", title: "Identity and Inverse Matrices", status: "locked" },
            { id: "transpose", title: "The Transpose & Normal Equation", status: "locked" },
            { id: "trace-determinant", title: "Matrix Trace and Determinant", status: "locked" },
            { id: "norms", title: "Norms (L1, L2)", status: "locked" },
        ]
    },
    {
        tier: 3,
        title: "Linear Transformations",
        subtitle: "The Behavior",
        description: "How models change data to find patterns.",
        topics: [
            { id: "linear-maps", title: "Linear Maps", status: "locked" },
            { id: "transformations", title: "Scaling, Rotation, and Shearing", status: "locked" },
            { id: "projections", title: "Projections & Semantic Indexing", status: "locked" },
            { id: "kernel-trick", title: "Kernel Trick (Intuition)", status: "locked" },
        ]
    },
    {
        tier: 4,
        title: "Matrix Decomposition",
        subtitle: "The \"Advanced\" Reasoning",
        description: "Breaking down complex systems into simpler, interpretable parts.",
        topics: [
            { id: "eigendecomposition", title: "Eigendecomposition (Eigenvalues/Vectors)", status: "locked" },
            { id: "svd", title: "Singular Value Decomposition (SVD)", status: "locked" },
            { id: "pca", title: "Principal Component Analysis (PCA)", status: "locked" },
            { id: "lu-qr", title: "LU and QR Decomposition", status: "locked" },
        ]
    },
    {
        tier: 5,
        title: "2026 Production Concepts",
        subtitle: "Agentic & Optimization",
        description: "High-speed, high-accuracy production systems.",
        topics: [
            { id: "pseudoinverse", title: "Moore-Penrose Pseudoinverse", status: "locked" },
            { id: "jacobian-hessian", title: "Jacobian and Hessian Matrices", status: "locked" },
            { id: "sparse-matrix", title: "Sparse Matrix Algebra", status: "locked" },
            { id: "broadcasting", title: "Broadcasting", status: "locked" },
        ]
    }
];

export default function LinearAlgebraPage() {
    // In a real app, this state would come from the backend/database
    const [unlockedTiers, setUnlockedTiers] = useState<number[]>([1]); // Tier 1 unlocked by default
    const [modalOpen, setModalOpen] = useState(false);
    const [activeTierForExam, setActiveTierForExam] = useState<number | null>(null);

    const handleOpenExam = (tier: number) => {
        setActiveTierForExam(tier);
        setModalOpen(true);
    };

    const handleUnlockNext = () => {
        if (activeTierForExam) {
            const nextTier = activeTierForExam + 1;
            if (!unlockedTiers.includes(nextTier)) {
                setUnlockedTiers([...unlockedTiers, nextTier]);
            }
        }
    };

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="mx-auto max-w-5xl space-y-12">

                {/* Header */}
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground">Linear Algebra</h1>
                    <p className="max-w-2xl text-lg text-muted-foreground">
                        To build a 2026-standard search engine or any modern ML app, you need to treat Linear Algebra not as a collection of formulas, but as the logic of space and transformation.
                    </p>
                </div>

                {/* Tiers List */}
                <div className="space-y-12">
                    {initialCurriculum.map((tier) => {
                        const isUnlocked = unlockedTiers.includes(tier.tier);
                        const isPreviousTierUnlocked = tier.tier === 1 || unlockedTiers.includes(tier.tier - 1);

                        // Check if we should show the "Take Exam" button for this tier
                        // Show if: This tier is unlocked AND the NEXT tier is NOT unlocked
                        const showGatekeeper = isUnlocked && !unlockedTiers.includes(tier.tier + 1) && tier.tier < 5;

                        return (
                            <div key={tier.tier} className={cn("relative transition-opacity duration-500", !isUnlocked && "opacity-50 grayscale")}>
                                <div className="mb-6 flex items-end gap-4 border-b border-border pb-2">
                                    <span className="text-6xl font-black text-muted-foreground/10">0{tier.tier}</span>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h2 className="text-2xl font-bold text-foreground">{tier.title}</h2>
                                            {!isUnlocked && <Lock className="h-5 w-5 text-muted-foreground" />}
                                        </div>
                                        <p className="font-medium text-primary">{tier.subtitle}</p>
                                    </div>
                                    <p className="ml-auto hidden max-w-md text-sm text-muted-foreground md:block">
                                        {tier.description}
                                    </p>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {tier.topics.map((topic) => (
                                        <Link
                                            key={topic.id}
                                            href={isUnlocked ? `/foundation/linear-algebra/${topic.id}` : "#"}
                                            className={cn(
                                                "group relative flex flex-col justify-between rounded-xl border p-5 transition-all text-left",
                                                !isUnlocked
                                                    ? "border-border bg-muted/10 cursor-not-allowed"
                                                    : "border-border bg-card hover:border-primary/50 hover:shadow-md cursor-pointer"
                                            )}
                                        >
                                            <div className="space-y-2">
                                                <div className="flex items-start justify-between">
                                                    <div className={cn(
                                                        "rounded-lg p-2",
                                                        topic.status === "completed" && isUnlocked ? "bg-success/10 text-success" :
                                                            topic.status === "in_progress" && isUnlocked ? "bg-primary/10 text-primary" :
                                                                "bg-muted text-muted-foreground"
                                                    )}>
                                                        {topic.status === "completed" && isUnlocked ? <BookOpen className="h-5 w-5" /> :
                                                            topic.status === "in_progress" && isUnlocked ? <PlayCircle className="h-5 w-5" /> :
                                                                <Lock className="h-5 w-5" />}
                                                    </div>
                                                </div>
                                                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                                    {topic.title}
                                                </h3>
                                            </div>

                                            {isUnlocked && (
                                                <div className="mt-4 flex items-center text-xs font-medium text-muted-foreground group-hover:text-primary">
                                                    Start Lesson <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                                </div>
                                            )}
                                        </Link>
                                    ))}
                                </div>

                                {/* Gatekeeper Action */}
                                {showGatekeeper && (
                                    <div className="mt-8 flex justify-center">
                                        <button
                                            onClick={() => handleOpenExam(tier.tier)}
                                            className="group flex flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 px-12 py-6 text-center transition-all hover:bg-primary/10 hover:border-primary"
                                        >
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg group-hover:scale-110 transition-transform">
                                                <ShieldCheck className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-foreground">Tier {tier.tier} Gatekeeper</h3>
                                                <p className="text-sm text-muted-foreground">Pass the exam to unlock Tier {tier.tier + 1}</p>
                                            </div>
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <GatekeeperModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                tierTitle={`Tier ${activeTierForExam}`}
                onUnlock={handleUnlockNext}
            />
        </div>
    );
}
