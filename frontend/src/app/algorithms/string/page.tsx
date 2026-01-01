import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { CurriculumView } from "@/components/modules/CurriculumView";
import { genericTiers } from "@/data/curriculum";

export default function StringSearchingPage() {
    return (
        <ModuleLayout>
            <CurriculumView
                title="String Searching"
                description="Suffix Trees, Aho-Corasick, and compression algorithms."
                initialTiers={genericTiers}
                basePath="/algorithms/string"
            />
        </ModuleLayout>
    );
}
