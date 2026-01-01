import { Sidebar } from "@/components/layout/Sidebar";
import { AiAssistant } from "@/components/common/AiAssistant";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="flex min-h-screen bg-muted/5 text-foreground">
            {/* Sidebar Navigation */}
            <Sidebar />

            {/* Main Content Area */}
            <main className="ml-64 flex-1">
                <div className="container mx-auto max-w-7xl p-8">
                    {children}
                </div>
            </main>

            {/* AI Assistant */}
            <AiAssistant />
        </div>
    );
}
