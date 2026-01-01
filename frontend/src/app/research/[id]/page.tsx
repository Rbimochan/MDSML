import { ResearchWorkspace } from "@/components/research/ResearchWorkspace";

// Force valid page props logic for Next 14/15
export default async function PaperPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <ResearchWorkspace paperId={id} />;
}
