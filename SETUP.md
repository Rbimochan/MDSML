# MDSML - Math-Driven Machine Learning Education Platform

A thinking-first ML education platform with interactive scratchpad, real-time problem solving, and AI-powered tutoring.

## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL 14+
- Redis 7+
- Docker & Docker Compose (optional)

### Setup with Docker

```bash
# Start all services
docker-compose up

# Backend runs at http://localhost:8000
# Frontend runs at http://localhost:3000
# PostgreSQL at localhost:5432
# Redis at localhost:6379
```

### Manual Setup

#### Backend (FastAPI)

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Setup environment variables
cp ../.env.example .env
# Edit .env and set:
# - JWT_SECRET_KEY (secure random string)
# - CLAUDE_API_KEY (get from https://console.anthropic.com)
# - Database credentials

# Run migrations (auto on startup)
python -m uvicorn app.main:app --reload
```

Backend API: http://localhost:8000
API Docs: http://localhost:8000/docs

#### Frontend (Next.js)

```bash
cd frontend

# Install dependencies
npm install

# Create environment variables
echo 'NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1' > .env.local

# Start dev server
npm run dev
```

Frontend: http://localhost:3000

## 📁 Project Structure

```
/backend
  /app
    /api          - API endpoints (auth, courses, problems, ai)
    /models       - Database models (User, Course, Problem, etc.)
    /schemas      - Pydantic schemas for request/response
    /core         - Security & authentication
  requirements.txt
  
/frontend
  /src
    /app          - Next.js pages and routing
    /components   - React components (organized by feature)
    /lib          - API client, utilities
    /types        - TypeScript types
    /data         - Mock curriculum data (to be replaced by API)
  package.json
```

## 🔑 Key Features

### Learning Platform
- ✅ Course enrollment and progress tracking
- ✅ Problem-solving interface (theory, coding, exercises)
- ✅ Real-time feedback on submissions
- ✅ User progress dashboard

### AI Tutoring
- ✅ Claude-powered AI assistant (Tex)
- ✅ Intelligent hint generation
- ✅ Context-aware help for math concepts

### Problem Submission
- ✅ Code execution and validation
- ✅ Answer grading (theory & exercises)
- ✅ Points and streak tracking

## 🔒 Security Fixes Applied

✅ **JWT Secret** - Moved from Claude API key to dedicated `JWT_SECRET_KEY` env var
✅ **User Model** - Extended with learning state (points, streak, mastery score)
✅ **API Integration** - Full frontend-backend wiring with authentication
✅ **Dead Code** - Removed empty `hooks/` and `store/` folders
✅ **Mock Data** - Replaced with real API calls

## 📊 Database Schema

### Users
```sql
- id (UUID, PK)
- email, full_name, hashed_password
- points, streak_days, mastery_score
- created_at, last_activity
```

### Courses
```sql
- id, title, description, category
- difficulty, points_total, is_published
```

### Problems
```sql
- id, course_id, title, description
- problem_type, difficulty, points
- concept_content, code_template, solution_code
```

### ProblemSubmissions
```sql
- id, user_id, problem_id
- submitted_code, submitted_answer
- is_correct, score, feedback, attempts
```

## 🛠 API Endpoints

### Authentication
- `POST /api/v1/auth/signup` - Register user
- `POST /api/v1/auth/login` - Login and get JWT token
- `GET /api/v1/users/me` - Get current user

### Courses
- `GET /api/v1/courses` - List all published courses
- `GET /api/v1/courses/{id}` - Get course details
- `GET /api/v1/courses/{id}/problems` - Get course problems
- `POST /api/v1/courses/{id}/enroll` - Enroll in course

### Problems & Submissions
- `GET /api/v1/problems/{id}` - Get problem details
- `POST /api/v1/problems/{id}/submit` - Submit solution
- `GET /api/v1/user/progress` - Get user's learning progress

### AI
- `POST /api/v1/ai/chat` - Chat with Claude tutor

## 🧪 Testing

### Backend
```bash
cd backend
pytest tests/
```

### Frontend
```bash
cd frontend
npm run test
```

## 🚀 Deployment

### Backend (Heroku/Railway)
```bash
# Set environment variables
heroku config:set JWT_SECRET_KEY=...
heroku config:set CLAUDE_API_KEY=...

# Deploy
git push heroku main
```

### Frontend (Vercel)
```bash
vercel --prod
```

## 📝 Environment Variables

See `.env.example` for all required variables.

**Critical for Production:**
- `JWT_SECRET_KEY` - Use strong random string (e.g., `openssl rand -hex 32`)
- `CLAUDE_API_KEY` - Get from https://console.anthropic.com
- Change database passwords
- Set `BACKEND_CORS_ORIGINS` to your domain

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -am 'Add feature'`
3. Push: `git push origin feature/your-feature`
4. Open PR

## 📚 Tech Stack

**Backend:** FastAPI, SQLAlchemy, PostgreSQL, Redis, Anthropic Claude API
**Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS, Socket.io (planned)

## 📄 License

MIT - See LICENSE file

---

**Questions?** Check API docs at `/docs` endpoint or open an issue.
