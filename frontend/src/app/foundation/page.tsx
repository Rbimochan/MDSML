import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { CategoryLanding } from "@/components/modules/CategoryLanding";

const modules = [
    { title: "Linear Algebra", description: "Vectors, matrices, eigenvectors, and decomposition.", href: "/foundation/linear-algebra" },
    { title: "Calculus & Optimization", description: "Derivatives, gradients, and backpropagation foundations.", href: "/foundation/calculus" },
    { title: "Stats & Probability", description: "Distributions, Bayes theorem, and uncertainty.", href: "/foundation/probability" },
    { title: "Geometry & Topology", description: "Vector spaces, manifolds, and high-dimensional shapes.", href: "/foundation/geometry" },
];

export default function FoundationPage() {
    return (
        <ModuleLayout>
            <CategoryLanding
                title="Base Mathematics"
                description="The core mathematical pillars required for building 2026-era Machine Learning systems."
                modules={modules}
            />
        </ModuleLayout>
    );
}
