"use client";

import { ArrowRight } from "lucide-react";

interface ConceptViewProps {
    title: string;
    content: string; // HTML string
    onComplete: () => void;
}

export function ConceptView({ title, content, onComplete }: ConceptViewProps) {
    return (
        <div className="p-8">
            <h2 className="mb-6 text-3xl font-bold">{title}</h2>
            <div
                className="prose prose-slate dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: content }}
            />

            <div className="mt-8 flex justify-end">
                <button
                    onClick={onComplete}
                    className="flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                    Continue to Video <ArrowRight className="ml-2 h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
