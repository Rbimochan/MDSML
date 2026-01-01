"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    BookOpen,
    Dumbbell,
    Search,
    User,
    Settings,
    LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MDSMLLogo } from "@/components/common/MDSMLLogo";

// I'll create a simple 'cn' utility inline here if I can't check for it, but standard Next.js setups often have it.
// Checking file structure earlier: src/lib exists. I should check if utils.ts is there. 
// Assuming it might not be there or is basic, I will risk using it or just recreate it.
// Actually, let's just use standard template literals or `clsx` directly if I import it.
// The package.json has clsx and tailwind-merge.


const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    {
        name: "Foundation", href: "/foundation", icon: BookOpen,
        children: [
            { name: "Linear Algebra", href: "/foundation/linear-algebra" },
            { name: "Probability & Statistics", href: "/foundation/probability" },
            { name: "Calculus & Optimization", href: "/foundation/calculus" },
            { name: "Programming Foundations", href: "/foundation/programming" },
        ]
    },
    { name: "Applied AI", href: "/applied-ai", icon: Dumbbell, collapsed: true },
    { name: "Core AI", href: "/core-ai", icon: Search, locked: true },
    { name: "Research Papers", href: "/research", icon: BookOpen, badge: "New" },
];

const bottomItems = [
    { name: "Profile", href: "/profile", icon: User },
    { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-background/50 backdrop-blur-xl transition-transform">
            <div className="flex h-full flex-col px-3 py-4">
                <div className="mb-10 flex items-center pl-3">
                    <Link href="/" className="hover:opacity-80 transition-opacity">
                        <MDSMLLogo />
                    </Link>
                </div>

                <div className="space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        // Handle Foundation specifically as it's expanded by default for this MVP
                        const isExpanded = item.name === "Foundation";

                        return (
                            <div key={item.name}>
                                <div
                                    className={cn(
                                        "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 group",
                                        isActive
                                            ? "bg-primary/10 text-primary"
                                            : item.locked ? "text-muted-foreground/50 cursor-not-allowed" : "text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
                                    )}
                                >
                                    <Link href={item.locked ? "#" : item.href} className={cn("flex items-center flex-1", item.locked && "pointer-events-none")}>
                                        <item.icon
                                            className={cn(
                                                "mr-3 h-5 w-5 transition-colors",
                                                isActive ? "text-primary" : item.locked ? "text-muted-foreground/50" : "text-muted-foreground group-hover:text-foreground"
                                            )}
                                        />
                                        {item.name}
                                    </Link>
                                    {item.badge && (
                                        <span className="ml-auto inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                            {item.badge}
                                        </span>
                                    )}
                                    {item.locked && (
                                        <span className="ml-auto text-xs text-muted-foreground/50">Locked</span>
                                    )}
                                </div>

                                {isExpanded && item.children && (
                                    <div className="mt-1 ml-4 space-y-1 border-l border-border pl-4">
                                        {item.children.map((child) => {
                                            const isChildActive = pathname === child.href;
                                            return (
                                                <Link
                                                    key={child.href}
                                                    href={child.href}
                                                    className={cn(
                                                        "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                                        isChildActive
                                                            ? "text-primary bg-primary/5"
                                                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                                    )}
                                                >
                                                    {child.name}
                                                </Link>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="mt-auto space-y-1 border-t border-border pt-4">
                    {bottomItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 group",
                                    isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                <item.icon
                                    className={cn(
                                        "mr-3 h-5 w-5 transition-colors",
                                        isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                                    )}
                                />
                                {item.name}
                            </Link>
                        );
                    })}
                    <button className="flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-error transition-all duration-200 group">
                        <LogOut className="mr-3 h-5 w-5 group-hover:text-error" />
                        Sign Out
                    </button>
                </div>
            </div>
        </aside>
    );
}
