"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Minimize2, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    text: string;
    sender: "user" | "bot";
    timestamp: Date;
}

export function AiAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            text: "Hi! I'm Tex, your MDSML study buddy. How can I help you with Linear Algebra or Linear Regression today?",
            sender: "bot",
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const updatedMessages: Message[] = [
            ...messages,
            {
                id: Date.now().toString(),
                text: inputValue,
                sender: "user",
                timestamp: new Date()
            }
        ];

        setMessages(updatedMessages);
        setInputValue("");

        // Mock Bot Response
        setTimeout(() => {
            const botResponses = [
                "That's a great question about eigenvalues!",
                "Try visualizing the transformation matrix.",
                "Have you checked the concept video in the module?",
                "I can explain SVD in more detail if you like."
            ];
            const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

            setMessages(prev => [
                ...prev,
                {
                    id: (Date.now() + 1).toString(),
                    text: randomResponse,
                    sender: "bot",
                    timestamp: new Date()
                }
            ]);
        }, 1000);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            {/* Chat Window */}
            {isOpen && (
                <div className="w-[350px] overflow-hidden rounded-2xl border border-border bg-background shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-300">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-border bg-primary px-4 py-3 text-primary-foreground">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                                <Bot className="h-5 w-5" />
                            </div>
                            <span className="font-semibold">Tex AI</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="rounded-full p-1 hover:bg-white/20 transition-colors"
                            >
                                <Minimize2 className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="h-[400px] overflow-y-auto bg-muted/5 p-4 space-y-4">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={cn(
                                    "flex w-max max-w-[80%] flex-col gap-1 rounded-2xl px-4 py-2 text-sm",
                                    msg.sender === "user"
                                        ? "ml-auto bg-primary text-primary-foreground rounded-br-none"
                                        : "bg-muted text-foreground rounded-bl-none"
                                )}
                            >
                                <p>{msg.text}</p>
                                <span className={cn(
                                    "text-[10px] opacity-70",
                                    msg.sender === "user" ? "text-primary-foreground" : "text-muted-foreground"
                                )}>
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="border-t border-border bg-background p-3">
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask Tex anything..."
                                className="flex-1 rounded-full border border-input bg-muted/10 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!inputValue.trim()}
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
                            >
                                <Send className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Action Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 hover:bg-primary/90 transition-all duration-300"
                >
                    <Bot className="h-7 w-7" />
                </button>
            )}
        </div>
    );
}
