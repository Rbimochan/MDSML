# Deployment Checklist

## Pre-Deployment

### Backend Setup
- [ ] Install dependencies: `pip install -r requirements.txt`
- [ ] Create `.env` file from `.env.example`
- [ ] Set `JWT_SECRET_KEY` to secure random string
- [ ] Set `CLAUDE_API_KEY` (get from https://console.anthropic.com)
- [ ] Configure PostgreSQL credentials
- [ ] Run database migrations (auto on startup)
- [ ] Test API: `python -m uvicorn app.main:app --reload`
- [ ] Verify endpoints at http://localhost:8000/docs

### Frontend Setup
- [ ] Install dependencies: `npm install`
- [ ] Create `.env.local` with `NEXT_PUBLIC_API_URL`
- [ ] Build: `npm run build`
- [ ] Test build: `npm run start`

### Integration Tests
- [ ] Test signup flow (Frontend → Backend)
- [ ] Test login and JWT token storage
- [ ] Test dashboard data loading
- [ ] Test problem submission and grading
- [ ] Test AI chat with Claude API
- [ ] Test error handling (invalid token, server down, etc.)

---

## Docker Deployment

### Using Docker Compose (Recommended for local)
```bash
docker-compose up
```

Services:
- Backend: http://localhost:8000
- Frontend: http://localhost:3000
- PostgreSQL: localhost:5432
- Redis: localhost:6379

---

## Cloud Deployment

### Option 1: Heroku (Backend)

```bash
# Install Heroku CLI
brew install heroku

# Login
heroku login

# Create app
heroku create mdsml-backend

# Set environment variables
heroku config:set JWT_SECRET_KEY=$(openssl rand -hex 32)
heroku config:set CLAUDE_API_KEY=sk-ant-...
heroku config:set POSTGRES_SERVER=your-db-host
heroku config:set POSTGRES_USER=postgres
heroku config:set POSTGRES_PASSWORD=your-secure-password

# Add PostgreSQL add-on
heroku addons:create heroku-postgresql:standard-0

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

Backend runs at: https://mdsml-backend.herokuapp.com

### Option 2: Railway (Backend)

```bash
npm install -g railway

railway login
railway link

railway variables set JWT_SECRET_KEY=$(openssl rand -hex 32)
railway variables set CLAUDE_API_KEY=sk-ant-...

git push

railway logs
```

### Option 3: Vercel (Frontend)

```bash
npm install -g vercel

vercel login
vercel --prod

# Add environment variable
vercel env add NEXT_PUBLIC_API_URL https://mdsml-backend.herokuapp.com/api/v1
```

Frontend runs at: https://mdsml.vercel.app

---

## Database Migration to Production

### Backup existing data
```bash
pg_dump -U postgres mdsml > backup.sql
```

### Initialize production database
```bash
# Connect to production database
POSTGRES_PASSWORD=your-password psql -h production-host -U postgres -d mdsml

# Tables auto-created on first API startup via SQLAlchemy
# No manual migrations needed
```

---

## Environment Variables Checklist

### Backend (.env)
```
✓ JWT_SECRET_KEY=<32-char-hex-string>
✓ CLAUDE_API_KEY=sk-ant-...
✓ POSTGRES_SERVER=<host>
✓ POSTGRES_USER=postgres
✓ POSTGRES_PASSWORD=<secure>
✓ POSTGRES_DB=mdsml
✓ POSTGRES_PORT=5432
✓ REDIS_HOST=<host>
✓ REDIS_PORT=6379
✓ BACKEND_CORS_ORIGINS=["http://localhost:3000"]
```

### Frontend (.env.local)
```
✓ NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

---

## Security Audit

### HTTPS & Certificates
- [ ] Enable HTTPS on backend
- [ ] Use Let's Encrypt (free SSL)
- [ ] Frontend over HTTPS only

### Database
- [ ] Use strong passwords
- [ ] Enable SSL for database connections
- [ ] Restrict database IP access
- [ ] Regular backups (daily minimum)

### API
- [ ] Rate limiting enabled (1000 req/min per IP)
- [ ] CORS restricted to known origins
- [ ] Input validation on all endpoints
- [ ] JWT tokens set short expiry (30 min)
- [ ] Refresh token rotation enabled

### Secrets
- [ ] Never commit .env files
- [ ] Use environment variable providers (Heroku, Railway, Vercel)
- [ ] Rotate JWT_SECRET_KEY monthly
- [ ] Rotate database passwords quarterly

### Monitoring
- [ ] Error logging enabled (Sentry/LogRocket)
- [ ] API performance monitoring (New Relic)
- [ ] Database query monitoring
- [ ] Failed login attempt tracking

---

## Performance Optimization

### Backend
- [ ] Enable Redis caching for courses
- [ ] Add database indexing on frequently queried columns
- [ ] Implement API rate limiting
- [ ] Use connection pooling (asyncpg)
- [ ] Enable query result compression

### Frontend
- [ ] Enable Next.js static export for landing pages
- [ ] Image optimization via Next.js
- [ ] Enable gzip compression
- [ ] Implement code splitting
- [ ] CDN for static assets

### Database
- [ ] Add indexes to: courses, problems, user.email
- [ ] Archive old problem submissions monthly
- [ ] Vacuum & analyze tables regularly

---

## Post-Deployment

### Monitoring
- [ ] Check API health: `GET /health`
- [ ] Monitor error logs (Sentry/LogRocket)
- [ ] Track database performance
- [ ] Monitor API latency (p99 < 200ms)

### Testing
- [ ] Run smoke tests (signup → submit problem)
- [ ] Load test with k6 or Apache Bench
- [ ] Security scan with OWASP ZAP
- [ ] Penetration test (at least annually)

### Maintenance
- [ ] Set up automated backups
- [ ] Enable auto-scaling for traffic spikes
- [ ] Update dependencies monthly
- [ ] Rotate logs (keep 30 days)
- [ ] Monitor storage (databases grow 50-100GB/year)

---

## Rollback Plan

If critical issues occur:

### Quick Rollback
```bash
# Heroku
git revert HEAD
git push heroku main

# Railway
git revert HEAD
git push

# Vercel
vercel rollback
```

### Data Rollback
```bash
# Restore from backup
pg_restore -U postgres -d mdsml backup.sql
```

---

## Monitoring & Alerts

### Recommended Services
- **Error Tracking:** Sentry ($20/mo)
- **Uptime Monitoring:** Uptime Robot (free)
- **Analytics:** Mixpanel/Amplitude (free tier)
- **Performance:** New Relic (free tier)

### Key Metrics to Monitor
- API response time (target: <200ms p99)
- Error rate (target: <0.1%)
- Database query time (target: <100ms p99)
- Uptime (target: 99.9%)
- User signup → first problem (target: <5min)

---

## Go-Live Announcement

### Day Before
- [ ] Final full system test
- [ ] Notify team of deployment time
- [ ] Prepare rollback plan
- [ ] Brief support team on new features

### Launch Day
- [ ] Deploy during off-peak hours
- [ ] Monitor logs actively for 1 hour
- [ ] Have database backup ready
- [ ] Communication channel open with team

### Post-Launch
- [ ] Track critical metrics for 24 hours
- [ ] Monitor user feedback/support tickets
- [ ] Performance analysis
- [ ] Document any issues for next iteration

---

## Support Contacts

- **Database Issues:** PostgreSQL team
- **AI API Issues:** Anthropic support (support@anthropic.com)
- **Frontend Issues:** Vercel support
- **Backend Issues:** Railway/Heroku support

---

**Last Updated:** January 2026
**Status:** ✅ Ready for deployment

