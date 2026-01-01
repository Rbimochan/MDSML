"use client";

import { useState } from "react";
import { CheckCircle2, Plus, Link as LinkIcon, RefreshCw } from "lucide-react";
import { Note } from "@/types/note";

interface VideoViewProps {
    videoUrl: string;
    onUpdateVideo: (url: string) => void;
    onComplete: () => void;
    onAddNote: (content: string) => void;
}

export function VideoView({ videoUrl, onUpdateVideo, onComplete, onAddNote }: VideoViewProps) {
    const [noteInput, setNoteInput] = useState("");
    const [urlInput, setUrlInput] = useState("");

    const handleAddNote = () => {
        if (!noteInput.trim()) return;
        onAddNote(noteInput);
        setNoteInput("");
    };

    const handleUpdateVideo = () => {
        if (!urlInput.trim()) return;
        // Basic validation/extraction could go here, but we'll trust the parent or state for now
        // or just pass the raw URL and let the embed logic handle it.
        onUpdateVideo(urlInput);
        setUrlInput("");
    };

    const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            action();
        }
    };

    // Extract ID for embed
    const getEmbedSrc = (url: string) => {
        try {
            const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
            const match = url.match(youtubeRegex);
            if (match && match[1]) {
                return `https://www.youtube.com/embed/${match[1]}`;
            }
            // Fallback or if it's already an embed link
            return url;
        } catch (e) {
            return url;
        }
    };

    return (
        <div className="flex h-full flex-col p-6">
            <h2 className="mb-4 text-xl font-bold">Concept Video</h2>

            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-lg">
                <iframe
                    className="absolute inset-0 h-full w-full"
                    src={getEmbedSrc(videoUrl)}
                    title="Concept Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
                {/* Change Video Source */}
                <div className="rounded-lg border border-border bg-card p-4">
                    <label className="mb-2 block text-sm font-medium text-muted-foreground">
                        Change Video Source URL:
                    </label>
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, handleUpdateVideo)}
                            placeholder="Paste new YouTube URL..."
                            className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                        <button
                            onClick={handleUpdateVideo}
                            disabled={!urlInput.trim()}
                            className="flex items-center gap-2 rounded-md bg-muted px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/80 disabled:opacity-50"
                        >
                            <RefreshCw className="h-4 w-4" />
                            Update
                        </button>
                    </div>
                </div>

                {/* Quick Note Input */}
                <div className="rounded-lg border border-border bg-card p-4">
                    <label className="mb-2 block text-sm font-medium text-muted-foreground">
                        Take a quick note while watching:
                    </label>
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={noteInput}
                            onChange={(e) => setNoteInput(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, handleAddNote)}
                            placeholder="e.g., Key concept at 2:30..."
                            className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                        <button
                            onClick={handleAddNote}
                            disabled={!noteInput.trim()}
                            className="flex items-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50"
                        >
                            <Plus className="h-4 w-4" />
                            Add
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex justify-center">
                <button
                    onClick={onComplete}
                    className="flex items-center gap-2 rounded-lg bg-primary/10 px-6 py-3 font-semibold text-primary hover:bg-primary/20"
                >
                    <CheckCircle2 className="h-5 w-5" />
                    Mark Video as Watched
                </button>
            </div>
        </div>
    );
}
