import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { CategoryLanding } from "@/components/modules/CategoryLanding";

const modules = [
    { title: "Quantum IR", description: "Quantum probability ranking principles and interference.", href: "/advanced/quantum" },
    { title: "Differential Privacy", description: "Protecting user data, search logs, and federation.", href: "/advanced/privacy" },
    { title: "Game Theory", description: "Ad auctions, adversarial machine learning, and strategy.", href: "/advanced/game-theory" },
];

export default function AdvancedPage() {
    return (
        <ModuleLayout>
            <CategoryLanding
                title="Expanded Topics"
                description="Advanced and specialized topics for cutting-edge ML systems."
                modules={modules}
            />
        </ModuleLayout>
    );
}
