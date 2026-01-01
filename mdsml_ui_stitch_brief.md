# MDSML UI Design Brief for Google Stitch (& Design-to-Code Tools)

> **For:** Google Stitch, Lovable, Cursor, Figma-to-Code  
> **Project:** Math-Driven ML Education Platform  
> **Use Case:** Copy-paste these prompts directly into your design tool for code generation

---

## Section 1: Design System & Visual Identity

### Color Palette

```
Primary (Thinking-First):
- Deep Blue: #0F1B3C (logic, foundation)
- Accent Blue: #2563EB (interactive, clickable)
- Math Gold: #D4AF37 (mathematical moments, solutions)

Secondary (Math-Specific):
- Computation Green: #10B981 (correct answers)
- Error Red: #EF4444 (mistakes, aha moments)
- Uncertainty Orange: #F59E0B (probability/uncertainty)

Neutral:
- Background: #FAFAFA (light mode) | #0A0E27 (dark mode)
- Text Primary: #1F2937 (light) | #F3F4F6 (dark)
- Text Secondary: #6B7280 (light) | #D1D5DB (dark)
- Border: #E5E7EB (light) | #374151 (dark)

Typography:
- Headers: Inter Bold (sans-serif, clean)
- Body: Inter Regular (readable)
- Math/Code: Fira Code (monospace, exact)
- Emphasis: Fraunces (serif, problem titles)
```

### Spacing & Grid

```
Base Unit: 4px
Common Spacing: 8px, 16px, 24px, 32px, 48px, 64px

Grid: 12-column responsive
- Desktop: 1200px max-width
- Tablet: 768px
- Mobile: 375px

Radius: 8px (components), 12px (cards), 2px (math)
Shadows:
  - Small: 0 1px 2px rgba(0,0,0,0.05)
  - Medium: 0 4px 6px rgba(0,0,0,0.1)
  - Large: 0 10px 15px rgba(0,0,0,0.15)
```

---

## Section 2: Core UI Screens & Prompts

### Screen 1: Dashboard/Learning Hub

**Prompt for Stitch:**

```
Create a learning dashboard for MDSML, a math-first ML education platform.

Layout:
- Header: Logo (MDSML) + Username + Dark mode toggle + Settings (top-right)
- Left Sidebar (sticky): 
  * Foundation (expanded)
    - Linear Algebra
    - Probability & Statistics  
    - Calculus & Optimization
    - Programming Foundations
  * Applied AI (collapsed)
  * Core AI (locked - greyed out)
  * Research Papers (new - badge with count)
  
- Main Content (70% width):
  * Hero Section: "Continue Your Learning"
  * Current Module Card (large, highlighted):
    - Module name: "Linear Algebra: Eigenvectors"
    - Progress bar (65% filled, blue gradient)
    - Difficulty: "Intermediate" (orange badge)
    - Time estimate: "45 min"
    - Button: "Resume" (primary CTA)
  
  * Recommended Next (grid, 2 columns):
    - Card 1: "Review: Linear Transformations" (yellow/warning)
    - Card 2: "Challenge: Eigenvalue Computation" (green/next)
  
  * Recent Problems (table):
    - Columns: Problem | Status | Score | Time | Review
    - Rows: 5 most recent attempts
    - Status icons: ✓ (green), ✗ (red), ? (yellow)

Right Sidebar (20%):
  * Streak Counter: "7 day streak" (fire icon)
  * Concept Mastery (progress rings):
    - Vectors: 85% (green)
    - Matrices: 60% (orange)
    - Eigenvalues: 40% (red)
  * Leaderboard (if v10 social feature):
    - Top 3 users this week
    - Current rank

Color:
- Card backgrounds: White (light) / #1F2937 (dark)
- Primary buttons: #2563EB
- Progress bars: Blue to gold gradient
- Badges: Matching status colors

Animation:
- Sidebar collapse: 300ms ease-out
- Card hover: +2px shadow, subtle scale
- Progress bar: Smooth fill animation on load

Responsive:
- Tablet: Sidebar becomes collapsible hamburger
- Mobile: Single column, sidebar as drawer
```

---

### Screen 2: Problem Solver (The Core Experience)

**Prompt for Stitch:**

```
Create a full-screen problem-solving interface for MDSML.

Layout: 3-column (desktop)
- Left (25%): Problem Statement Panel
- Center (50%): Interactive Scratchpad
- Right (25%): Hints & Solution Panel

===== LEFT PANEL: PROBLEM STATEMENT =====
Header:
  * Breadcrumb: Foundation > Linear Algebra > Eigenvectors > Problem 3 of 7
  * Difficulty badge: "Intermediate"
  * Estimated time: "18 min" (with timer below)

Content:
  * Problem Title (serif, bold, #0F1B3C):
    "Find the Eigenvalues of a 2×2 Matrix"
  
  * Problem Description:
    "Given matrix A = [[3, 1], [1, 3]], find:
     Part 1: Calculate eigenvalues manually
     Part 2: Verify your answer with NumPy
     Part 3: Interpret the geometric meaning"
  
  * Matrix Display (with borders, monospace):
    ┌     ┐
    │ 3 1 │
    │ 1 3 │
    └     ┘
  
  * Key Concepts (tags, light blue background):
    #characteristic-polynomial #eigenvalues #linear-algebra

Bottom:
  * Progress: Problem 3 of 7 (progress bar)
  * Buttons: [Skip] [Show Hint] [Submit Answer]

===== CENTER PANEL: SCRATCHPAD =====
Header:
  * Tabs: [Computation] [Code] [Visualization]
  * Font size slider (for accessibility)

Computation Tab (active by default):
  * Real-time LaTeX editor
  * Input area (light gray, serif font):
    "det(A - λI) = 0
     det([[3-λ, 1], [1, 3-λ]]) = 0
     (3-λ)² - 1 = 0"
  
  * Auto-computation display (below, highlighted in gold):
    "= λ² - 6λ + 8 = 0
     = (λ - 4)(λ - 2) = 0
     → λ₁ = 4, λ₂ = 2"
  
  * Error box (if user makes mistake, red border):
    "⚠️ Did you remember to compute the determinant correctly?"

Code Tab (secondary):
  * Monaco editor with Python syntax highlighting
  * Pre-filled template:
    ```python
    import numpy as np
    A = np.array([[3, 1], [1, 3]])
    eigenvalues, eigenvectors = np.linalg.eig(A)
    print(eigenvalues)
    ```
  * Run button (green, with play icon)
  * Output display (dark background, green text):
    "[4. 2.]"

Visualization Tab (advanced):
  * Matplotlib/Plotly preview:
    - 2D coordinate system
    - Original matrix representation
    - Eigenvector directions as arrows
    - Eigenvalue scaling shown

===== RIGHT PANEL: HINTS & FEEDBACK =====
Header:
  * "Need Help?" (toggle)

Collapsed state:
  * [Show Hint] button (primary)
  * [Show Common Mistakes] button (secondary)
  * [Show Solution] button (danger/gold)

Expanded Hint (smart, progressive):
  * Hint Level 1 (socratic):
    "What mathematical operation gives you eigenvalues?
     Hint: Think about the determinant of (A - λI)..."
  
  * [Next Hint] button
  
  * Hint Level 2 (more direct):
    "Set up: det(A - λI) = 0
     For a 2×2 matrix: det([[a-λ, b], [c, d-λ]])"
  
  * [See Solution] button (gold)

Common Mistakes Section:
  * "❌ Mistake: Forgetting the negative sign"
    "✓ Why: The characteristic equation is det(A - λI), not det(λI - A)"
  
  * "❌ Forgetting to expand the determinant"
    "✓ Why: (3-λ)(3-λ) - 1·1, not just (3-λ) - 1"

Solution Section (if unlocked):
  * Full step-by-step derivation (blue border)
  * Code solution (green border)
  * "Understanding this? Press [Next Problem]"

Feedback Box (dynamic):
  * On correct answer: "🎯 Correct! λ₁ = 4, λ₂ = 2"
    "This means the matrix scales space by 4x and 2x in principal directions."
    [Next Problem] [Review] [Challenge]
  
  * On wrong answer: "⚠️ Not quite. You got λ₁ = 4 ✓ but λ₂ = 3 ✗"
    "Hint: (3-λ)² - 1 ≠ (3-λ) - 1"
    [Try Again] [Show More Help]

===== COLOR & ANIMATION =====
Color:
- Problem area: White background, dark text
- Scratchpad: Light gray (#F3F4F6) background, with borders
- Hints: Soft gradient (blue to gold)
- Correct: Green highlight
- Error: Red underline, orange warning box
- Math expressions: #0F1B3C (dark blue), gold on success

Animation:
- Scratchpad auto-computation: 200ms fade-in
- Hint reveal: 400ms slide-down
- Success confetti: 2sec animation (optional, celebratory)
- Error shake: 300ms horizontal wobble

Responsive:
- Tablet (768px): 2-column (problem + scratchpad, hints as drawer)
- Mobile (375px): Stacked vertical, full-width tabs
```

---

### Screen 3: Real-Time Collaboration Mode

**Prompt for Stitch:**

```
Create a collaborative problem-solving interface (4 students, 1 problem).

Layout: Shared problem + 4 scratchpads

Header:
  * Room ID: "MATH-2024-X7K3" (copyable)
  * Participants (avatars + names):
    - 👤 Alex (you)
    - 👤 Jordan (cursor at line 3)
    - 👤 Sam (idle, 2 min)
    - 👤 Casey (has cursor)
  * Timer: "Collaborative for 15 min" (countdown)
  * [Leave] [Invite] buttons

Main Area (2x2 grid on desktop):
  * Top-Left (50%): Shared Problem Statement
    (same as Screen 2 left panel)
  
  * Top-Right (25%): Your Scratchpad
    Your cursor is here
    Real-time editable
    Border glow: blue (active)
  
  * Bottom-Left (25%): Group Chat/Annotations
    [Alex]: "I got λ = 4"
    [Jordan]: "What about the second one?"
    [Sam]: "I think it's λ = 2"
    [System]: "Everyone solve both parts before submitting"
  
  * Bottom-Right (50%): Merged Scratchpad (read-only, showing all work)
    Colored by contributor:
    - Alex's work: blue text
    - Jordan's work: green text
    - Sam's work: orange text
    - Casey's work: purple text
    
    With timestamps and edit indicators

Right Sidebar: AI Monitoring
  * "Group Progress: 60%"
  * Participation gauge (each person):
    - Alex: ████░░░░ (contributed 40%)
    - Jordan: ██████░░ (60%)
    - Sam: ████░░░░ (40%)
    - Casey: ██████████ (100%)
  
  * AI Intervention (if imbalance detected):
    "💡 Sam, what's your thinking on the second eigenvalue?"
    [Acknowledge] [Ask for Help]
  
  * Solution Preview (gold box, bottom):
    "Ready to submit when all agree"
    [Submit as Group] [Switch to Individual]

Color:
- Your scratchpad: Light blue border
- Other's active: Green border
- Idle (>5 min): Gray border
- Chat: Light background, blue name tags
- Merged view: Color-coded by person

Animation:
- Cursor position: Smooth movement when others type
- New message: Slide in from bottom
- AI intervention: Gentle pulse

Responsive:
- Tablet: 2-column layout (scratchpad + problem, chat as drawer)
- Mobile: Stacked tabs [Problem] [Your Work] [Group] [Chat]
```

---

### Screen 4: Adaptive Learning Path

**Prompt for Stitch:**

```
Create an interactive learning path visualization for adaptive curriculum.

Layout: Full-screen DAG (directed acyclic graph) visualization

Header:
  * "Your Personalized Learning Path"
  * Difficulty slider: [Beginner ----●---- Challenging]
  * View options: [Timeline] [Graph] [List]
  * Time estimate: "~120 hours to Foundation mastery"

Graph (interactive, zoomable):
  * Nodes (modules):
    - Completed: ✓ (green, filled)
    - Current: ◉ (blue, pulsing glow)
    - Recommended Next: ◎ (gold, slightly larger)
    - Locked/Future: ○ (gray, faded)
    - Needs Review: ⚠️ (orange, warning icon)
  
  * Edges (dependencies):
    - Solid line: Must complete before
    - Dashed line: Recommended sequence
    - Thickness: Importance weight
  
  * Sample Nodes:
    [✓ Vectors & Norms] → [✓ Matrices] → [◉ Eigenvectors]
                               ↓
                    [⚠️ Review: Matrix Mult] → [◎ Diagonalization]
                               ↓
                    [○ PCA] → [○ SVD] → [○ Spectral Clustering]
  
  * Tooltip on hover:
    "Module: Eigenvectors
     Your mastery: 60%
     Recent score: 7/10
     Next: Diagonalization
     [Start] [Review] [Challenge]"

Right Sidebar: Knowledge State
  * "Concept Mastery Map"
  * Circular progress indicators:
    - Vectors: ████████░░ 80%
    - Matrices: ██████░░░░ 60% (needs review)
    - Norms: ████████░░ 85%
    - Eigenvalues: ██████░░░░ 60%
    - Linear Transformation: ████░░░░░░ 40% (new)
  
  * "AI Recommendation:"
    "Your knowledge graph shows weakness in Linear Transformations.
     Complete [Review Module] before attempting Eigenvectors 2."
    [Accept] [Challenge Anyway]

Bottom Panel: Timeline View (optional)
  * Weekly milestone view
  * "Based on 45 min/day, you'll master Foundation in 8 weeks"
  * Projected checkpoint dates

Color:
- Completed: Green (#10B981)
- Current: Blue (#2563EB), with glow
- Recommended: Gold (#D4AF37)
- Review needed: Orange (#F59E0B)
- Locked: Gray (#9CA3AF)
- Edges: Light gray with gradient on critical path (darker)

Animation:
- Node entrance: Fade + scale (300ms)
- Path highlight: When hovering node, light up incoming + outgoing (200ms)
- Glow pulse: Current node pulses every 2 seconds
- Zoom: Smooth transition on mouse wheel
- Drag: Pan the graph smoothly

Responsive:
- Desktop: Full graph with sidebar
- Tablet: Graph takes full width, sidebar below
- Mobile: Timeline view (list) preferred, graph as option
```

---

### Screen 5: Research Paper Browser (RAG Integration)

**Prompt for Stitch:**

```
Create a research paper discovery interface linked to concepts.

Layout: Split panel

Left (60%): Paper List & Search
  * Search bar: "Find papers on eigenvalues..." (with autocomplete)
  * Filters (left sidebar, collapsible):
    - Concept: [Eigenvalues] [PCA] [Optimization] (selectable)
    - Year: 1950 ────●──── 2024
    - Citation Count: 10 ────●──── 10,000
    - Source: [ArXiv] [ACL] [ICCV] [NeurIPS]
  
  * Paper Cards (list):
    [1] "The Spectral Theorem and Principal Component Analysis"
        Authors: John Doe, Jane Smith
        ArXiv 2020 | Citations: 1,247
        "This paper first proved eigenvalues are real for symmetric matrices..."
        [Read Full] [Add to Favorites] [Link to Module]
    
    [2] "Attention is All You Need"
        Authors: Vaswani et al.
        NeurIPS 2017 | Citations: 89,234
        "In this work, we propose a new simple network architecture based on attention..."
        "🔗 Concepts: Linear Algebra, Matrices, Scaling"
        [Read Full] [Add to Favorites]
    
    [3] "Understanding Deep Learning Requires Rethinking Generalization"
        ...

Right (40%): Paper Detail (preview)
  * Title (large, serif)
  * Authors + Date
  * Abstract (highlighted excerpt):
    "...we show that eigenvalues [highlighted in gold] of the Hessian..."
  
  * Key Concepts (colored tags):
    #eigenvalues (blue) #linear-algebra (blue) #optimization (orange)
  
  * "Linked to Your Learning:"
    ✓ Eigenvectors (you're learning this!)
    ○ Diagonalization (next module)
    ○ SVD (in 2 months)
  
  * "Why This Paper Matters:"
    "This seminal work shows why eigenvalues determine model stability.
     When you reach Optimization (v2.3), you'll understand why transformers
     use spectral normalization."
  
  * [Read PDF] [Save] [Share] [Citation] buttons

Bottom Panel: Related Concepts Timeline
  * "This concept appears in:"
    1901: PCA discovered
    1960: SVD developed
    2017: Transformers (attention uses matrix eigendecomposition)
    2024: Modern techniques build on these foundations

Color:
- Paper cards: White background, blue title
- Key concepts: Gold highlights in text
- Linked concepts: Blue tags
- Related: Timeline with gradient

Animation:
- Paper select: Right panel slides in (300ms)
- Concept highlights: Fade in with subtle glow
- Timeline: Horizontal scroll smooth

Responsive:
- Tablet: Full-width paper list, detail as modal
- Mobile: Vertical stack, full-width detail view
```

---

## Section 3: Micro-Interactions & Animations

### Interaction Patterns

**Success Moment (Problem Solved)**
```
1. User submits correct answer
2. Scratchpad background flashes gold (100ms)
3. Checkmark appears with bounce animation (300ms)
4. Confetti falls (2s, celebratory but not annoying)
5. Gold bar fills at top indicating "1/7 complete"
6. "Next Problem" button grows slightly (scale 1.05)
7. AI feedback appears with fade-in (400ms)
8. Streak counter increments with +1 animation (1s)
```

**Hint Reveal (Progressive Help)**
```
1. User clicks "Show Hint"
2. Hint panel slides down from top (400ms ease-out)
3. Hint text fades in (300ms)
4. Left border glows gold for 1 second
5. "Next Hint" button appears below
6. If user ignores, button darkens slightly after 30 seconds
```

**Collaborative Cursor**
```
1. Another user types
2. Their cursor appears as colored vertical line
3. Their name appears above cursor (floating label)
4. As they type, text appears in real-time (100ms debounce)
5. When idle for 5+ min, cursor fades to 50% opacity
6. When they come back, cursor brightens (fade-in)
```

**Knowledge Update (Adaptive Path Change)**
```
1. System detects user mastery (e.g., 3/3 correct)
2. Sidebar learning path updates
3. Next-recommended node highlights (pulse animation, 300ms)
4. AI message appears: "You've unlocked [New Module]!"
5. Node color transitions from orange → blue (500ms)
6. Streak badge updates with +1
```

---

## Section 4: Copy-Paste Prompts for Stitch/Lovable/Cursor

### Prompt 1: Dashboard (Start Here)

```
Build me a learning dashboard for MDSML (math-first ML platform).

Requirements:
1. Left sidebar with nested curriculum menu:
   - Foundation (expanded)
     * Linear Algebra
     * Probability & Statistics
     * Calculus & Optimization
     * Programming Foundations
   - Applied AI (collapsed)
   - Core AI (locked)
   
2. Main content area with:
   - "Continue Your Learning" section
   - Current module card (large, with progress bar)
   - Recommended next 2 modules (grid)
   - Recent problems table (6 rows)
   
3. Right sidebar with:
   - 7-day streak counter
   - Concept mastery circles (4 concepts, 0-100%)
   - Leaderboard top 3

Colors:
- Primary: #2563EB (blue)
- Accent: #D4AF37 (gold)
- Success: #10B981 (green)
- Background: #FAFAFA (light) or #0A0E27 (dark)

Typography:
- Headers: Inter Bold
- Body: Inter Regular
- Code: Fira Code
- Problem titles: Fraunces (serif)

Animations:
- Sidebar collapse: 300ms ease-out
- Card hover: +2px shadow, scale 1.02
- Progress bars: Smooth fill on load

Make it responsive (desktop: 3-column, tablet: 2-column, mobile: 1-column).
```

### Prompt 2: Problem Solver (Core Experience)

```
Build a 3-column problem-solving interface for MDSML.

Left (25%): Problem statement
- Breadcrumb navigation
- Difficulty badge
- Problem title (serif, large)
- Problem description with LaTeX math
- Key concepts as tags
- [Skip] [Hint] [Submit] buttons at bottom

Center (50%): Interactive scratchpad
- Tabs: [Computation] [Code] [Visualization]
- Computation tab: LaTeX editor with auto-math evaluation
- Code tab: Python code editor with [Run] button
- Visualization tab: Plotly chart preview

Right (25%): Hints & feedback
- Collapsed: [Show Hint] [Show Mistakes] [See Solution]
- Expanded: Progressive hints (Level 1, 2, 3)
- Common mistakes section
- AI feedback (correct/incorrect)

Make math expressions render in gold on correct answer.
Add error shake animation for wrong submissions.
Color correct answers green, errors red.
Mobile: Stack as tabs [Problem] [Scratchpad] [Hints].
```

### Prompt 3: Collaboration Mode

```
Build a real-time collaborative problem-solving interface.

Features:
1. 4-person scratchpad grid (2x2 on desktop)
   - Top-left: Shared problem statement
   - 3 user scratchpads with different colors per person
   - Merged view showing all work color-coded
   
2. Right sidebar:
   - List of 4 participants with avatars
   - Contribution percentage for each (progress bars)
   - AI intervention suggestions
   
3. Bottom chat:
   - Real-time messages
   - [System] messages for key events
   
4. Cursor tracking:
   - When User A types, show their colored cursor
   - Display their name floating above cursor

Colors:
- User A: Blue (#2563EB)
- User B: Green (#10B981)
- User C: Orange (#F59E0B)
- User D: Purple (#9333EA)

Animations:
- Cursor movement: Smooth transition
- New message: Slide in from bottom
- Typing indicator: Pulsing dots
- Name popup: Fade in above cursor

Mobile: Stack as tabs or drawer menu.
```

### Prompt 4: Adaptive Learning Path (Graph View)

```
Build an interactive learning path visualization.

Core element: Directed acyclic graph (DAG) showing curriculum modules.

Node states:
- Completed: Green circle with checkmark
- Current: Blue circle with pulse glow
- Recommended: Gold/orange circle (larger)
- Locked: Gray circle (faded)
- Needs review: Orange circle with warning icon

Edges: Lines connecting nodes
- Solid: Must-complete before
- Dashed: Recommended sequence
- Thickness: Importance

Interactivity:
- Hover node: Show tooltip with mastery % and buttons
- Zoom/pan: Mouse wheel to zoom, drag to move
- Highlight path: When hovering, light up all incoming/outgoing

Right sidebar: "Concept Mastery"
- 4-5 circular progress indicators (0-100%)
- AI recommendation text below

Bottom: Timeline view (optional)
- "Master Foundation in 8 weeks at 45 min/day"

Mobile: Switch to list view (vertical timeline).
```

### Prompt 5: Research Papers (RAG Browser)

```
Build a research paper discovery interface.

Left panel (60%): Paper list
- Search bar with autocomplete
- Filters: Concept, Year, Citation count, Source
- List of paper cards showing:
  * Title + Authors
  * Year + Citation count
  * Abstract excerpt (key concepts highlighted in gold)
  * [Read] [Save] buttons

Right panel (40%): Paper detail (preview)
- Full title + metadata
- Abstract (with key concepts highlighted)
- "Linked to Your Learning" section showing related modules
- "Why This Paper Matters" - AI-generated summary
- Timeline at bottom showing when concept appeared in research

Colors:
- Key concepts: #D4AF37 (gold)
- Links to your modules: #2563EB (blue)
- Background: White (light) or dark mode

Animation:
- Panel slide in when paper selected (300ms)
- Concept highlights fade in
- Timeline horizontal scroll smooth

Mobile: Full-width list, detail as modal.
```

---

## Section 5: Design Tokens (For Code Generation)

```json
{
  "colors": {
    "primary": "#2563EB",
    "success": "#10B981",
    "warning": "#F59E0B",
    "error": "#EF4444",
    "accent": "#D4AF37",
    "dark": "#0F1B3C",
    "light": "#FAFAFA"
  },
  "typography": {
    "fontFamily": {
      "sans": "Inter",
      "mono": "Fira Code",
      "serif": "Fraunces"
    },
    "fontSize": {
      "xs": "12px",
      "sm": "14px",
      "base": "16px",
      "lg": "18px",
      "xl": "20px",
      "2xl": "24px",
      "3xl": "32px"
    }
  },
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    "md": "16px",
    "lg": "24px",
    "xl": "32px",
    "2xl": "48px"
  },
  "borderRadius": {
    "sm": "4px",
    "md": "8px",
    "lg": "12px",
    "full": "9999px"
  },
  "shadows": {
    "sm": "0 1px 2px rgba(0,0,0,0.05)",
    "md": "0 4px 6px rgba(0,0,0,0.1)",
    "lg": "0 10px 15px rgba(0,0,0,0.15)"
  },
  "animations": {
    "duration": {
      "fast": "200ms",
      "normal": "300ms",
      "slow": "500ms"
    },
    "easing": {
      "default": "ease-out",
      "bounce": "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
    }
  }
}
```

---

## Section 6: Accessibility & Responsive Design

### Accessibility Requirements

```
✓ WCAG 2.1 AA compliance
✓ Keyboard navigation (Tab, Enter, Arrow keys)
✓ Screen reader support (semantic HTML, ARIA labels)
✓ Color contrast >= 4.5:1 for text
✓ Focus indicators: 2px blue outline
✓ Reduced motion: @prefers-reduced-motion (disable animations)
✓ Alt text for all images
✓ Form labels associated with inputs
✓ Error messages linked to form fields
```

### Responsive Breakpoints

```
Mobile (375px - 767px):
- Single column layout
- Sidebar becomes hamburger menu
- Full-width problem statements
- Tabs for scratchpad/hints/code
- Smaller font sizes (touch-friendly)

Tablet (768px - 1023px):
- 2-column layout
- Sidebar collapsible
- Problem + scratchpad visible together
- Hints in right drawer

Desktop (1024px+):
- Full 3-column layout
- Sticky sidebars
- Side-by-side panels
- All options visible

Large Screens (1400px+):
- Max-width constraint (1200px)
- Additional whitespace
```

---

## Section 7: Quick Start for Design-to-Code Tools

### For Google Stitch:

1. Copy Prompt 1 (Dashboard) → Paste into Stitch
2. Stitch generates React/HTML code
3. Refine with color tokens (Section 5)
4. Test responsive breakpoints
5. Move to Prompt 2 (Problem Solver)
6. Integrate prompts into design system

### For Lovable:

```
"Build a comprehensive learning platform dashboard with:
1. [Dashboard screen requirements from Prompt 1]
2. Color palette: [colors from Section 5]
3. Use Tailwind CSS for styling
4. Make responsive for mobile (375px), tablet (768px), desktop (1024px)
5. Add smooth animations for interactions
6. Export as React components ready to integrate with FastAPI backend"
```

### For Cursor/Claude:

```
"I'm building MDSML, a math-first ML education platform. 
Generate React components for these 5 screens:
1. Dashboard (left sidebar, main content, right sidebar)
2. Problem Solver (3-column: problem, scratchpad, hints)
3. Collaboration (2x2 grid with real-time cursors)
4. Learning Path (DAG visualization)
5. Research Papers (search + detail)

Use:
- Tailwind CSS for styling
- NextJS App Router
- Real-time features: Socket.io for collaboration
- MathJax for LaTeX rendering
- Recharts for graphs

Design tokens: [paste Section 5 JSON]"
```

---

## Section 8: Component Library Checklist

These are the reusable components you'll need to build/generate:

### Layout Components
- [ ] Sidebar (collapsible, nested menu)
- [ ] Header/Navbar (with user dropdown)
- [ ] Card (base component)
- [ ] Grid (responsive 12-column)
- [ ] Modal/Dialog
- [ ] Drawer (mobile sidebar)
- [ ] Tabs
- [ ] Panels (3-column layout)

### Form Components
- [ ] Input (text, number)
- [ ] Button (primary, secondary, danger)
- [ ] Badge/Tag
- [ ] Checkbox/Radio
- [ ] Select/Dropdown
- [ ] Search bar with autocomplete

### Data Components
- [ ] Table (sortable, filterable)
- [ ] Progress bar
- [ ] Progress ring (circular)
- [ ] Chart (bar, line, area)
- [ ] Leaderboard item

### Math/Code Components
- [ ] LaTeX renderer (MathJax)
- [ ] Code editor (Monaco)
- [ ] Scratchpad (custom text area)
- [ ] Syntax highlighter
- [ ] Output display (code execution)

### Interactive Components
- [ ] Tooltip
- [ ] Popover
- [ ] Alert/Toast notification
- [ ] Loading spinner
- [ ] Skeleton loader
- [ ] Breadcrumb

### Graph/Visualization
- [ ] DAG node (interactive)
- [ ] DAG edge
- [ ] Collaborative cursor
- [ ] Timeline (vertical/horizontal)
- [ ] Heatmap (mastery progress)

---

## Section 9: File Structure for Generated Code

After Stitch/Lovable generates code, organize it like this:

```
frontend/
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Layout.tsx
│   │   ├── Dashboard/
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── ModuleCard.tsx
│   │   │   ├── RecentProblemsTable.tsx
│   │   │   └── MasteryRings.tsx
│   │   ├── ProblemSolver/
│   │   │   ├── ProblemSolverPage.tsx
│   │   │   ├── ProblemPanel.tsx
│   │   │   ├── Scratchpad.tsx
│   │   │   ├── CodeEditor.tsx
│   │   │   └── HintsPanel.tsx
│   │   ├── Collaboration/
│   │   │   ├── CollaborationPage.tsx
│   │   │   ├── SharedScratchpad.tsx
│   │   │   ├── ParticipantList.tsx
│   │   │   └── GroupChat.tsx
│   │   ├── LearningPath/
│   │   │   ├── LearningPathPage.tsx
│   │   │   ├── DAGVisualization.tsx
│   │   │   ├── MasteryMap.tsx
│   │   │   └── Timeline.tsx
│   │   ├── Research/
│   │   │   ├── ResearchPage.tsx
│   │   │   ├── PaperList.tsx
│   │   │   ├── PaperDetail.tsx
│   │   │   └── ConceptTimeline.tsx
│   │   ├── Common/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Tooltip.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useUserProgress.ts
│   │   ├── useSocket.ts
│   │   ├── useAdaptivePath.ts
│   │   └── useProblemGenerator.ts
│   ├── styles/
│   │   ├── globals.css
│   │   ├── tailwind.config.js
│   │   └── design-tokens.json
│   ├── utils/
│   │   ├── api.ts
│   │   ├── math.ts
│   │   └── formatting.ts
│   ├── app/
│   │   ├── page.tsx (dashboard)
│   │   ├── problem/[id]/page.tsx
│   │   ├── collaborate/[roomId]/page.tsx
│   │   ├── path/page.tsx
│   │   └── research/page.tsx
│   └── types/
│       ├── curriculum.ts
│       ├── user.ts
│       ├── problem.ts
│       └── collaboration.ts
```

---

## Section 10: Questions to Ask Stitch/Lovable Before Generating

1. **Framework**: NextJS (recommended) or React?
2. **Styling**: Tailwind CSS (recommended) or styled-components?
3. **UI Library**: shadcn/ui, Headless UI, or from scratch?
4. **State Management**: Zustand, TanStack Query, or Context?
5. **Real-time**: Socket.io, WebSockets, or server-sent events?
6. **Deployment**: Vercel, Netlify, or custom?
7. **Dark Mode**: Native support needed?
8. **Animations**: Framer Motion or CSS-only?

---

## Copy-Paste Template for Getting Started

```
I'm building MDSML, a thinking-first ML education platform with 5 core screens.

PROJECT BRIEF:
- Platform: Math-first ML curriculum (Foundation → Applied → Core)
- Users: Students learning ML through manual computation first
- Key feature: Personalized learning paths, real-time collaboration, AI tutoring

SCREENS TO BUILD:
1. Dashboard (learning hub)
2. Problem Solver (core experience - 3 columns)
3. Collaboration Mode (4-student real-time)
4. Adaptive Learning Path (DAG visualization)
5. Research Paper Browser (RAG-linked)

DESIGN SYSTEM:
- Primary color: #2563EB (blue)
- Accent: #D4AF37 (gold)
- Success: #10B981 (green)
- Error: #EF4444 (red)
- Typography: Inter (sans), Fraunces (serif), Fira Code (mono)
- Spacing: 4px base unit
- Radius: 8px default

TECH STACK:
- NextJS 15+ with App Router
- TailwindCSS for styling
- MathJax for LaTeX
- Monaco Editor for code
- Socket.io for real-time
- shadcn/ui for components

REQUIREMENTS:
- Responsive (mobile 375px, tablet 768px, desktop 1024px+)
- Dark mode support
- Smooth animations (300ms transitions)
- Accessibility (WCAG 2.1 AA)
- Interactive (hover states, focus states)

Please generate React components for Screen 1 (Dashboard) with:
- Left sidebar with nested menu
- Main content area with current module card
- Right sidebar with mastery indicators
- Responsive layout
- Ready to integrate with FastAPI backend at http://localhost:8000

[START GENERATION]
```

---

## Summary: Your Next Steps

1. **Choose your tool**: Google Stitch, Lovable, Cursor, or Figma-to-Code
2. **Copy the prompt** from Section 4 (Prompts 1-5)
3. **Paste into tool** + adjust for your preferences
4. **Get generated code** (React components)
5. **Integrate with FastAPI** backend (from previous document)
6. **Test responsive breakpoints** and animations
7. **Add real-time features** (WebSocket integration)
8. **Deploy to Vercel** (frontend) + Railway (backend)

**Recommended generation order:**
- Week 1: Dashboard + Problem Solver (Screens 1-2)
- Week 2: Collaboration + Learning Path (Screens 3-4)
- Week 3: Research Papers + Polish (Screen 5)

---

**Note**: These prompts are designed to be detailed enough for AI design-to-code tools to generate production-ready components, while leaving room for your customization and backend integration.