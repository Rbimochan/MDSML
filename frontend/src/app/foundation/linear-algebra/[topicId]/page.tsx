import { TopicViewer } from "@/components/modules/TopicViewer";

export default async function TopidPage({ params }: { params: Promise<{ topicId: string }> }) {
    // In strict mode or new Next.js, we might need to await params or treat it differently depending on version.
    // Assuming standard App Router behavior.
    // Note: In Next.js 15+, params is a Promise. Edited to reflect that.

    // Check if params is a promise in the current typescript setup/Next version.
    // If it's Next.js 13/14, it might be object. If 15, it's promise. 
    // I'll assume standard object for now to be safe with typical setups, or handle both.
    // Actually, let's just make it a client component wrapper or standard server component.
    // Let's assume standard params for now.

    return <TopicViewer topicId={(await params).topicId} />;
}
