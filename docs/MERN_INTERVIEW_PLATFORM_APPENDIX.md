# Appendix: Implementation Details

## Resume Parser Service (Resume Match Mode)

```javascript
// services/resumeParser.service.js
// Options: pdf-parse, pdfjs-dist, or third-party API (Affinda, Sovren)

async function extractTechnologies(fileBuffer) {
  const text = await pdfParse(fileBuffer);
  const techKeywords = [
    'React', 'Node.js', 'MongoDB', 'Express', 'TypeScript', 'Redis',
    'Docker', 'AWS', 'GraphQL', 'REST', 'PostgreSQL', 'MySQL', ...
  ];
  const found = techKeywords.filter(t => 
    new RegExp(t, 'i').test(text)
  );
  return [...new Set(found)];
}

async function generateQuestionSet(technologies, count = 30) {
  return Question.aggregate([
    { $match: { 
      topic: { $in: technologies }, 
      isActive: true,
      type: 'mcq'
    }},
    { $sample: { size: count } }
  ]);
}

async function computeReadinessScore(attempts, weakTopics) {
  const accuracy = attempts.correct / attempts.total;
  const coverage = 1 - (weakTopics.length / 10); // penalize many weak areas
  return Math.round((accuracy * 0.6 + coverage * 0.4) * 100);
}
```

---

## Secure Code Sandbox

```javascript
// services/sandbox.service.js
// Use: isolated-vm, vm2 (deprecated), or Docker container

const { Worker } = require('worker_threads');

async function runCode(code, testCases, timeoutMs = 5000) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./sandbox-worker.js', {
      workerData: { code, testCases }
    });
    const timer = setTimeout(() => {
      worker.terminate();
      reject(new Error('Execution timeout'));
    }, timeoutMs);
    worker.on('message', (result) => {
      clearTimeout(timer);
      resolve(result);
    });
    worker.on('error', reject);
  });
}

// sandbox-worker.js - runs in isolated context
const { parentPort, workerData } = require('worker_threads');
const vm = require('vm');
try {
  const results = workerData.testCases.map(tc => {
    const fn = vm.runInNewContext(workerData.code + `; solution(${tc.input})`);
    return { passed: fn === tc.expectedOutput };
  });
  parentPort.postMessage({ results });
} catch (e) {
  parentPort.postMessage({ error: e.message });
}
```

**Production**: Use Docker containers or a service like Piston (piston.run) for true isolation.

---

## Rate Limiting Middleware

```javascript
// middleware/rateLimit.middleware.js
const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const redis = require('../config/redis');

const apiLimiter = rateLimit({
  store: new RedisStore({ client: redis }),
  windowMs: 60 * 1000,
  max: 100,
  message: { error: 'Too many requests' }
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many login attempts' }
});
```

---

## JWT Refresh Token Flow

```javascript
// auth.controller.js
exports.refresh = async (req, res) => {
  const { refreshToken } = req.body;
  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  const user = await User.findById(decoded.userId);
  if (!user?.refreshTokens?.some(t => t.token === refreshToken && t.expiresAt > new Date())) {
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
  const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
  res.json({ accessToken });
};
```

---

## Stripe Integration (Monetization)

```javascript
// Subscription checkout
const session = await stripe.checkout.sessions.create({
  customer_email: user.email,
  mode: 'subscription',
  line_items: [{
    price: process.env.STRIPE_PRICE_PREMIUM,
    quantity: 1
  }],
  success_url: `${FRONTEND_URL}/profile?success=1`,
  cancel_url: `${FRONTEND_URL}/pricing`,
  metadata: { userId: user._id.toString() }
});

// Webhook - subscription.updated / invoice.paid
if (event.type === 'invoice.paid') {
  await User.findByIdAndUpdate(metadata.userId, {
    subscriptionTier: 'premium',
    subscriptionEndsAt: new Date(/* from subscription current_period_end */)
  });
}

// One-time mock credits
const paymentIntent = await stripe.paymentIntents.create({
  amount: 200, // $2.00
  currency: 'usd',
  metadata: { userId, credits: 1 }
});
// On success: increment mockInterviewCredits
```

---

## Gamification XP Formula

```javascript
const XP = {
  CORRECT_EASY: 10,
  CORRECT_MEDIUM: 20,
  CORRECT_HARD: 40,
  STREAK_BONUS: 5,    // per day
  DAILY_CHALLENGE: 50,
  ACHIEVEMENT: 100
};

function levelFromXp(xp) {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
}
```

---

## UI Page Breakdown (Component Map)

| Page | Components |
|------|------------|
| Dashboard | StatsGrid, AccuracyChart, WeakTopicsPills, StreakBadge, ReadinessGauge, RecentActivity |
| Practice | FilterSidebar, QuestionList, QuestionCard, Pagination |
| Quiz | QuizHeader, Timer, QuestionNavigator, QuestionPanel, OptionButtons, SubmitModal |
| Coding | MonacoEditor, TestCaseList, RunButton, SubmitButton, ResultsPanel |
| Mock Interview | ChatMessages, InputBox, Timer, EndInterviewModal |
| Analytics | TopicAccuracyChart, DifficultyTrendChart, RecommendationsList |
| Resume Match | FileDropzone, ExtractedTechChips, GeneratedQuizPreview, ReadinessScore |
