"use client";

import { useState } from "react";
import { Plus, Trash2, Lightbulb } from "lucide-react";


interface Observation {
    id: string;
    content: string;
}

export function ObservationPanel() {
    const [observations, setObservations] = useState<Observation[]>([]);
    const [input, setInput] = useState("");

    const handleAdd = () => {
        if (!input.trim()) return;
        setObservations([...observations, { id: Date.now().toString(), content: input }]);
        setInput("");
    };

    return (
        <div className="flex h-full flex-col p-4">
            <h3 className="mb-4 text-lg font-semibold flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                Key Observations
            </h3>

            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Add a key finding..."
                    className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                />
                <button
                    onClick={handleAdd}
                    className="rounded-md bg-secondary px-3 py-2 text-secondary-foreground hover:bg-secondary/80"
                >
                    <Plus className="h-4 w-4" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3">
                {observations.length === 0 && (
                    <p className="text-sm text-muted-foreground italic text-center py-8">
                        No observations yet. What stands out in this paper?
                    </p>
                )}
                {observations.map((obs) => (
                    <div key={obs.id} className="group flex items-start justify-between rounded-lg border border-border bg-card p-3 shadow-sm">
                        <p className="text-sm text-foreground">{obs.content}</p>
                        <button
                            onClick={() => setObservations(prev => prev.filter(o => o.id !== obs.id))}
                            className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-error transition-opacity"
                        >
                            <Trash2 className="h-3 w-3" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
