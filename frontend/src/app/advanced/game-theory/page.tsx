import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { CurriculumView } from "@/components/modules/CurriculumView";
import { genericTiers } from "@/data/curriculum";

export default function GameTheoryPage() {
    return (
        <ModuleLayout>
            <CurriculumView
                title="Game Theory"
                description="Ad auctions, adversarial search, and strategic behavior."
                initialTiers={genericTiers}
                basePath="/advanced/game-theory"
            />
        </ModuleLayout>
    );
}
