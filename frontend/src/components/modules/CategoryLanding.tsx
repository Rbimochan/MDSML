"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModuleCardProps {
    title: string;
    description: string;
    href: string;
}

interface CategoryLandingProps {
    title: string;
    description: string;
    modules: ModuleCardProps[];
}

export function CategoryLanding({ title, description, modules }: CategoryLandingProps) {
    return (
        <div className="min-h-screen bg-background p-8">
            <div className="mx-auto max-w-5xl space-y-12">

                {/* Header */}
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground">{title}</h1>
                    <p className="max-w-2xl text-lg text-muted-foreground">{description}</p>
                </div>

                {/* Modules Grid */}
                <div className="grid gap-6 md:grid-cols-2">
                    {modules.map((module) => (
                        <Link
                            key={module.href}
                            href={module.href}
                            className="group relative flex flex-col justify-between rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:-translate-y-1"
                        >
                            <div className="space-y-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                    <BookOpen className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground">{module.title}</h3>
                                <p className="text-muted-foreground">{module.description}</p>
                            </div>

                            <div className="mt-6 flex items-center text-sm font-medium text-primary">
                                Explore Module <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
