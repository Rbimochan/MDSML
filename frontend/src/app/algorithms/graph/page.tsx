import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { CurriculumView } from "@/components/modules/CurriculumView";
import { genericTiers } from "@/data/curriculum";

export default function GraphAlgorithmsPage() {
    return (
        <ModuleLayout>
            <CurriculumView
                title="Graph Algorithms"
                description="PageRank, HITS, and community detection."
                initialTiers={genericTiers}
                basePath="/algorithms/graph"
            />
        </ModuleLayout>
    );
}
