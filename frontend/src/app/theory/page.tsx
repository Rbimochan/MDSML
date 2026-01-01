import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { CategoryLanding } from "@/components/modules/CategoryLanding";

const modules = [
    { title: "Crawling Theory", description: "URL frontiers, politeness policies, and freshness.", href: "/theory/crawling" },
    { title: "Indexing Theory", description: "Inverted indices, skip lists, and index compression.", href: "/theory/indexing" },
    { title: "Querying Theory", description: "Query parsing, expansion, rewriting, and intent.", href: "/theory/querying" },
    { title: "Ranking Theory", description: "Learning to Rank (LTR), evaluation metrics (NDCG), and clicks.", href: "/theory/ranking" },
];

export default function TheoryPage() {
    return (
        <ModuleLayout>
            <CategoryLanding
                title="Base Theory"
                description="The theoretical underpinnings of search engines and information systems."
                modules={modules}
            />
        </ModuleLayout>
    );
}
