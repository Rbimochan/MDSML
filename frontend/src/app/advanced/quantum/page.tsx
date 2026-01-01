import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { CurriculumView } from "@/components/modules/CurriculumView";
import { genericTiers } from "@/data/curriculum";

export default function QuantumIRPage() {
    return (
        <ModuleLayout>
            <CurriculumView
                title="Quantum IR"
                description="Quantum probability ranking principles and interference."
                initialTiers={genericTiers}
                basePath="/advanced/quantum"
            />
        </ModuleLayout>
    );
}
