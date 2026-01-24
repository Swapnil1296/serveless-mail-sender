# Authentication System Guide

## Overview
The app now has a complete authentication system with a portfolio landing page and protected project routes.

## Architecture

### Public Pages
- **Landing Page** (`/`): Portfolio landing page - accessible to everyone
  - Shows portfolio information
  - Has a login button in the top-right corner

### Protected Pages
All project pages require authentication:
- **Email Sender** (`/projects/email-sender`): Bulk email automation
- **Email Logs** (`/projects/email-logs`): View and manage email logs

## Login Credentials

**Username:** `admin`  
**Password:** `admin123`

## How It Works

### 1. Landing Page
- Users land on the portfolio page at `/`
- If not logged in: Shows "Admin Login" button
- If logged in: Shows "Projects" button
- Authentication state persists (token valid for 30 days)

### 2. Authentication Flow
- Click "Admin Login" button (if not authenticated)
- Enter username and password
- System validates credentials against backend
- JWT token is generated (valid for 30 days) and stored in localStorage
- Dashboard modal appears showing available projects
- Button changes to "Projects" for future visits

### 3. Returning Users
- If you have a valid token (within 30 days), you stay logged in
- Landing page shows "Projects" button instead of "Admin Login"
- Click "Projects" to open dashboard directly
- No need to login again until token expires

### 3. Dashboard Modal
- Shows all available projects as cards
- Click any project card to navigate to that project
- Navigation bar appears at the top with project links

### 4. Protected Routes
- All `/projects/*` routes are protected
- If not authenticated, users are redirected to landing page
- Authentication state persists across page refreshes

### 5. Logout
- Click the "Logout" button in the navigation bar
- Clears authentication token
- Redirects to landing page

## Technical Details

### Files Structure
```
lib/
  auth.ts                    # Authentication logic, JWT, password hashing
  
contexts/
  AuthContext.tsx            # React context for auth state management
  
components/
  PortfolioLanding.tsx       # Public landing page
  LoginModal.tsx             # Login form modal
  DashboardModal.tsx         # Project selection dashboard
  ProtectedRoute.tsx         # HOC for protecting routes
  
pages/
  index.tsx                  # Landing page route
  _app.tsx                   # App wrapper with AuthProvider
  api/auth/
    login.ts                 # Login API endpoint
    me.ts                    # Get current user endpoint
    hash-password.ts         # Utility to generate password hashes
  projects/
    email-sender.tsx         # Protected email sender page
    email-logs.tsx           # Protected email logs page
```

### Environment Variables
```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-2024
```

### Security Features
- Passwords are hashed using bcrypt (10 rounds)
- JWT tokens expire after 30 days (1 month)
- Tokens stored in localStorage (client-side)
- Protected API routes check for valid tokens
- Password hash utility only works in development mode
- Authentication persists across page visits
- Landing page button changes to "Projects" when authenticated

## Adding New Users

To add a new user:

1. Generate password hash:
```bash
curl -X POST http://localhost:3001/api/auth/hash-password \
  -H "Content-Type: application/json" \
  -d '{"password":"your-password"}'
```

2. Add user to `lib/auth.ts`:
```typescript
const USERS = [
  {
    id: '1',
    username: 'admin',
    passwordHash: '$2b$10$...',
    role: 'admin',
  },
  {
    id: '2',
    username: 'newuser',
    passwordHash: '$2b$10$...',  // Use hash from step 1
    role: 'user',
  },
];
```

## Adding New Projects

To add a new project to the dashboard:

1. Create the project page in `pages/projects/your-project.tsx`
2. Wrap it with `<ProtectedRoute>`
3. Add project to `components/DashboardModal.tsx`:

```typescript
const projects: Project[] = [
  // ... existing projects
  {
    id: 'your-project',
    name: 'Your Project',
    description: 'Project description',
    icon: <YourIcon className="w-8 h-8" />,
    route: '/projects/your-project',
    color: 'cyan',
    gradient: 'from-cyan-600 to-blue-600',
  },
];
```

4. Add navigation link in `pages/_app.tsx` if needed

## Responsive Design
- All components are fully responsive
- Mobile: 320px+
- Tablet: 640px+
- Desktop: 1024px+

## Cyberpunk Theme
- Neon colors: cyan (#06b6d4), purple (#8b5cf6), pink (#ec4899)
- Glowing borders and backgrounds
- Animated effects and transitions
- Grid patterns and gradients

## Testing

1. **Test Login:**
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

2. **Test Protected Route:**
```bash
# Without token (should fail)
curl http://localhost:3001/api/auth/me

# With token (should succeed)
curl http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Production Deployment

Before deploying to production:

1. Change `JWT_SECRET` in `.env.local` to a strong random string
2. Update admin password
3. Remove or protect the `/api/auth/hash-password` endpoint
4. Consider moving user credentials to a database
5. Add rate limiting to login endpoint
6. Enable HTTPS only
7. Add CORS protection
8. Consider adding 2FA

## Status: ✅ COMPLETE

All authentication features are implemented and working:
- ✅ Portfolio landing page
- ✅ Login modal with cyberpunk styling
- ✅ JWT authentication
- ✅ Protected routes
- ✅ Dashboard modal
- ✅ Navigation with logout
- ✅ Responsive design
- ✅ Password hashing
- ✅ Token persistence
- ✅ Auto-redirect on unauthorized access
