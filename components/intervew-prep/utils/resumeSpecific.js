export const resumeSpecific = [
    {
        "id": ":r0:01",
        "topic": "resume",
        "question": "Walk us through how you reduced API response times by 40%",
        "answer": "Example from Alkem Marketplace:  \r\n\"In the Alkem Marketplace project, we noticed API latency during peak traffic (e.g., 10k+ users during flash sales). Using PostgreSQL’s `EXPLAIN ANALYZE`, I identified slow queries on the product listing endpoint. For instance, a query fetching products by category took 800ms due to full-table scans.  \r\nSteps Taken:  \r\n1. Indexing: Added a B-tree index on the `category_id` column, reducing query time to 200ms.  \r\n2. Caching: Implemented Redis to cache frequently accessed product data (TTL: 15 minutes), cutting redundant database hits.  \r\n3. Middleware Optimization: Removed unnecessary Express.js middleware from the request-response cycle.  \r\nResult: API response time dropped from 1.2s to 700ms (40% improvement). Monitoring was done via New Relic and Postman.\"  \r\n\r",
        "tags": [
            "Technical & Role-Specific Questions"
        ],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": ""
    },
    {
        "id": ":r0:11",
        "topic": "resume",
        "question": "How did you integrate RESTful APIs into Alkem Marketplace?",
        "answer": "Example:  \r\n\"For the product checkout feature:  \r\n- Frontend (Next.js): Built a dynamic UI with React components. Used Axios interceptors to:  \r\n  - Attach JWT tokens to headers for authentication.  \r\n  - Handle 401 errors by redirecting users to login.  \r\n- Backend (Node.js/Express.js): Designed a RESTful API with endpoints like:  \r\n  - `POST /api/orders`: Created orders in PostgreSQL, returning a 201 status code.  \r\n  - `GET /api/orders/:id`: Fetched order details with eager loading using `JOIN` queries.  \r\n- Integration: Tested connectivity using Swagger UI and ensured consistent error formats (e.g., `{ error: \"Invalid product ID\" }`). This reduced frontend-backend mismatch bugs by 30%.\"  \r\n\r",
        "tags": [
            "Technical & Role-Specific Questions"
        ],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": ""
    },
    {
        "id": ":r0:21",
        "topic": "resume",
        "question": "When would you choose PostgreSQL over MongoDB?",
        "answer": "Example from SBI Insurance:  \r\n\"In the SBI project, we needed ACID compliance for policy transactions. PostgreSQL was ideal because:  \r\n- Relational Structure: Policies had strict schemas (e.g., `policy_number`, `premium_amount`, `user_id`).  \r\n- Transactions: Used `BEGIN`, `COMMIT`, and `ROLLBACK` to handle premium payments atomically.  \r\nContrast with Alkem Marketplace:  \r\n\"Alkem’s user activity logs used MongoDB because:  \r\n- Flexibility: Logs had varying fields (e.g., `click_event`, `search_query`).  \r\n- Scalability: Handled 50k+ logs/day with sharding.\"",
        "tags": [
            "Technical & Role-Specific Questions"
        ],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": ""
    },
    {
        "id": ":r0:31",
        "topic": "resume",
        "question": "How did you implement JWT authentication?",
        "answer": "Example from SBI Insurance:  \r\n\"1. Token Generation: Used `jsonwebtoken` to create tokens with a `user_id` payload and a secret key.  \r\n2. Storage: Tokens stored in HTTP-only cookies to prevent XSS attacks.  \r\n3. Middleware: Created an `authMiddleware.js` file to validate tokens on protected routes:  \r\n```javascript\r\nconst authMiddleware = (req, res, next) => {\r\n  const token = req.cookies.token;\r\n  if (!token) return res.status(401).json({ error: \"Unauthorized\" });\r\n  jwt.verify(token, process.env.SECRET, (err, user) => {\r\n    if (err) return res.status(403).json({ error: \"Invalid token\" });\r\n    req.user = user;\r\n    next();\r\n  });\r\n};\r\n```  ",
        "tags": [
            "Security & Best Practices"
        ],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": ""
    },
    {
        "id": ":r0:41",
        "topic": "resume",
        "question": "Rate Limiting",
        "answer": "Used `express-rate-limit` to cap login attempts to 5/minute.",
        "tags": [
            "Security & Best Practices"
        ],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": ""
    },
    {
        "id": ":r0:51",
        "topic": "resume",
        "question": "What feature did you own end-to-end?",
        "answer": "Example: Alkem Marketplace’s Search Feature  \r\n- Task: Users couldn’t filter products by price range.  \r\n- Frontend: Built a React component with sliders using `react-range`.  \r\n- Backend: Modified the `/api/products` endpoint to accept `minPrice` and `maxPrice` query params.  \r\n- PostgreSQL Optimization: Used `BETWEEN` with indexed `price` column.  \r\n- Result: Search conversion rates increased by 25%.\"  \r\n\r",
        "tags": [
            "Project & Experience Deep Dives"
        ],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": ""
    },
    {
        "id": ":r0:61",
        "topic": "resume",
        "question": "Describe a complex bug you resolved.",
        "answer": "Example: Disappearing Cart Items in Alkem Marketplace  \r\n- Situation: Users reported items vanishing after adding to cart.  \r\n- Debugging:  \r\n  - Checked Redux DevTools and noticed state resets during API calls.  \r\n  - Identified a race condition where the cart was cleared before the API response.  \r\n- Fix: Refactored the code to use Redux Toolkit’s `createAsyncThunk`:  \r\n```javascript\r\nconst addToCart = createAsyncThunk(\"cart/add\", async (productId) => {\r\n  const response = await axios.post(`/api/cart`, { productId });\r\n  return response.data; // Dispatched to Redux store only after success\r\n});\r\n```  \r\n- Result: Bug resolved in 2 days, reducing cart abandonment by 15%.\"  \r\n\r",
        "tags": [
            "Behavioral & Situational Questions"
        ],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": ""
    },
    {
        "id": ":r0:71",
        "topic": "resume",
        "question": "How do you handle merge conflicts?",
        "answer": "Example from SBI Insurance:  \r\n\"During a feature branch merge, a conflict arose in `package-lock.json`. Steps taken:  \r\n1. Ran `git fetch origin` to sync with the latest `main` branch.  \r\n2. Used `git rebase origin/main` to replay my commits on top of the updated `main`.  \r\n3. Resolved conflicts in `package-lock.json` by accepting both changes (ensuring dependencies weren’t lost).  \r\n4. Ran `npm install` to regenerate the file and committed with `git rebase --continue`.\"  \r\n\r",
        "tags": [
            "Tool & Workflow Questions"
        ],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": ""
    },
    {
        "id": ":r0:81",
        "topic": "resume",
        "question": "How would you design Scalable E-Commerce Backend?",
        "answer": "Example Inspired by Alkem Marketplace:  \r\n- Tech Stack:  \r\n  - APIs: Node.js/Express.js with RESTful endpoints.  \r\n  - Database: PostgreSQL for transactions, MongoDB for logs.  \r\n  - Caching: Redis for product listings (TTL: 10 mins).  \r\n  - Cloud: AWS EC2 for servers, S3 for product images.  \r\n- Scalability:  \r\n  - Horizontal Scaling: Used PM2 cluster mode to leverage multi-core CPUs.  \r\n  - Load Testing: Simulated 10k users with JMeter to identify bottlenecks.\"  \r\n\r",
        "tags": [
            "Scenario-Based Questions"
        ],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": ""
    },
    {
        "id": ":r0:91",
        "topic": "resume",
        "question": "Describe your ideal team environment.",
        "answer": "Example from Indus Net:  \r\n\"At Indus Net, we used daily standups to align tasks. For the Connect2Clinic project:  \r\n- Pair Programming: Collaborated with a backend dev to integrate appointment booking APIs.  \r\n- Feedback Loop: Conducted biweekly retrospectives using JIRA to improve sprint velocity by 20%.\"  \r\n\r",
        "tags": [
            "Culture & Fit"
        ],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": ""
    }
]