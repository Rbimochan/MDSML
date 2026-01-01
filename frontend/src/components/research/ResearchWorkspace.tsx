"use client";

import { useState } from "react";
import { ArrowLeft, BookOpen, Quote, PenTool, Hash } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NotesView } from "@/components/modules/NotesView";
import { ObservationPanel } from "./ObservationPanel";

// Mock reuse of NotesView logic - in real app might abstract further
import { Note } from "@/types/note";

export function ResearchWorkspace({ paperId }: { paperId: string }) {
    const [activeTab, setActiveTab] = useState<"notes" | "observations" | "topics">("notes");

    // Mock Notes State
    const [notes, setNotes] = useState<Note[]>([]);
    const handleAddNote = (content: string) => {
        setNotes(prev => [...prev, { id: Date.now().toString(), content, type: "text", timestamp: new Date() }]);
    };
    const handleDeleteNote = (id: string) => {
        setNotes(prev => prev.filter(n => n.id !== id));
    };

    return (
        <div className="flex h-screen flex-col bg-background">
            {/* Top Bar */}
            <div className="flex h-14 items-center justify-between border-b border-border px-4">
                <div className="flex items-center gap-4">
                    <Link href="/research" className="rounded-full p-2 hover:bg-muted transition-colors">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                    <h1 className="text-sm font-semibold truncate max-w-md">
                        {paperId === "attention-is-all-you-need" ? "Attention Is All You Need.pdf" : "Research Paper.pdf"}
                    </h1>
                </div>
            </div>

            {/* Split Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left: PDF Viewer (Mock) */}
                <div className="flex-1 bg-muted/20 p-4 overflow-hidden flex flex-col border-r border-border">
                    <div className="flex-1 rounded-lg border border-border bg-white shadow-sm overflow-hidden flex items-center justify-center">
                        <iframe
                            src="https://arxiv.org/pdf/1706.03762.pdf" // Direct generic link for demo, normally use specific
                            className="w-full h-full"
                            title="PDF Viewer"
                        />
                    </div>
                </div>

                {/* Right: Tools Panel */}
                <div className="w-[400px] flex flex-col bg-background">
                    {/* Tabs */}
                    <div className="flex border-b border-border">
                        <button
                            onClick={() => setActiveTab("notes")}
                            className={cn(
                                "flex-1 border-b-2 py-3 text-sm font-medium transition-colors hover:text-foreground",
                                activeTab === "notes" ? "border-primary text-primary" : "border-transparent text-muted-foreground"
                            )}
                        >
                            <span className="flex items-center justify-center gap-2">
                                <PenTool className="h-4 w-4" /> Notes
                            </span>
                        </button>
                        <button
                            onClick={() => setActiveTab("observations")}
                            className={cn(
                                "flex-1 border-b-2 py-3 text-sm font-medium transition-colors hover:text-foreground",
                                activeTab === "observations" ? "border-primary text-primary" : "border-transparent text-muted-foreground"
                            )}
                        >
                            <span className="flex items-center justify-center gap-2">
                                <Quote className="h-4 w-4" /> Observ.
                            </span>
                        </button>
                        <button
                            onClick={() => setActiveTab("topics")}
                            className={cn(
                                "flex-1 border-b-2 py-3 text-sm font-medium transition-colors hover:text-foreground",
                                activeTab === "topics" ? "border-primary text-primary" : "border-transparent text-muted-foreground"
                            )}
                        >
                            <span className="flex items-center justify-center gap-2">
                                <Hash className="h-4 w-4" /> Topics
                            </span>
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="flex-1 overflow-hidden">
                        {activeTab === "notes" && (
                            <NotesView notes={notes} onAddNote={handleAddNote} onDeleteNote={handleDeleteNote} />
                        )}
                        {activeTab === "observations" && (
                            <ObservationPanel />
                        )}
                        {activeTab === "topics" && (
                            <div className="p-4 text-center text-muted-foreground text-sm">
                                <div className="mb-4">
                                    <p>Tag this paper with relevant topics.</p>
                                </div>
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {["Transformer", "NLP", "Attention", "Deep Learning"].map(tag => (
                                        <span key={tag} className="rounded-full bg-secondary/50 px-3 py-1 text-xs">#{tag}</span>
                                    ))}
                                    <button className="rounded-full border border-dashed border-muted-foreground/50 px-3 py-1 text-xs hover:border-primary hover:text-primary">
                                        + Add Topic
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
