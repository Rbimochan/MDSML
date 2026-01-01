import { Tier } from "@/components/modules/CurriculumView";

export const calculusTiers: Tier[] = [
    {
        id: 1,
        title: "Limits & Continuity",
        description: "The foundation of calculus.",
        requiredPoints: 0,
        isLocked: false,
        topics: [
            { id: "limits-intro", title: "Introduction to Limits", description: "Understanding behavior near a point", status: 'active', points: 100 },
            { id: "continuity", title: "Continuity", description: "Smooth vs jumps", status: 'locked', points: 100 },
        ],
        gatekeeperExam: { title: "Limits Mastery", passingScore: 80, questions: 10 }
    },
    {
        id: 2,
        title: "Derivatives",
        description: "Rates of change and optimization.",
        requiredPoints: 500,
        isLocked: true,
        topics: [
            { id: "power-rule", title: "Power Rule", description: "Differentiation basics", status: 'locked', points: 100 },
            { id: "chain-rule", title: "Chain Rule", description: "Backpropagation foundation", status: 'locked', points: 150 },
            { id: "gradient-descent", title: "Gradient Descent", description: "Minimizing loss functions", status: 'locked', points: 200 },
        ]
    }
];

export const probabilityTiers: Tier[] = [
    {
        id: 1,
        title: "Foundations of Probability",
        description: "Chance and uncertainty.",
        requiredPoints: 0,
        isLocked: false,
        topics: [
            { id: "probability-axioms", title: "Axioms of Probability", description: "The rules of the game", status: 'active', points: 100 },
            { id: "bayes-theorem", title: "Bayes Theorem", description: "Updating beliefs with data", status: 'locked', points: 150 },
        ],
        gatekeeperExam: { title: "Probability Basics", passingScore: 80, questions: 10 }
    }
];

export const geometryTiers: Tier[] = [
    {
        id: 1,
        title: "Vector Geometry",
        description: "Space and direction.",
        requiredPoints: 0,
        isLocked: false,
        topics: [
            { id: "vectors-intro", title: "Vectors & Spaces", description: "Magnitude and direction", status: 'active', points: 100 },
            { id: "dot-product", title: "Cosine Similarity", description: "Measuring similarity", status: 'locked', points: 150 },
        ]
    }
];

// Placeholder for others to scale fast
export const genericTiers: Tier[] = [
    {
        id: 1,
        title: "Module 1",
        description: "Foundation concepts.",
        requiredPoints: 0,
        isLocked: false,
        topics: [
            { id: "topic-1", title: "Introduction", description: "Key concepts overview", status: 'active', points: 100 },
            { id: "topic-2", title: "Deep Dive", description: "Advanced theory", status: 'locked', points: 150 },
        ]
    }
];
