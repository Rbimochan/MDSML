import { ModuleLayout } from "@/components/layout/ModuleLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <ModuleLayout>
            {children}
        </ModuleLayout>
    );
}
