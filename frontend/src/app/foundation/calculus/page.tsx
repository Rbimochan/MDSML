import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { CurriculumView } from "@/components/modules/CurriculumView";
import { calculusTiers } from "@/data/curriculum";

export default function CalculusPage() {
    return (
        <ModuleLayout>
            <CurriculumView
                title="Calculus & Optimization"
                description="Master the mathematics of change and training neural networks."
                initialTiers={calculusTiers}
                basePath="/foundation/calculus"
            />
        </ModuleLayout>
    );
}
