# MDSML v10: Advanced AI Features & Full-Stack Architecture

## Executive Summary

You're building a **thinking-first ML education platform**. By v10, it becomes an intelligent tutoring system (ITS) with adaptive learning, real-time collaboration, and research-grade problem generation. This document covers the product roadmap (v1→v10) and the complete tech stack to support it.

---

## Part 1: Version Roadmap (v1 → v10)

### v1-2: Foundation (Months 1-3)
- Linear Algebra module (scratchpad + visualization)
- Manual math → NumPy progression
- Basic progress tracking

### v3-4: Expansion (Months 4-6)
- Probability & Statistics verticals
- Calculus & Optimization modules
- Mistake-driven learning (common wrong answers)

### v5-6: Integration (Months 7-9)
- Applied AI curriculum mapping
- Python foundations
- Paper linking (research bridging)

### v7-8: Intelligence (Months 10-12)
- **Adaptive learning paths** (AI personalization)
- **Live problem generation** (Claude API)
- **Collaborative workspaces** (real-time)

### v9-10: Enterprise & Research (Months 13+)
- **Multi-agent problem debugging**
- **Research paper synthesis** (RAG)
- **Credential verification**
- **Corporate training API**

---

## Part 2: v7-10 AI Features (The Differentiator)

### 🤖 Feature 1: Adaptive Learning Paths (v7)

**What It Does**
- Detects weak spots in foundation knowledge
- Generates personalized module sequences
- Predicts optimal difficulty progression

**Implementation**
```
User solves Module 3 (Eigenvectors) → 60% accuracy
↓
System detects: "Weak on linear transformations"
↓
Recommends review → Dynamic quiz on that concept
↓
Only progresses if 85%+ on review
```

**Tech Requirements**
- Learner state model (Bayesian knowledge tracing)
- Session-level performance database
- Real-time path recomputation

### 🎯 Feature 2: Live Problem Generation (v7-v8)

**What It Does**
- Claude generates infinite unique problems from curriculum
- Parameterized templates with semantic variation
- Auto-generated solutions with reasoning

**Example Flow**
```
User: "I want 5 problems on Gradient Descent"
↓
System calls Claude API with context:
  - User's level
  - Topic constraints
  - Difficulty parameters
↓
Claude returns:
  - 5 unique problems (math + code variants)
  - Step-by-step solutions
  - Common mistake explanations
↓
User solves → Real-time feedback
```

**Why It's Powerful**
- Infinite practice without content bottleneck
- Problems adapt to user learning level
- Students can't "cheat" by memorizing answers

### 🔗 Feature 3: Research Paper Synthesis (v8-v9)

**What It Does**
- RAG system over ML papers
- Automatically links concepts to original research
- Generates "How This Appears in Research" sections

**Architecture**
```
Foundation concept (e.g., "Eigenvalues")
↓
Retrieval (semantic search over 50K papers)
↓
Papers found: PCA (1901), SVD (1960), Attention (2017)
↓
Claude generates: Why each paper needs this concept
↓
Links embedded in module
```

**Credibility Signal**
- "This appears in 47 papers"
- Direct ArXiv/ACL links
- Citation count integration

### 🤝 Feature 4: Multi-Agent Problem Debugging (v9)

**What It Does**
- Student gets stuck on problem
- System spawns 3 Claude agents:
  - **Hint Agent**: Socratic questioning
  - **Visualization Agent**: Generates diagrams
  - **Comparison Agent**: "Here's how experts approach this"

**Example**
```
User: "My gradient descent isn't converging"
↓
Hint Agent: "What does your loss curve look like? High variance?"
↓
User: "Yes, wild swings"
↓
Visualization Agent: Generates loss surface showing oscillation
↓
Comparison Agent: Shows optimal vs user's learning rate
↓
User learns, doesn't just get answer
```

### 📊 Feature 5: Live Collaboration with AI Tutoring (v9-v10)

**What It Does**
- 2-4 students solve problems together
- Shared scratchpad + code editor
- Claude monitors group dynamics
- Suggests interventions: "Person A is quiet — Person B, can you explain your reasoning?"

**Why It Works**
- Teaching others cements understanding
- AI prevents dominant speaker problem
- Collaborative code is closer to real ML work

### 🎓 Feature 6: Credential System with Verification (v10)

**What It Does**
- Student completes Foundation pillar → receives credential
- Credential is **verifiable** (cryptographic proof)
- Employers can query: "Does this person understand Optimization?"

**Implementation**
- Problem-solving proof (last 10 problems shown to verifier)
- Time-gated: Can't verify unless problems solved in real-time
- PDF with embedded metadata (could integrate with Coursera/Credential Engine)

---

## Part 3: System Architecture (NextJS + FastAPI)

### 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT (NextJS)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Dashboard   │  │  Scratchpad  │  │  Code Editor │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│                                                           │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Real-time Collaboration (WebSocket)             │   │
│  └──────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────┘
              │                            │
              ↓ REST/GraphQL               ↓ WebSocket
┌──────────────────────────────────────────────────────────┐
│                  API Gateway (FastAPI)                   │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Auth • Rate Limiting • Request Routing            │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
       │           │            │             │
       ↓           ↓            ↓             ↓
   ┌────────┐ ┌─────────┐ ┌───────────┐ ┌──────────┐
   │  Auth  │ │ Content │ │  AI Agent │ │ Database │
   │Service │ │ Service │ │ Orchestr. │ │          │
   └────────┘ └─────────┘ └───────────┘ └──────────┘
       │           │            │             │
       ↓           ↓            ↓             ↓
   Redis       PostgreSQL   Claude API   PostgreSQL
   (Sessions)  (Curriculum) (Multi)      (User Data)
               Redis (Cache)
```

---

## Part 4: Detailed Tech Stack & Decisions

### Frontend (NextJS)

**Why NextJS?**
- App Router for server components (better for loading math content)
- Built-in API routes for simple endpoints
- Streaming for real-time scratchpad feedback
- Static generation for curriculum pages (fast)

**Key Libraries**
```json
{
  "next": "15.x",
  "react": "19.x",
  "typescript": "5.x",
  "@monaco-editor/react": "latest",  // Code editor
  "mathjs": "latest",                 // Math computation
  "mathjax-react": "latest",          // Math rendering
  "framer-motion": "latest",          // Animations
  "zustand": "latest",                // State management
  "socket.io-client": "latest",       // Real-time collaboration
  "tanstack-query": "latest",         // Server state
  "tailwindcss": "latest",            // Styling
  "recharts": "latest"                // Data viz
}
```

**Architecture Pattern: Server Components**

```typescript
// app/foundation/linear-algebra/page.tsx (Server Component)
export default async function ModulePage({ params }) {
  const module = await db.getModule(params.moduleId);
  const userProgress = await db.getUserProgress(userId, params.moduleId);
  
  // Generate problem if it's first attempt
  const problem = userProgress.problem || 
    await claude.generateProblem(module.context);
  
  return (
    <Suspense fallback={<Skeleton />}>
      <ModuleContent 
        module={module} 
        problem={problem}
        userProgress={userProgress}
      />
    </Suspense>
  );
}
```

**Real-Time Scratchpad (Client Component)**

```typescript
// components/Scratchpad.tsx
'use client'
import { useState, useEffect } from 'react';
import { useSocket } from '@/hooks/useSocket';

export function Scratchpad({ problemId, userId }) {
  const [scratchpad, setScratchpad] = useState('');
  const socket = useSocket();
  
  useEffect(() => {
    // Real-time collaboration
    socket.on(`scratchpad:${problemId}`, (data) => {
      setScratchpad(data.content);
    });
    
    // Auto-compute math
    const computed = math.evaluate(scratchpad);
    socket.emit(`scratchpad:update`, { 
      problemId, 
      content: scratchpad,
      computed 
    });
  }, [scratchpad]);
  
  return (
    <div>
      <textarea 
        value={scratchpad} 
        onChange={(e) => setScratchpad(e.target.value)}
        placeholder="Your work here..."
      />
      <MathPreview content={scratchpad} computed={computed} />
    </div>
  );
}
```

---

### Backend (FastAPI)

**Why FastAPI?**
- Fast (async/await native)
- OpenAPI auto-docs
- Excellent for ML services (numpy/torch integration)
- Simple WebSocket support
- Cloud-ready (scales horizontally)

**Project Structure**

```
backend/
├── app/
│   ├── main.py                 # FastAPI app entry
│   ├── config.py               # Settings
│   ├── requirements.txt
│   ├── api/
│   │   ├── auth.py             # Authentication endpoints
│   │   ├── curriculum.py        # Module/problem endpoints
│   │   ├── user_progress.py     # Learning state
│   │   ├── ai_agent.py          # Claude orchestration
│   │   └── collaboration.py     # WebSocket for real-time
│   ├── services/
│   │   ├── claude_service.py    # Claude API wrapper
│   │   ├── problem_generator.py # Generate problems
│   │   ├── evaluation.py        # Check answers
│   │   ├── adaptive_path.py     # Personalization
│   │   └── rag_service.py       # Paper retrieval
│   ├── models/
│   │   ├── schemas.py           # Pydantic models
│   │   └── db.py                # SQLAlchemy
│   ├── utils/
│   │   ├── decorators.py        # @require_auth, @rate_limit
│   │   └── math_validator.py    # Verify solutions
│   └── workers/
│       ├── celery_worker.py     # Background jobs
│       └── tasks.py             # Async task definitions
├── tests/
└── docker-compose.yml
```

**Key FastAPI Endpoints**

```python
# app/api/ai_agent.py
from fastapi import APIRouter, WebSocket, Depends
from services.claude_service import ClaudeService

router = APIRouter(prefix="/api/ai")

@router.post("/problems/generate")
async def generate_problem(
    module_id: str,
    user_level: str,
    current_user = Depends(get_current_user)
):
    """Generate unique problem using Claude + context awareness"""
    return await ClaudeService.generate_problem(
        module_id=module_id,
        user_level=user_level,
        user_history=current_user.solved_problems
    )

@router.post("/solutions/check")
async def check_solution(
    problem_id: str,
    user_answer: str,
    current_user = Depends(get_current_user)
):
    """Validate answer + generate feedback"""
    is_correct, feedback = await ClaudeService.evaluate_answer(
        problem_id=problem_id,
        user_answer=user_answer
    )
    
    # Update learning state
    await db.record_attempt(current_user.id, problem_id, is_correct)
    
    # Trigger adaptive path recalculation if needed
    if not is_correct:
        await recalculate_learning_path(current_user.id)
    
    return {"correct": is_correct, "feedback": feedback}

@router.websocket("/ws/collaborate/{room_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: str):
    """Real-time collaboration + AI monitoring"""
    await websocket.accept()
    
    async for message in websocket.iter_json():
        # Broadcast to room
        await broadcast_to_room(room_id, message)
        
        # AI monitors if someone quiet
        group_state = await get_group_state(room_id)
        if group_state.needs_intervention():
            intervention = await ClaudeService.generate_intervention(
                group_state=group_state,
                message=message
            )
            await websocket.send_json(intervention)
```

**Claude Service (Multi-Agent Orchestration)**

```python
# app/services/claude_service.py
import anthropic
from typing import AsyncIterator

class ClaudeService:
    def __init__(self):
        self.client = anthropic.AsyncAnthropic(api_key=settings.CLAUDE_API_KEY)
    
    async def generate_problem(self, module_id: str, user_level: str, user_history: list):
        """Generate parameterized problem with variation"""
        
        curriculum_context = await db.get_curriculum(module_id)
        
        prompt = f"""
        Module: {curriculum_context.title}
        User Level: {user_level}
        
        Already solved these concepts:
        {', '.join(user_history[-5:])}
        
        Generate 1 unique problem that:
        1. Tests the core concept
        2. Includes 2 parts: manual calculation + code validation
        3. Is 20-30% harder than user's last solved problem
        4. Avoids exact repetition of previous 5 problems
        
        Return JSON:
        {{
          "title": "...",
          "description": "...",
          "parts": [
            {{"type": "manual", "text": "...", "expected_answer_type": "number"}},
            {{"type": "code", "text": "...", "expected_output": "..."}}
          ],
          "hint": "...",
          "common_mistake": "..."
        }}
        """
        
        response = await self.client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1500,
            messages=[{"role": "user", "content": prompt}]
        )
        
        return json.loads(response.content[0].text)
    
    async def multi_agent_debug(self, problem_id: str, user_stuck: str):
        """Spawn 3 agents to help student"""
        
        problem = await db.get_problem(problem_id)
        user_context = await db.get_user_context(problem_id)
        
        # Agent 1: Socratic Questioning
        hint_prompt = f"""
        Problem: {problem.description}
        User says: "{user_stuck}"
        
        Ask ONE clarifying question (Socratic method).
        Do not give the answer.
        """
        
        # Agent 2: Visualization
        viz_prompt = f"""
        Problem: {problem.description}
        Generate ASCII art or Python code to visualize the concept.
        """
        
        # Agent 3: Comparison
        comparison_prompt = f"""
        Problem: {problem.description}
        User approach: {user_stuck}
        
        Show 2 solutions:
        1. User's approach (where it breaks)
        2. Expert's approach (why it works)
        """
        
        # Parallel execution
        responses = await asyncio.gather(
            self.client.messages.create(model="claude-sonnet-4-20250514", messages=[{"role": "user", "content": hint_prompt}]),
            self.client.messages.create(model="claude-sonnet-4-20250514", messages=[{"role": "user", "content": viz_prompt}]),
            self.client.messages.create(model="claude-sonnet-4-20250514", messages=[{"role": "user", "content": comparison_prompt}])
        )
        
        return {
            "hint": responses[0].content[0].text,
            "visualization": responses[1].content[0].text,
            "comparison": responses[2].content[0].text
        }
```

**Adaptive Learning Path (Bayesian Knowledge Tracing)**

```python
# app/services/adaptive_path.py
from scipy.stats import bernoulli

class AdaptivePathService:
    async def update_knowledge_state(self, user_id: str, problem_id: str, is_correct: bool):
        """Update Bayesian belief about user's knowledge"""
        
        problem = await db.get_problem(problem_id)
        current_belief = await db.get_knowledge_state(user_id, problem.concept)
        
        # Bayesian update
        # P(knowledge | observation) ∝ P(observation | knowledge) * P(knowledge)
        if is_correct:
            # If user correct, increase belief they know it
            new_belief = current_belief * 0.95 + (1 - current_belief) * 0.05
        else:
            # If incorrect, decrease belief
            new_belief = current_belief * 0.10
        
        await db.update_knowledge_state(user_id, problem.concept, new_belief)
        
        # If belief < 0.7, recommend review
        if new_belief < 0.7:
            return await self.recommend_review(user_id, problem.concept)
        
        return {"path": "continue"}
    
    async def generate_optimal_sequence(self, user_id: str):
        """Generate next 5 modules to solve"""
        
        knowledge_state = await db.get_all_knowledge_states(user_id)
        curriculum_graph = await db.get_curriculum_dag()
        
        # Topological sort with knowledge weighting
        optimal_sequence = self.weighted_topological_sort(
            curriculum_graph,
            weights={concept: belief for concept, belief in knowledge_state.items()}
        )
        
        return optimal_sequence[:5]
```

---

### Database Schema (PostgreSQL)

```sql
-- Users & Progress
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    created_at TIMESTAMP,
    last_active TIMESTAMP
);

CREATE TABLE user_progress (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    module_id VARCHAR NOT NULL,
    problem_id VARCHAR NOT NULL,
    answer TEXT,
    is_correct BOOLEAN,
    time_spent_seconds INT,
    attempt_number INT,
    created_at TIMESTAMP,
    INDEX (user_id, module_id)
);

-- Knowledge State (for adaptive learning)
CREATE TABLE knowledge_state (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    concept VARCHAR NOT NULL,
    belief_probability FLOAT,  -- 0 to 1
    last_updated TIMESTAMP,
    UNIQUE (user_id, concept)
);

-- Problems (curriculum)
CREATE TABLE problems (
    id VARCHAR PRIMARY KEY,
    module_id VARCHAR NOT NULL,
    title TEXT,
    description TEXT,
    solution TEXT,
    difficulty_level VARCHAR,
    concept_tags TEXT[],
    created_at TIMESTAMP
);

-- AI-Generated Problems (cache)
CREATE TABLE generated_problems (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    module_id VARCHAR,
    problem_json JSONB,
    generated_at TIMESTAMP,
    INDEX (user_id, module_id)
);

-- Collaboration Sessions
CREATE TABLE collab_sessions (
    id UUID PRIMARY KEY,
    room_id VARCHAR,
    participants UUID[],
    problem_id VARCHAR,
    shared_scratchpad TEXT,
    messages JSONB,
    created_at TIMESTAMP,
    ended_at TIMESTAMP
);

-- Papers (for RAG)
CREATE TABLE papers (
    id VARCHAR PRIMARY KEY,
    title TEXT,
    abstract TEXT,
    arxiv_id VARCHAR,
    authors TEXT[],
    embedding VECTOR(1536),  -- OpenAI embeddings
    concepts TEXT[],
    created_at TIMESTAMP
);

CREATE INDEX ON papers USING ivfflat (embedding vector_cosine_ops);
```

---

### Deployment Architecture

**Docker Compose (Development)**

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: mdsml
      POSTGRES_PASSWORD: dev_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  fastapi:
    build: ./backend
    command: uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
    environment:
      DATABASE_URL: postgresql://user:password@postgres:5432/mdsml
      REDIS_URL: redis://redis:6379
      CLAUDE_API_KEY: ${CLAUDE_API_KEY}
      OPENAI_API_KEY: ${OPENAI_API_KEY}
    ports:
      - "8000:8000"
    depends_on:
      - postgres
      - redis

  nextjs:
    build: ./frontend
    command: npm run dev
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:8000
      NEXT_PUBLIC_WS_URL: ws://localhost:8000
    ports:
      - "3000:3000"
    depends_on:
      - fastapi

  celery_worker:
    build: ./backend
    command: celery -A app.workers.tasks worker --loglevel=info
    environment:
      DATABASE_URL: postgresql://user:password@postgres:5432/mdsml
      CELERY_BROKER_URL: redis://redis:6379
    depends_on:
      - postgres
      - redis
```

**Production (AWS/Vercel/Railway)**

```
Frontend: Vercel (automatic deployments from main)
Backend: Railway or AWS ECS + ALB
Database: AWS RDS PostgreSQL (managed)
Cache: ElastiCache Redis
Storage: S3 (generated problems, papers)
AI API: Claude (native)
```

---

### Caching Strategy

**Redis for:**
- Session management (30 min TTL)
- Generated problems (1 hour TTL, until student solves)
- Knowledge state aggregates (5 min TTL)
- User progress feed (1 min TTL)

**Database for:**
- Permanent curriculum
- All user attempts (for learning analytics)
- Historical knowledge states

**Example: Problem Generation Cache**

```python
async def get_or_generate_problem(user_id, module_id):
    cache_key = f"problem:{user_id}:{module_id}"
    
    # Check Redis first
    cached = await redis.get(cache_key)
    if cached:
        return json.loads(cached)
    
    # Generate new
    problem = await claude.generate_problem(module_id, user_level=...)
    
    # Cache for 1 hour or until solved
    await redis.setex(cache_key, 3600, json.dumps(problem))
    
    return problem
```

---

## Part 5: Development Roadmap

**Month 1-2: Foundation**
- [ ] v1 NextJS UI (Linear Algebra Module 1)
- [ ] FastAPI auth + problem endpoints
- [ ] PostgreSQL + Redis setup
- [ ] Manual → NumPy problem progression

**Month 3-4: Intelligence**
- [ ] Claude integration for problem generation
- [ ] Basic adaptive path (knowledge state tracking)
- [ ] Scratchpad with math computation

**Month 5-6: Collaboration**
- [ ] WebSocket real-time collaboration
- [ ] Multi-user scratchpad
- [ ] AI monitoring of group dynamics

**Month 7-8: Scale**
- [ ] RAG system for paper linking
- [ ] Celery workers for background problem generation
- [ ] Caching layer optimization

**Month 9-10: Polish**
- [ ] Credentials system
- [ ] Analytics dashboard
- [ ] Performance optimization

---

## Part 6: Success Metrics (v10)

| Metric | Target |
|--------|--------|
| Problem Solve Rate | >75% (with hints) |
| Return Rate (7-day) | >40% |
| Avg. Time to Concept Mastery | 45 min (vs. 120 min industry avg) |
| User-to-AI Interaction Ratio | 2:1 (users lead, AI supports) |
| Credential Verification Rate | >80% (of credential holders) |
| Research Paper Citations in Feedback | 5+ per module |

---

## Conclusion

This architecture makes MDSML:

1. **Scalable** (async, caching, CDN)
2. **Intelligent** (multi-agent Claude, adaptive paths)
3. **Collaborative** (real-time WebSocket)
4. **Research-aligned** (RAG, paper synthesis)
5. **Verifiable** (cryptographic credentials)

By v10, you're not just a platform—you're an **intelligent tutoring system that produces researchers and engineers who actually understand ML**.

Start with the v1 MVP (Foundation Linear Algebra). Perfect one module, then the rest scales.

