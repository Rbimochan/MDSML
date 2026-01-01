import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { CurriculumView } from "@/components/modules/CurriculumView";
import { genericTiers } from "@/data/curriculum";

export default function CrawlingTheoryPage() {
    return (
        <ModuleLayout>
            <CurriculumView
                title="Crawling Theory"
                description="Politeness, freshness, and optimal crawling strategies."
                initialTiers={genericTiers}
                basePath="/theory/crawling"
            />
        </ModuleLayout>
    );
}
