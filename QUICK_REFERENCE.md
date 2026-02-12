# ⚡ Quick Reference Guide

Fast reference for common tasks and commands.

---

## 🚀 Quick Start Commands

### First Time Setup
```bash
# Backend
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and secret
npm run seed
npm run dev

# Frontend (new terminal)
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

### Daily Development
```bash
# Windows - Use the batch file
start-dev.bat

# Or manually:
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```

---

## 🔑 Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | admin123 |
| Manager | manager@example.com | manager123 |
| Employee | employee1@example.com | employee123 |
| Employee | employee2@example.com | employee123 |

---

## 🌐 URLs

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:3000 | Main application |
| Backend API | http://localhost:4000/api | REST API endpoints |
| Admin Panel | http://localhost:4000/admin | Payload admin interface |

---

## 📡 API Endpoints

### Authentication
```bash
POST   /api/users/login          # Login
POST   /api/users/logout         # Logout
GET    /api/users/me             # Current user
```

### Collections
```bash
GET    /api/users                # List users
GET    /api/users/:id            # Get user
POST   /api/users                # Create user
PATCH  /api/users/:id            # Update user
DELETE /api/users/:id            # Delete user

GET    /api/employees            # List employees
GET    /api/projects             # List projects
GET    /api/tasks                # List tasks
GET    /api/leave-requests       # List leave requests
```

### Query Parameters
```bash
# Filtering
?where[field][equals]=value
?where[status][in]=Active,Planning

# Sorting
?sort=-createdAt                 # Descending
?sort=name                       # Ascending

# Pagination
?limit=10&page=1

# Relationships
?depth=1                         # Populate one level
?depth=2                         # Populate two levels
```

---

## 🛠️ Common npm Scripts

### Backend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run seed         # Seed database
npm run generate:types  # Generate TypeScript types
```

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

---

## 📁 Important File Locations

### Backend
```
backend/
├── src/
│   ├── server.ts                    # Main server file
│   ├── payload.config.ts            # Payload configuration
│   ├── collections/                 # Collection definitions
│   │   ├── Users.ts
│   │   ├── Employees.ts
│   │   ├── Projects.ts
│   │   ├── Tasks.ts
│   │   └── LeaveRequests.ts
│   ├── access/                      # Access control
│   └── seed/index.ts                # Seed script
└── .env                             # Environment variables
```

### Frontend
```
frontend/
├── app/
│   ├── login/page.tsx               # Login page
│   └── dashboard/                   # Dashboard routes
│       ├── layout.tsx               # Dashboard layout
│       └── page.tsx                 # Dashboard home
├── components/
│   └── layout/
│       ├── Sidebar.tsx              # Navigation
│       └── ProtectedRoute.tsx       # Auth guard
├── lib/
│   ├── api-client.ts                # Axios instance
│   ├── auth.ts                      # Auth service
│   └── permissions.ts               # Permissions
├── hooks/
│   └── useAuth.ts                   # Auth hook
└── .env.local                       # Environment variables
```

---

## 🔧 Environment Variables

### Backend (.env)
```env
DATABASE_URI=mongodb://localhost:27017/internal-dashboard
PAYLOAD_SECRET=your-secret-key-min-32-characters-long
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:4000
PORT=4000
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

---

## 🐛 Troubleshooting Quick Fixes

### Backend won't start
```bash
# Check MongoDB is running
mongosh

# Check port is free
netstat -ano | findstr :4000

# Clear and reinstall
rm -rf node_modules
npm install
```

### Frontend won't start
```bash
# Clear Next.js cache
rm -rf .next

# Clear and reinstall
rm -rf node_modules
npm install
```

### Login not working
```bash
# Clear browser storage
# DevTools (F12) → Application → Local Storage → Clear All

# Reseed database
cd backend
npm run seed
```

### CORS errors
```bash
# Check FRONTEND_URL in backend/.env
# Check NEXT_PUBLIC_API_URL in frontend/.env.local
# Restart both servers
```

---

## 📝 Code Snippets

### Fetch Data from API
```tsx
import { apiClient } from '@/lib/api-client'

const response = await apiClient.get('/tasks?depth=1')
const tasks = response.data.docs
```

### Use Authentication
```tsx
import { useAuth } from '@/hooks/useAuth'

function MyComponent() {
  const { user, loading, logout } = useAuth()
  
  if (loading) return <div>Loading...</div>
  if (!user) return <div>Not authenticated</div>
  
  return <div>Welcome {user.name}</div>
}
```

### Check Permissions
```tsx
import { permissions } from '@/lib/permissions'
import { useAuth } from '@/hooks/useAuth'

function MyComponent() {
  const { user } = useAuth()
  
  return (
    <>
      {permissions.canCreateTask(user) && (
        <button>Create Task</button>
      )}
    </>
  )
}
```

### Protected Route
```tsx
import { ProtectedRoute } from '@/components/layout/ProtectedRoute'

export default function AdminPage() {
  return (
    <ProtectedRoute requiredRole={['admin']}>
      <div>Admin only content</div>
    </ProtectedRoute>
  )
}
```

---

## 🎨 Tailwind CSS Classes

### Common Patterns
```tsx
// Card
<div className="bg-white rounded-lg shadow p-6">

// Button Primary
<button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">

// Button Secondary
<button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">

// Input
<input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />

// Badge
<span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">

// Table
<table className="min-w-full divide-y divide-gray-200">
  <thead className="bg-gray-50">
    <tr>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
```

---

## 🔐 Role Permissions Quick Reference

| Feature | Admin | Manager | Employee |
|---------|-------|---------|----------|
| View all employees | ✅ | ✅ | ❌ |
| Create employee | ✅ | ❌ | ❌ |
| View all projects | ✅ | ✅ | Assigned only |
| Create project | ✅ | ✅ | ❌ |
| View all tasks | ✅ | ✅ | Assigned only |
| Create task | ✅ | ✅ | ❌ |
| Update task status | ✅ | ✅ | Own tasks |
| Approve leave | ✅ | ✅ | ❌ |
| Export data | ✅ | ✅ | ❌ |

---

## 📚 Documentation Links

| Document | Description |
|----------|-------------|
| [README.md](README.md) | Main project overview |
| [SETUP_GUIDE.md](SETUP_GUIDE.md) | Detailed setup instructions |
| [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | Project status and roadmap |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Technical architecture |
| [INSTALLATION_CHECKLIST.md](INSTALLATION_CHECKLIST.md) | Step-by-step checklist |
| [backend/README.md](backend/README.md) | Backend documentation |
| [frontend/README.md](frontend/README.md) | Frontend documentation |

---

## 🆘 Getting Help

1. Check error message in terminal
2. Check browser console (F12)
3. Review troubleshooting section in SETUP_GUIDE.md
4. Check Payload CMS docs: https://payloadcms.com/docs
5. Check Next.js docs: https://nextjs.org/docs

---

## 🎯 Next Development Tasks

1. Build Employee management pages
2. Build Project management pages
3. Build Task management pages
4. Build Leave request pages
5. Build Reports page with CSV export
6. Create reusable UI components
7. Add loading states and error handling
8. Mobile responsiveness improvements
9. Deploy to production

---

**Keep this file handy for quick reference during development!**
