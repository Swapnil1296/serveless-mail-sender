# Senior MERN Interview Preparation Platform
## Production-Ready Blueprint v1.0

---

# 1. FOLDER STRUCTURE

## Backend (Node.js + Express)

```
backend/
├── src/
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   ├── redis.js           # Redis connection
│   │   ├── env.js             # Environment validation
│   │   └── constants.js       # App constants
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js       # JWT verify, role check
│   │   ├── validate.middleware.js   # Joi/express-validator
│   │   ├── rateLimit.middleware.js  # Rate limiting
│   │   ├── sanitize.middleware.js   # XSS protection
│   │   ├── errorHandler.middleware.js
│   │   └── logger.middleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Question.js
│   │   ├── Attempt.js
│   │   ├── Bookmark.js
│   │   ├── Note.js
│   │   ├── MockSession.js
│   │   ├── Achievement.js
│   │   ├── Leaderboard.js
│   │   ├── DailyChallenge.js
│   │   └── Subscription.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── question.controller.js
│   │   ├── quiz.controller.js
│   │   ├── attempt.controller.js
│   │   ├── bookmark.controller.js
│   │   ├── analytics.controller.js
│   │   ├── mockInterview.controller.js
│   │   ├── coding.controller.js
│   │   ├── resume.controller.js
│   │   └── admin.controller.js
│   │
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── quiz.service.js           # Adaptive logic, question selection
│   │   ├── analytics.service.js
│   │   ├── sandbox.service.js        # Code execution sandbox
│   │   ├── resumeParser.service.js   # Resume extraction
│   │   ├── aiInterview.service.js    # AI mock interview
│   │   └── gamification.service.js
│   │
│   ├── routes/
│   │   ├── index.js
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── question.routes.js
│   │   ├── quiz.routes.js
│   │   ├── attempt.routes.js
│   │   ├── bookmark.routes.js
│   │   ├── analytics.routes.js
│   │   ├── mockInterview.routes.js
│   │   ├── coding.routes.js
│   │   ├── resume.routes.js
│   │   └── admin.routes.js
│   │
│   ├── utils/
│   │   ├── cache.js            # Redis helpers
│   │   ├── shuffle.js          # Option randomization
│   │   ├── logger.js
│   │   └── errors.js
│   │
│   └── app.js
│
├── tests/
│   ├── unit/
│   └── integration/
│
├── scripts/
│   ├── seed-questions.js
│   └── migrate.js
│
├── Dockerfile
├── docker-compose.yml
├── package.json
└── .env.example
```

## Frontend (Next.js)

```
frontend/
├── app/                          # App Router
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── forgot-password/page.tsx
│   │
│   ├── (dashboard)/
│   │   ├── layout.tsx            # Dashboard layout + sidebar
│   │   ├── page.tsx              # Smart Dashboard
│   │   ├── practice/
│   │   │   ├── page.tsx          # Question browser
│   │   │   └── [id]/page.tsx     # Single question
│   │   ├── quiz/
│   │   │   ├── page.tsx          # Quiz mode selector
│   │   │   └── [sessionId]/page.tsx
│   │   ├── coding/
│   │   │   └── [id]/page.tsx     # Monaco editor
│   │   ├── mock-interview/page.tsx
│   │   ├── analytics/page.tsx
│   │   ├── bookmarks/page.tsx
│   │   ├── resume-match/page.tsx
│   │   └── profile/page.tsx
│   │
│   ├── admin/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── questions/page.tsx
│   │   ├── users/page.tsx
│   │   └── analytics/page.tsx
│   │
│   ├── api/                      # API routes (BFF / proxy if needed)
│   │   └── ...
│   │
│   └── layout.tsx
│
├── components/
│   ├── ui/                       # shadcn/radix primitives
│   ├── dashboard/
│   │   ├── StatsCard.tsx
│   │   ├── WeakTopicsChart.tsx
│   │   ├── StreakBadge.tsx
│   │   └── InterviewReadiness.tsx
│   ├── quiz/
│   │   ├── QuestionCard.tsx
│   │   ├── QuizProgress.tsx
│   │   ├── QuestionNavigator.tsx
│   │   └── Timer.tsx
│   ├── coding/
│   │   ├── MonacoWrapper.tsx
│   │   └── TestResults.tsx
│   ├── mock-interview/
│   │   └── ChatInterface.tsx
│   └── shared/
│       └── ...
│
├── lib/
│   ├── api.ts
│   ├── auth.ts
│   ├── utils.ts
│   └── constants.ts
│
├── hooks/
│   ├── useAuth.ts
│   ├── useQuiz.ts
│   └── useAnalytics.ts
│
├── store/                        # Zustand/Redux
│   └── ...
│
├── styles/
└── public/
```

---

# 2. MONGODB SCHEMA DEFINITIONS

## users

```javascript
{
  _id: ObjectId,
  email: String,           // unique, lowercase
  passwordHash: String,
  name: String,
  avatar: String,          // URL
  role: String,            // 'user' | 'admin'
  
  // Profile
  experienceLevel: String, // '3-5' | '5-8' | '8+'
  preferredStack: [String], // ['mern', 'react', 'node', ...]
  targetCompanies: [String],
  
  // Gamification
  xp: Number,              // default 0
  level: Number,           // default 1
  streak: Number,          // days
  streakLastDate: Date,
  
  // Subscription
  subscriptionTier: String, // 'free' | 'premium'
  subscriptionEndsAt: Date,
  mockInterviewCredits: Number, // default 0
  
  // Stats (denormalized for quick access)
  totalAttempts: Number,
  totalCorrect: Number,
  accuracy: Number,
  
  emailVerified: Boolean,
  refreshTokens: [{ token: String, expiresAt: Date }],
  
  createdAt: Date,
  updatedAt: Date
}

// Indexes
{ email: 1 } unique
{ role: 1 }
{ xp: -1 }  // leaderboard
{ subscriptionTier: 1 }
```

## questions

```javascript
{
  _id: ObjectId,
  topic: String,           // 'react' | 'node' | 'mongo' | 'express' | 'dsa' | 'system-design' | 'javascript'
  subtopic: String,        // 'hooks' | 'streams' | 'indexing' | ...
  difficulty: String,      // 'easy' | 'medium' | 'hard'
  type: String,            // 'mcq' | 'coding' | 'scenario' | 'debugging'
  
  question: String,
  
  // MCQ / Scenario
  options: [{
    id: String,            // uuid, not index-based
    text: String
  }],
  correctOptionId: String, // references options[].id
  
  // Coding
  starterCode: String,
  solutionCode: String,
  testCases: [{
    input: String,
    expectedOutput: String,
    isHidden: Boolean
  }],
  timeComplexityHint: String,
  
  explanation: String,
  whyWrong: { [optionId]: String },
  interviewTip: String,
  followUpQuestionId: ObjectId,  // ref Question
  
  companyTags: [String],
  experienceLevel: String,
  
  isActive: Boolean,
  createdBy: ObjectId,
  createdAt: Date,
  updatedAt: Date
}

// Indexes
{ topic: 1, difficulty: 1, type: 1 }
{ topic: 1, subtopic: 1 }
{ companyTags: 1 }
{ type: 1 }
{ isActive: 1 }
{ createdAt: -1 }
// Compound for quiz generation
{ topic: 1, difficulty: 1, type: 1, isActive: 1 }
```

## attempts

```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  questionId: ObjectId,
  
  selectedOptionId: String,   // for MCQ
  codeSubmission: String,     // for coding
  isCorrect: Boolean,
  timeSpentMs: Number,
  
  quizSessionId: ObjectId,    // optional, links to quiz session
  attemptMode: String,        // 'practice' | 'quiz' | 'mock' | 'daily'
  
  createdAt: Date
}

// Indexes
{ userId: 1, questionId: 1 }
{ userId: 1, createdAt: -1 }
{ quizSessionId: 1 }
{ userId: 1, isCorrect: 1 }  // for wrong-questions retry
```

## quiz_sessions

```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  mode: String,           // 'random_10' | 'random_25' | 'timed' | 'adaptive' | 'wrong_retry' | 'daily' | 'full_mock'
  
  questionIds: [ObjectId],
  answers: [{ questionId: ObjectId, selectedOptionId: String, timeSpentMs: Number }],
  
  totalQuestions: Number,
  correctCount: Number,
  timeLimitMs: Number,
  timeSpentMs: Number,
  completedAt: Date,
  
  metadata: {
    topic: String,
    difficulty: String
  },
  
  createdAt: Date
}

// Indexes
{ userId: 1, createdAt: -1 }
{ userId: 1, mode: 1 }
```

## bookmarks

```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  questionId: ObjectId,
  collectionName: String,  // optional, user-defined
  createdAt: Date
}

// Indexes
{ userId: 1, questionId: 1 } unique
{ userId: 1 }
```

## notes

```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  questionId: ObjectId,
  content: String,
  createdAt: Date,
  updatedAt: Date
}

// Indexes
{ userId: 1, questionId: 1 }
```

## mock_sessions

```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  mode: String,           // 'technical' | 'behavioral'
  
  messages: [{
    role: String,         // 'user' | 'assistant'
    content: String,
    questionId: ObjectId, // if assistant asked a question
    timestamp: Date
  }],
  
  questionsAsked: [ObjectId],
  confidenceScores: [Number],
  feedbackSummary: String,
  totalDurationMs: Number,
  completedAt: Date,
  
  aiModel: String,
  
  createdAt: Date
}

// Indexes
{ userId: 1, createdAt: -1 }
```

## achievements

```javascript
{
  _id: ObjectId,
  code: String,           // 'first_10' | 'week_streak' | 'react_master'
  name: String,
  description: String,
  icon: String,
  xpReward: Number,
  condition: Object       // for programmatic unlock
}

// User achievements (junction)
user_achievements: {
  userId: ObjectId,
  achievementId: ObjectId,
  unlockedAt: Date
}
```

## leaderboard

```javascript
// Materialized / cached collection, refreshed periodically
{
  _id: ObjectId,
  period: String,         // 'daily' | 'weekly' | 'alltime'
  periodStart: Date,
  rankings: [{
    userId: ObjectId,
    userName: String,
    xp: Number,
    rank: Number
  }],
  updatedAt: Date
}
```

## daily_challenges

```javascript
{
  _id: ObjectId,
  date: Date,             // unique per day
  questionIds: [ObjectId],
  xpReward: Number,
  createdAt: Date
}

// User completion
daily_challenge_completions: {
  userId: ObjectId,
  challengeDate: Date,
  completedAt: Date,
  xpEarned: Number
}
```

## resume_analyses

```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  fileUrl: String,
  extractedTech: [String],
  generatedQuestionIds: [ObjectId],
  readinessScore: Number,
  weakAreas: [String],
  createdAt: Date
}
```

---

# 3. API ROUTE STRUCTURE

## Auth
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh
POST   /api/auth/logout
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
GET    /api/auth/me
```

## User
```
GET    /api/users/me
PATCH  /api/users/me
POST   /api/users/me/avatar
GET    /api/users/me/stats
```

## Questions
```
GET    /api/questions              ?topic=&difficulty=&type=&page=&limit=
GET    /api/questions/:id
GET    /api/questions/filters      # return available filters
```

## Quiz
```
POST   /api/quiz/start             # body: { mode, topic?, count? }
GET    /api/quiz/sessions/:id
POST   /api/quiz/sessions/:id/answer
POST   /api/quiz/sessions/:id/submit
GET    /api/quiz/daily-challenge
```

## Coding
```
POST   /api/coding/run             # body: { code, questionId }
POST   /api/coding/submit          # body: { code, questionId, sessionId? }
```

## Attempts
```
GET    /api/attempts               ?userId=&page=
GET    /api/attempts/wrong         # wrong questions for retry
```

## Bookmarks & Notes
```
GET    /api/bookmarks
POST   /api/bookmarks
DELETE /api/bookmarks/:questionId
GET    /api/notes/:questionId
PUT    /api/notes/:questionId
```

## Analytics
```
GET    /api/analytics/dashboard
GET    /api/analytics/topic-wise
GET    /api/analytics/trend
GET    /api/analytics/recommendations
```

## Mock Interview
```
POST   /api/mock-interview/start
POST   /api/mock-interview/:id/message
POST   /api/mock-interview/:id/end
GET    /api/mock-interview/:id
```

## Resume
```
POST   /api/resume/upload
GET    /api/resume/analyses/:id
POST   /api/resume/generate-quiz   # from analysis
```

## Gamification
```
GET    /api/leaderboard            ?period=weekly
GET    /api/achievements
GET    /api/daily-challenge
```

## Admin
```
GET    /api/admin/questions        ?page=&limit=
POST   /api/admin/questions
POST   /api/admin/questions/bulk
PATCH  /api/admin/questions/:id
DELETE /api/admin/questions/:id
GET    /api/admin/users
PATCH  /api/admin/users/:id
GET    /api/admin/analytics
```

---

# 4. SAMPLE CONTROLLER IMPLEMENTATIONS

## auth.middleware.js

```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '') 
      || req.cookies.accessToken;
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-passwordHash');
    if (!user) return res.status(401).json({ error: 'User not found' });

    req.user = user;
    next();
  } catch (e) {
    if (e.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired', code: 'TOKEN_EXPIRED' });
    }
    res.status(401).json({ error: 'Invalid token' });
  }
};

const requireRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
};

module.exports = { auth, requireRole };
```

## quiz.controller.js (start quiz)

```javascript
const QuizService = require('../services/quiz.service');
const { cacheGet, cacheSet } = require('../utils/cache');

exports.startQuiz = async (req, res) => {
  try {
    const { mode, topic, difficulty, count = 25 } = req.body;
    const userId = req.user._id;

    const cacheKey = `quiz:${userId}:${mode}:${topic || 'all'}`;
    const cached = await cacheGet(cacheKey);
    if (cached) return res.json(cached);

    const session = await QuizService.createSession({
      userId,
      mode,
      topic,
      difficulty,
      count,
      adaptiveContext: await QuizService.getAdaptiveContext(userId)
    });

    await cacheSet(cacheKey, session, 300); // 5 min
    res.json(session);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
```

## question.controller.js (list with filters)

```javascript
const Question = require('../models/Question');

exports.list = async (req, res) => {
  const { topic, difficulty, type, subtopic, company, page = 1, limit = 20 } = req.query;
  const filter = { isActive: true };
  if (topic) filter.topic = topic;
  if (difficulty) filter.difficulty = difficulty;
  if (type) filter.type = type;
  if (subtopic) filter.subtopic = subtopic;
  if (company) filter.companyTags = company;

  const [questions, total] = await Promise.all([
    Question.find(filter)
      .select('topic subtopic difficulty type question options correctOptionId')
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean(),
    Question.countDocuments(filter)
  ]);

  res.json({ questions, total, page: Number(page), pages: Math.ceil(total / limit) });
};
```

---

# 5. ADAPTIVE DIFFICULTY ALGORITHM

```javascript
// services/quiz.service.js - Adaptive logic

function getNextDifficulty(userAccuracy, currentDifficulty, consecutiveCorrect) {
  const ACCURACY_THRESHOLD_UP = 0.7;   // Move up if > 70%
  const ACCURACY_THRESHOLD_DOWN = 0.4; // Move down if < 40%
  const CONSECUTIVE_TO_UP = 3;         // 3 correct in a row → harder

  const order = ['easy', 'medium', 'hard'];
  const idx = order.indexOf(currentDifficulty);

  if (userAccuracy >= ACCURACY_THRESHOLD_UP && consecutiveCorrect >= CONSECUTIVE_TO_UP) {
    return order[Math.min(idx + 1, 2)]; // Go harder
  }
  if (userAccuracy < ACCURACY_THRESHOLD_DOWN) {
    return order[Math.max(idx - 1, 0)]; // Go easier
  }
  return currentDifficulty;
}

async function getAdaptiveContext(userId) {
  const recent = await Attempt.aggregate([
    { $match: { userId: new ObjectId(userId) } },
    { $sort: { createdAt: -1 } },
    { $limit: 50 },
    { $lookup: { from: 'questions', localField: 'questionId', foreignField: '_id', as: 'q' } },
    { $unwind: '$q' },
    {
      $group: {
        _id: '$q.difficulty',
        total: { $sum: 1 },
        correct: { $sum: { $cond: ['$isCorrect', 1, 0] } }
      }
    }
  ]);

  const byDiff = Object.fromEntries(recent.map(r => [r._id, r.correct / r.total]));
  const overallAccuracy = recent.reduce((s, r) => s + r.correct, 0) / recent.reduce((s, r) => s + r.total, 0);
  const lastConsecutive = await getConsecutiveCorrect(userId);

  return {
    byDifficulty: byDiff,
    overallAccuracy,
    consecutiveCorrect: lastConsecutive,
    suggestedDifficulty: inferSuggestedDifficulty(byDiff, overallAccuracy)
  };
}

function selectAdaptiveQuestions(questions, context, count) {
  let difficulty = context.suggestedDifficulty || 'medium';
  const selected = [];
  let consecutiveCorrect = 0;

  for (let i = 0; i < count; i++) {
    const pool = questions.filter(q => q.difficulty === difficulty);
    const q = pool[Math.floor(Math.random() * pool.length)];
    if (q) {
      selected.push(q);
      difficulty = getNextDifficulty(
        context.overallAccuracy,
        difficulty,
        consecutiveCorrect
      );
    }
  }
  return selected;
}
```

---

# 6. REDIS CACHING STRATEGY

| Key Pattern | TTL | Use Case |
|-------------|-----|----------|
| `user:{id}` | 1h | User profile + stats |
| `quiz:session:{id}` | 30m | Active quiz session |
| `questions:list:{hash(filters)}` | 5m | Paginated question list |
| `leaderboard:{period}` | 1h | Leaderboard snapshot |
| `daily:challenge:{date}` | 24h | Daily challenge Q IDs |
| `analytics:user:{id}:dashboard` | 10m | Dashboard stats |
| `rate:{ip}:login` | 15m | Login rate limit |
| `rate:{userId}:api` | 1m | API rate limit |

```javascript
// utils/cache.js
const redis = require('../config/redis');

async function cacheGet(key) {
  const val = await redis.get(key);
  return val ? JSON.parse(val) : null;
}

async function cacheSet(key, value, ttlSeconds = 3600) {
  await redis.setex(key, ttlSeconds, JSON.stringify(value));
}

async function cacheInvalidate(pattern) {
  const keys = await redis.keys(pattern);
  if (keys.length) await redis.del(...keys);
}
```

---

# 7. FRONTEND ARCHITECTURE OVERVIEW

- **Framework**: Next.js 14 (App Router)
- **State**: Zustand (auth, quiz session, UI) + React Query (server state)
- **Styling**: Tailwind + shadcn/ui (dark default)
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts / Tremor
- **Code Editor**: Monaco Editor (@monaco-editor/react)
- **Real-time**: Optional Socket.io for mock interview streaming

## Key Pages
- `/` – Landing + auth
- `/dashboard` – Smart dashboard
- `/practice` – Question browser with filters
- `/quiz/[sessionId]` – Quiz UI
- `/coding/[id]` – Monaco coding
- `/mock-interview` – Chat-based AI mock
- `/analytics` – Performance charts
- `/resume-match` – Upload + analysis
- `/admin/*` – Admin CRUD

---

# 8. ADMIN PANEL DESIGN

- **Sidebar**: Questions | Users | Analytics | Bulk Upload
- **Questions**: Table with filters, inline edit, bulk select, JSON upload
- **Bulk Upload**: JSON schema validation, preview, import
- **Users**: List, role toggle, subscription management
- **Analytics**: Platform-wide stats, question usage, retention

---

# 9. DEPLOYMENT (Docker-Ready)

```yaml
# docker-compose.yml
version: '3.8'
services:
  api:
    build: ./backend
    ports: ["4000:4000"]
    env_file: .env
    depends_on: [mongo, redis]
  frontend:
    build: ./frontend
    ports: ["3000:3000"]
    depends_on: [api]
  mongo:
    image: mongo:7
    volumes: [mongo_data:/data/db]
  redis:
    image: redis:7-alpine
volumes:
  mongo_data:
```

---

# 10. SCALING STRATEGY

- **API**: Horizontal scaling behind load balancer
- **MongoDB**: Replica set, read preference secondary for analytics
- **Redis**: Cluster for caching + rate limiting
- **Code Sandbox**: Isolated containers (Docker), queue (Bull)
- **AI Mock**: Queue for OpenAI calls, streaming responses

---

# 11. MONETIZATION ARCHITECTURE

| Tier | Features |
|------|----------|
| **Free** | 50 Q/day, basic analytics, 1 mock/month |
| **Premium ($19/mo)** | Unlimited, adaptive mode, full analytics, 10 mocks |
| **Mock Credits** | $2/credit, 1 mock = 1 credit |

- Stripe: `subscription` + `one-time` for credits
- Webhook: Update `subscriptionTier`, `mockInterviewCredits`

---

# 12. FUTURE ROADMAP

1. **Phase 1 (MVP)**: Auth, questions, basic quiz, dashboard
2. **Phase 2**: Adaptive quiz, coding env, bookmarks
3. **Phase 3**: Mock interview AI, resume match
4. **Phase 4**: Mobile app, video mock, company-specific packs
5. **Phase 5**: Collaborative mock interviews, hiring integrations
