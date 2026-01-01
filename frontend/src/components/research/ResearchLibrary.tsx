"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, FileText, Calendar, Tag, Plus, X, Globe, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Paper {
    id: string;
    title: string;
    authors: string;
    year: number;
    tags: string[];
    abstract: string;
    pdfUrl?: string;
    isPersonal?: boolean;
}

const initialPapers: Paper[] = [
    {
        id: "attention-is-all-you-need",
        title: "Attention Is All You Need",
        authors: "Vaswani et al.",
        year: 2017,
        tags: ["Transformer", "NLP"],
        abstract: "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks...",
        isPersonal: false
    },
    {
        id: "lora",
        title: "LoRA: Low-Rank Adaptation of Large Language Models",
        authors: "Hu et al.",
        year: 2021,
        tags: ["Fine-tuning", "LLM"],
        abstract: "We propose Low-Rank Adaptation, or LoRA, which freezes the pre-trained model weights...",
        isPersonal: false
    },
    {
        id: "proximal-policy-optimization",
        title: "Proximal Policy Optimization Algorithms",
        authors: "Schulman et al.",
        year: 2017,
        tags: ["RL", "Optimization"],
        abstract: "We propose a new family of policy gradient methods for reinforcement learning...",
        isPersonal: false
    }
];

export function ResearchLibrary() {
    const [papers, setPapers] = useState<Paper[]>(initialPapers);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<"library" | "personal">("library");

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        authors: "",
        year: new Date().getFullYear(),
        abstract: "",
        tags: "",
        pdfUrl: ""
    });

    const handleAddPaper = () => {
        if (!formData.title) return;

        const newPaper: Paper = {
            id: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            title: formData.title,
            authors: formData.authors || "Unknown Author",
            year: Number(formData.year),
            abstract: formData.abstract || "No abstract provided.",
            tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean),
            pdfUrl: formData.pdfUrl,
            isPersonal: true // Explicitly personal
        };

        setPapers([newPaper, ...papers]);
        setIsModalOpen(false);
        setFormData({ title: "", authors: "", year: new Date().getFullYear(), abstract: "", tags: "", pdfUrl: "" });
        setActiveTab("personal"); // Switch to personal tab to see the new paper
    };

    const filteredPapers = papers.filter(p => activeTab === "library" ? !p.isPersonal : p.isPersonal);

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="mx-auto max-w-6xl space-y-8">

                {/* Header */}
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">Research Station</h1>
                            <p className="text-muted-foreground">Manage and analyze your academic reading.</p>
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="relative flex-1 md:w-80">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search papers, authors, tags..."
                                    className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                            >
                                <Plus className="h-4 w-4" />
                                <span className="hidden sm:inline">Add Paper</span>
                            </button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-border">
                        <button
                            onClick={() => setActiveTab("library")}
                            className={cn(
                                "flex items-center gap-2 border-b-2 px-6 py-3 text-sm font-medium transition-colors hover:text-foreground",
                                activeTab === "library" ? "border-primary text-primary" : "border-transparent text-muted-foreground"
                            )}
                        >
                            <Globe className="h-4 w-4" />
                            Research Papers
                        </button>
                        <button
                            onClick={() => setActiveTab("personal")}
                            className={cn(
                                "flex items-center gap-2 border-b-2 px-6 py-3 text-sm font-medium transition-colors hover:text-foreground",
                                activeTab === "personal" ? "border-primary text-primary" : "border-transparent text-muted-foreground"
                            )}
                        >
                            <User className="h-4 w-4" />
                            My Original Papers
                        </button>
                    </div>
                </div>

                {/* Paper Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredPapers.length === 0 && (
                        <div className="col-span-full py-12 text-center text-muted-foreground">
                            {activeTab === "library" ? (
                                <p>No papers in the seed library match your search.</p>
                            ) : (
                                <div className="space-y-4">
                                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                                        <FileText className="h-8 w-8 opacity-50" />
                                    </div>
                                    <p className="text-lg font-medium">Your personal research collection is empty.</p>
                                    <p className="text-sm">Add a paper to start building your knowledge base.</p>
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="text-primary hover:underline"
                                    >
                                        Add your first paper
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {filteredPapers.map((paper) => (
                        <Link
                            key={paper.id}
                            href={`/research/${paper.id}`}
                            className="group flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
                        >
                            <div className="space-y-4">
                                <div className="flex items-start justify-between">
                                    <div className="rounded-full bg-primary/10 p-3 text-primary">
                                        <FileText className="h-6 w-6" />
                                    </div>
                                    <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                                        {paper.isPersonal ? "USER" : "PDF"}
                                    </span>
                                </div>

                                <div>
                                    <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                        {paper.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">{paper.authors}</p>
                                </div>

                                <p className="text-sm text-foreground/80 line-clamp-3">
                                    {paper.abstract}
                                </p>
                            </div>

                            <div className="mt-6 space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    {paper.tags.map((tag) => (
                                        <span key={tag} className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                                            <Tag className="mr-1 h-3 w-3" />
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center text-xs text-muted-foreground border-t border-border pt-4">
                                    <Calendar className="mr-2 h-3 w-3" />
                                    {paper.year}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Add Paper Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="w-full max-w-lg rounded-2xl bg-background shadow-2xl border border-border overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between border-b border-border p-4">
                            <h2 className="text-lg font-bold">Add Research Paper</h2>
                            <button onClick={() => setIsModalOpen(false)}>
                                <X className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium">Title</label>
                                <input
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="e.g. Transformers: State of the Art"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-1 block text-sm font-medium">Authors</label>
                                    <input
                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        value={formData.authors}
                                        onChange={e => setFormData({ ...formData, authors: e.target.value })}
                                        placeholder="e.g. Smith et al."
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium">Year</label>
                                    <input
                                        type="number"
                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        value={formData.year}
                                        onChange={e => setFormData({ ...formData, year: Number(e.target.value) })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium">Topics (comma separated)</label>
                                <input
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    value={formData.tags}
                                    onChange={e => setFormData({ ...formData, tags: e.target.value })}
                                    placeholder="e.g. NLP, Transformer, Deep Learning"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium">Abstract (Optional)</label>
                                <textarea
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[80px]"
                                    value={formData.abstract}
                                    onChange={e => setFormData({ ...formData, abstract: e.target.value })}
                                    placeholder="Brief summary..."
                                />
                            </div>
                            <button
                                onClick={handleAddPaper}
                                disabled={!formData.title}
                                className="w-full rounded-lg bg-primary py-2.5 font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                            >
                                Add Paper
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
