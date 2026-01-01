"use client";

import { useState } from "react";
import { Plus, Trash2, Video, StickyNote } from "lucide-react";
import { cn } from "@/lib/utils";
import { Note } from "@/types/note";

interface NotesViewProps {
    notes: Note[];
    onAddNote: (content: string) => void;
    onDeleteNote: (id: string) => void;
}

export function NotesView({ notes, onAddNote, onDeleteNote }: NotesViewProps) {
    const [input, setInput] = useState("");

    const handleAddNote = () => {
        if (!input.trim()) return;
        onAddNote(input);
        setInput("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleAddNote();
        }
    };

    return (
        <div className="flex h-full flex-col p-6">
            <h2 className="mb-4 text-xl font-bold">My Notes</h2>

            {/* Input Area */}
            <div className="mb-8 rounded-xl border border-border bg-background p-4 shadow-sm">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a note or paste a YouTube link..."
                    className="min-h-[80px] w-full resize-none bg-transparent placeholder:text-muted-foreground focus:outline-none"
                />
                <div className="flex justify-end pt-2 border-t border-muted/50 mt-2">
                    <button
                        onClick={handleAddNote}
                        disabled={!input.trim()}
                        className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                    >
                        <Plus className="h-4 w-4" />
                        Add Note
                    </button>
                </div>
            </div>

            {/* Notes List */}
            <div className="flex-1 space-y-4 overflow-y-auto pr-2">
                {notes.length === 0 && (
                    <div className="flex h-40 flex-col items-center justify-center rounded-xl border border-dashed border-muted-foreground/30 bg-muted/5 text-center text-muted-foreground">
                        <StickyNote className="mb-2 h-8 w-8 opacity-50" />
                        <p>No notes yet. Capture your thoughts!</p>
                    </div>
                )}

                {notes.map((note) => (
                    <div key={note.id} className="group relative rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md">
                        <button
                            onClick={() => onDeleteNote(note.id)}
                            className="absolute right-3 top-3 opacity-0 transition-opacity group-hover:opacity-100 text-muted-foreground hover:text-error"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>

                        <div className="flex items-start gap-3">
                            <div className={cn(
                                "mt-1 rounded-full p-2",
                                note.type === "video" ? "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400" : "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                            )}>
                                {note.type === "video" ? <Video className="h-4 w-4" /> : <StickyNote className="h-4 w-4" />}
                            </div>

                            <div className="flex-1 space-y-2">
                                {note.type === "text" && (
                                    <p className="whitespace-pre-wrap text-foreground">{note.content}</p>
                                )}

                                {note.type === "video" && note.videoId && (
                                    <div className="space-y-2">
                                        <p className="text-sm text-foreground mb-2 break-all">{note.content}</p>
                                        <div className="relative aspect-video w-full max-w-sm overflow-hidden rounded-lg bg-black">
                                            <iframe
                                                className="absolute inset-0 h-full w-full"
                                                src={`https://www.youtube.com/embed/${note.videoId}`}
                                                allowFullScreen
                                            />
                                        </div>
                                    </div>
                                )}

                                <p className="text-xs text-muted-foreground">
                                    {note.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
