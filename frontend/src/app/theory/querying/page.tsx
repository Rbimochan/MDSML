import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { CurriculumView } from "@/components/modules/CurriculumView";
import { genericTiers } from "@/data/curriculum";

export default function QueryingTheoryPage() {
    return (
        <ModuleLayout>
            <CurriculumView
                title="Querying Theory"
                description="Query expansion, rewriting, and intent understanding."
                initialTiers={genericTiers}
                basePath="/theory/querying"
            />
        </ModuleLayout>
    );
}
