"use client";

import { useState, useEffect } from "react";
import { BookOpen, Edit3, Terminal, CheckCircle, Video, StickyNote } from "lucide-react";
import { cn } from "@/lib/utils";
import { ConceptView } from "./ConceptView";
import { ExerciseView } from "./ExerciseView";
import { CodingView } from "./CodingView";
import { VideoView } from "./VideoView";
import { NotesView } from "./NotesView";
import { Note } from "@/types/note";

type Tab = "concept" | "video" | "exercise" | "coding" | "notes";

import { topicContents } from "@/data/topicContent";

export function TopicViewer({ topicId }: { topicId: string }) {
    const [activeTab, setActiveTab] = useState<Tab>("concept");
    const [completedTabs, setCompletedTabs] = useState<Tab[]>([]);
    const [notes, setNotes] = useState<Note[]>([]);

    // Get content for this topic, fallback to generic if not found
    const content = topicContents[topicId] || topicContents["identifiers"] || {
        id: "unknown",
        title: "Topic Not Found",
        concept: { title: "Not Found", content: "<p>Content not available.</p>" },
        video: { url: "", title: "" },
        coding: { initialCode: "# No content" }
    };

    const [currentVideoUrl, setCurrentVideoUrl] = useState(content.video.url || "https://www.youtube.com/watch?v=PFDu9oVAE-g");

    // Update video URL if topic changes
    useEffect(() => {
        if (content.video.url) {
            setCurrentVideoUrl(content.video.url);
        }
    }, [content.video.url]);


    const handleComplete = (tab: Tab) => {
        if (!completedTabs.includes(tab)) {
            setCompletedTabs([...completedTabs, tab]);
        }
    };

    const handleAddNote = (content: string) => {
        let type: "text" | "video" = "text";
        let videoId: string | undefined;

        // Simple YouTube link detection
        const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = content.match(youtubeRegex);

        if (match && match[1]) {
            type = "video";
            videoId = match[1];
        }

        const newNote: Note = {
            id: Date.now().toString(),
            content,
            type,
            timestamp: new Date(),
            videoId
        };

        setNotes((prev) => [newNote, ...prev]);
    };

    const handleDeleteNote = (id: string) => {
        setNotes((prev) => prev.filter(n => n.id !== id));
    };

    const tabs = [
        { id: "concept", label: "Concept", icon: BookOpen },
        { id: "video", label: "Video", icon: Video },
        { id: "exercise", label: "Exercise", icon: Edit3 },
        { id: "coding", label: "Code", icon: Terminal },
        { id: "notes", label: "Notes", icon: StickyNote },
    ] as const;

    return (
        <div className="flex h-screen flex-col">
            {/* Top Navigation Bar */}
            <div className="border-b border-border bg-background px-6 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-foreground">{content.title}</h1>
                        <p className="text-sm text-muted-foreground">Linear Algebra • Foundation</p>
                    </div>

                    <div className="flex rounded-lg bg-muted p-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all",
                                    activeTab === tab.id ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <tab.icon className="h-4 w-4" />
                                {tab.label}
                                {completedTabs.includes(tab.id) && <CheckCircle className="h-3 w-3 text-success" />}
                            </button>
                        ))}
                    </div>

                    <div className="w-32">
                        {/* Placeholder for progress/timer */}
                        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                            <div
                                className="h-full bg-primary transition-all duration-500"
                                style={{ width: `${(completedTabs.length / 5) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-auto bg-muted/10 p-6">
                <div className="mx-auto max-w-5xl rounded-xl border border-border bg-background shadow-sm h-full overflow-hidden flex flex-col">
                    <div className="flex-1 overflow-auto">
                        {activeTab === "concept" && (
                            <ConceptView
                                title={content.concept.title}
                                content={content.concept.content}
                                onComplete={() => handleComplete("concept")}
                            />
                        )}
                        {activeTab === "video" && (
                            <VideoView
                                videoUrl={currentVideoUrl}
                                onUpdateVideo={setCurrentVideoUrl}
                                onComplete={() => handleComplete("video")}
                                onAddNote={handleAddNote}
                            />
                        )}
                        {activeTab === "exercise" && <ExerciseView onComplete={() => handleComplete("exercise")} />}
                        {activeTab === "coding" && (
                            <CodingView
                                initialCode={content.coding.initialCode}
                                onComplete={() => handleComplete("coding")}
                            />
                        )}
                        {activeTab === "notes" && <NotesView notes={notes} onAddNote={handleAddNote} onDeleteNote={handleDeleteNote} />}
                    </div>
                </div>
            </div>
        </div>
    );
}
