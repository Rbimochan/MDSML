import { Sidebar } from "@/components/layout/Sidebar";
import { AiAssistant } from "@/components/common/AiAssistant";

export function ModuleLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-background text-foreground">
            <Sidebar />
            <main className="ml-64 flex-1">
                {children}
            </main>
            <AiAssistant />
        </div>
    );
}
