"use client";

import { useState } from "react";
import { Play, RotateCw } from "lucide-react";

export function CodingView({ onComplete }: { onComplete: () => void }) {
    const [output, setOutput] = useState<string | null>(null);
    const [isRunning, setIsRunning] = useState(false);

    const code = `import numpy as np

# Define matrix A
A = np.array([[3, 1], 
              [1, 3]])

# Calculate eigenvalues
eigenvalues, eigenvectors = np.linalg.eig(A)

print("Eigenvalues:", eigenvalues)`;

    const handleRun = () => {
        setIsRunning(true);
        // Simulate execution delay
        setTimeout(() => {
            setOutput("Eigenvalues: [4. 2.]");
            setIsRunning(false);
            onComplete();
        }, 1500);
    };

    return (
        <div className="flex h-[calc(100vh-200px)] flex-col lg:flex-row">
            {/* Editor Panel */}
            <div className="flex-1 flex flex-col border-r border-border">
                <div className="flex items-center justify-between border-b border-border bg-muted/20 px-4 py-2">
                    <span className="text-xs font-medium text-muted-foreground">main.py</span>
                    <button
                        onClick={handleRun}
                        disabled={isRunning}
                        className="flex items-center gap-2 rounded-md bg-success/10 px-3 py-1.5 text-xs font-semibold text-success hover:bg-success/20 disabled:opacity-50 transition-colors"
                    >
                        {isRunning ? <RotateCw className="h-3 w-3 animate-spin" /> : <Play className="h-3 w-3 fill-current" />}
                        Run Code
                    </button>
                </div>
                <div className="flex-1 bg-[#1e1e1e] p-4 font-mono text-sm text-gray-300">
                    <pre className="whitespace-pre-wrap">{code}</pre>
                    {/* In a real app, integrate Monaco Editor here */}
                </div>
            </div>

            {/* Output Panel */}
            <div className="w-full lg:w-1/3 flex flex-col bg-[#0d0d0d]">
                <div className="border-b border-border/10 bg-muted/5 px-4 py-2">
                    <span className="text-xs font-medium text-muted-foreground">Console Output</span>
                </div>
                <div className="flex-1 p-4 font-mono text-sm">
                    {output ? (
                        <div className="text-success animate-in fade-in duration-300">
                            <span className="text-muted-foreground">$ python main.py</span>
                            <br />
                            {output}
                        </div>
                    ) : (
                        <div className="text-muted-foreground/50 italic">
                            Run the code to see output...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
