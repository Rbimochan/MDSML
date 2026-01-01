import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { CurriculumView } from "@/components/modules/CurriculumView";
import { genericTiers } from "@/data/curriculum";

export default function ProbabilisticRankingPage() {
    return (
        <ModuleLayout>
            <CurriculumView
                title="Probabilistic Ranking"
                description="BM25, Language Models, and Divergence from Randomness."
                initialTiers={genericTiers}
                basePath="/algorithms/ranking-probabilistic"
            />
        </ModuleLayout>
    );
}
