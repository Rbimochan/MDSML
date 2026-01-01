import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { CurriculumView } from "@/components/modules/CurriculumView";
import { probabilityTiers } from "@/data/curriculum";

export default function ProbabilityPage() {
    return (
        <ModuleLayout>
            <CurriculumView
                title="Probability & Statistics"
                description="Understand uncertainty, distributions, and Bayesian inference."
                initialTiers={probabilityTiers}
                basePath="/foundation/probability"
            />
        </ModuleLayout>
    );
}
