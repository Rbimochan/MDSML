import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { CurriculumView } from "@/components/modules/CurriculumView";
import { genericTiers } from "@/data/curriculum";

export default function IndexingTheoryPage() {
    return (
        <ModuleLayout>
            <CurriculumView
                title="Indexing Theory"
                description="Inverted indices, skip pointers, and compression."
                initialTiers={genericTiers}
                basePath="/theory/indexing"
            />
        </ModuleLayout>
    );
}
