import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { CurriculumView } from "@/components/modules/CurriculumView";
import { genericTiers } from "@/data/curriculum";

export default function DeterministicRankingPage() {
    return (
        <ModuleLayout>
            <CurriculumView
                title="Deterministic Ranking"
                description="TF-IDF, Vector Space Models, and Boolean Retrieval."
                initialTiers={genericTiers}
                basePath="/algorithms/ranking-deterministic"
            />
        </ModuleLayout>
    );
}
