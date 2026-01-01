
export interface TopicContent {
    id: string;
    title: string;
    concept: {
        title: string;
        content: string; // HTML string for now, or markdown
    };
    video: {
        url: string;
        title: string;
    };
    coding: {
        initialCode: string;
        solution?: string; // Optional for now
        expectedOutput?: string;
    };
}

export const topicContents: Record<string, TopicContent> = {
    "scalars-vectors-matrices": {
        id: "scalars-vectors-matrices",
        title: "Scalars, Vectors, Matrices, and Tensors",
        concept: {
            title: "The Building Blocks of Linear Algebra",
            content: `
                <div class="prose prose-slate dark:prose-invert max-w-none">
                    <p class="lead">
                        In Machine Learning, data is represented using four fundamental structures. Understanding these is the first step to mastering the "language" of data.
                    </p>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                        <div class="p-6 bg-card border border-border rounded-xl">
                            <h3 class="text-xl font-bold mb-2">Scalar (Rank 0 Tensor)</h3>
                            <p class="text-muted-foreground mb-4">A single number.</p>
                            <code class="bg-muted px-2 py-1 rounded">x = 5</code>
                        </div>
                        <div class="p-6 bg-card border border-border rounded-xl">
                            <h3 class="text-xl font-bold mb-2">Vector (Rank 1 Tensor)</h3>
                            <p class="text-muted-foreground mb-4">An ordered list of numbers.</p>
                            <code class="bg-muted px-2 py-1 rounded">x = [1, 2, 3]</code>
                        </div>
                        <div class="p-6 bg-card border border-border rounded-xl">
                            <h3 class="text-xl font-bold mb-2">Matrix (Rank 2 Tensor)</h3>
                            <p class="text-muted-foreground mb-4">A 2D grid of numbers.</p>
                            <code class="bg-muted px-2 py-1 rounded">X = [[1, 2], [3, 4]]</code>
                        </div>
                        <div class="p-6 bg-card border border-border rounded-xl">
                            <h3 class="text-xl font-bold mb-2">Tensor (Rank n Tensor)</h3>
                            <p class="text-muted-foreground mb-4">Generalized n-dimensional arrays.</p>
                            <div class="text-sm italic">e.g., An RGB image is a rank-3 tensor (Height x Width x Color).</div>
                        </div>
                    </div>

                    <h3>Geometric Intuition</h3>
                    <p>
                        A vector can be visualized as an arrow in space, pointing from the origin to a specific coordinate. A matrix can be thought of as a <em>transformation</em> that moves, rotates, or stretches these vectors.
                    </p>
                </div>
            `
        },
        video: {
            url: "https://www.youtube.com/watch?v=fNk_zzaMoSs", // 3Blue1Brown Vectors
            title: "Vectors | Chapter 1, Essence of linear algebra"
        },
        coding: {
            initialCode: `import numpy as np

# 1. Create a scalar
scalar_x = 5
print(f"Scalar: {scalar_x}")

# 2. Create a vector (1D array)
vector_v = np.array([1, 2, 3])
print(f"\\nVector:\\n{vector_v}")
print(f"Shape of vector: {vector_v.shape}")

# 3. Create a matrix (2D array)
matrix_A = np.array([
    [1, 2, 3],
    [4, 5, 6]
])
print(f"\\nMatrix:\\n{matrix_A}")
print(f"Shape of matrix: {matrix_A.shape}")

# TODO: Create a 3x3 diagonal matrix called 'D' with 1s on the diagonal
# Hint: np.eye(3)
`,
        }
    },
    "eigendecomposition": {
        id: "eigendecomposition",
        title: "Eigendecomposition",
        concept: {
            title: "Understanding Eigenvalues",
            content: `
                <div class="prose prose-slate dark:prose-invert max-w-none">
                    <p class="lead">
                        Eigenvalues are a special set of scalars associated with a linear system of equations (i.e., a matrix equation) that are sometimes also known as characteristic roots, characteristic values, proper values, or latent roots.
                    </p>

                    <div class="my-8 rounded-xl bg-muted/30 p-6 border border-border">
                        <h3 class="text-lg font-semibold mb-4">Geometric Intepretation</h3>
                        <p>
                            If we consider a matrix <strong>A</strong> as a transformation of space, an eigenvector is a vector whose direction does not change when that transformation is applied.
                        </p>
                    </div>

                    <h3>The Characteristic Equation</h3>
                    <p>
                        To find the eigenvalues, we solve the characteristic equation:
                    </p>
                    <div class="my-4 rounded-lg bg-card p-4 border border-border text-center font-mono text-lg">
                        det(A - λI) = 0
                    </div>
                </div>
            `
        },
        video: {
            url: "https://www.youtube.com/watch?v=PFDu9oVAE-g",
            title: "Eigenvectors and Eigenvalues | Essence of linear algebra, chapter 14"
        },
        coding: {
            initialCode: `import numpy as np

# Define matrix A
A = np.array([[3, 1], 
              [1, 3]])

# Calculate eigenvalues and eigenvectors
# np.linalg.eig returns a tuple (eigenvalues, eigenvectors)
w, v = np.linalg.eig(A)

print("Matrix A:")
print(A)
print("\\nEigenvalues:")
print(w)
print("\\nEigenvectors:")
print(v)

# Verify: Av = λv
# Let's take the first eigenvector (column 0)
v0 = v[:, 0]
lambda0 = w[0]

# Check if A @ v0 is roughly equal to lambda0 * v0
print("\\nVerification (A @ v0):")
print(A @ v0)
print("Verification (lambda0 * v0):")
print(lambda0 * v0)
`,
        }
    }
};
