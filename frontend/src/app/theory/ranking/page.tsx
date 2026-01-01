import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { CurriculumView } from "@/components/modules/CurriculumView";
import { genericTiers } from "@/data/curriculum";

export default function RankingTheoryPage() {
    return (
        <ModuleLayout>
            <CurriculumView
                title="Ranking Theory"
                description="Learning to Rank (LTR) and evaluation metrics (NDCG, MAP)."
                initialTiers={genericTiers}
                basePath="/theory/ranking"
            />
        </ModuleLayout>
    );
}
