import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { CurriculumView } from "@/components/modules/CurriculumView";
import { geometryTiers } from "@/data/curriculum";

export default function GeometryPage() {
    return (
        <ModuleLayout>
            <CurriculumView
                title="Geometry & Topology"
                description="Explore vector spaces, manifolds, and the shape of data."
                initialTiers={geometryTiers}
                basePath="/foundation/geometry"
            />
        </ModuleLayout>
    );
}
