import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { CategoryLanding } from "@/components/modules/CategoryLanding";

const modules = [
    { title: "Deterministic Ranking", description: "TF-IDF, Vector Space Models, and Boolean Retrieval.", href: "/algorithms/ranking-deterministic" },
    { title: "Probabilistic Ranking", description: "BM25, Language Models, and Divergence from Randomness.", href: "/algorithms/ranking-probabilistic" },
    { title: "Graph Algorithms", description: "PageRank, HITS, Link Analysis, and Community Detection.", href: "/algorithms/graph" },
    { title: "String Searching", description: "Suffix Trees, Aho-Corasick, and text compression.", href: "/algorithms/string" },
];

export default function AlgorithmsPage() {
    return (
        <ModuleLayout>
            <CategoryLanding
                title="Base Algorithms"
                description="Essential algorithms for information retrieval and data processing."
                modules={modules}
            />
        </ModuleLayout>
    );
}
