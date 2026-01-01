import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { CurriculumView } from "@/components/modules/CurriculumView";
import { genericTiers } from "@/data/curriculum";

export default function DifferentialPrivacyPage() {
    return (
        <ModuleLayout>
            <CurriculumView
                title="Differential Privacy"
                description="Protecting user data in search logs and learning."
                initialTiers={genericTiers}
                basePath="/advanced/privacy"
            />
        </ModuleLayout>
    );
}
