# Internal Dashboard - Frontend

Next.js 14 frontend application for the Internal Tool Dashboard.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Backend API running on http://localhost:4000

### Installation

```bash
npm install
```

### Configuration

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

### Development

```bash
npm run dev
```

Open http://localhost:3000

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
frontend/
├── app/
│   ├── login/              # Login page
│   ├── dashboard/          # Protected dashboard routes
│   │   ├── layout.tsx      # Dashboard layout with sidebar
│   │   ├── page.tsx        # Dashboard home
│   │   ├── employees/      # Employee pages
│   │   ├── projects/       # Project pages
│   │   ├── tasks/          # Task pages
│   │   ├── leave/          # Leave request pages
│   │   └── reports/        # Reports pages
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Root page (redirects to dashboard)
│
├── components/
│   ├── layout/             # Layout components
│   │   ├── Sidebar.tsx     # Navigation sidebar
│   │   └── ProtectedRoute.tsx  # Auth guard
│   └── ui/                 # Reusable UI components
│
├── lib/
│   ├── api-client.ts       # Axios instance with interceptors
│   ├── auth.ts             # Authentication service
│   ├── permissions.ts      # Permission helpers
│   ├── constants.ts        # App constants
│   └── utils.ts            # Utility functions
│
├── hooks/
│   └── useAuth.ts          # Authentication hook
│
└── types/
    └── index.ts            # TypeScript type definitions
```

## 🔐 Authentication

The app uses JWT token authentication:

1. User logs in with email/password
2. Backend returns JWT token
3. Token stored in localStorage
4. Token sent in Authorization header for all API requests
5. Auto-redirect to login if token expires

### Auth Hook Usage

```tsx
import { useAuth } from '@/hooks/useAuth'

function MyComponent() {
  const { user, loading, login, logout } = useAuth()
  
  if (loading) return <div>Loading...</div>
  if (!user) return <div>Not authenticated</div>
  
  return <div>Welcome {user.name}</div>
}
```

## 🛣️ Routes

### Public Routes
- `/login` - Login page

### Protected Routes (require authentication)
- `/dashboard` - Dashboard home
- `/dashboard/employees` - Employee list (Admin, Manager)
- `/dashboard/employees/[id]` - Employee detail
- `/dashboard/projects` - Project list
- `/dashboard/projects/new` - Create project (Admin, Manager)
- `/dashboard/projects/[id]` - Project detail
- `/dashboard/tasks` - Task list
- `/dashboard/tasks/new` - Create task (Admin, Manager)
- `/dashboard/tasks/[id]` - Task detail
- `/dashboard/leave` - Leave requests
- `/dashboard/leave/new` - Submit leave request
- `/dashboard/reports` - Reports & export (Admin, Manager)

## 🎨 Styling

Uses Tailwind CSS for styling:

```tsx
// Example component
<div className="bg-white rounded-lg shadow p-6">
  <h2 className="text-xl font-semibold text-gray-900">Title</h2>
  <p className="text-gray-600 mt-2">Description</p>
</div>
```

### Color Palette
- Primary: Blue (#3B82F6)
- Success: Green (#10B981)
- Warning: Orange (#F59E0B)
- Danger: Red (#EF4444)
- Gray scale for text and backgrounds

## 📡 API Integration

### API Client

```tsx
import { apiClient } from '@/lib/api-client'

// GET request
const response = await apiClient.get('/tasks')
const tasks = response.data.docs

// POST request
await apiClient.post('/tasks', {
  title: 'New Task',
  project: projectId,
  assignedTo: userId,
})

// PATCH request
await apiClient.patch(`/tasks/${taskId}`, {
  status: 'Done'
})

// DELETE request
await apiClient.delete(`/tasks/${taskId}`)
```

### Query Parameters

```tsx
// Filtering
apiClient.get('/tasks?where[status][equals]=Todo')

// Sorting
apiClient.get('/tasks?sort=-createdAt')

// Pagination
apiClient.get('/tasks?limit=10&page=1')

// Populate relationships
apiClient.get('/tasks?depth=1')
```

## 🔒 Permissions

Frontend permission checks (UI only, backend enforces security):

```tsx
import { permissions } from '@/lib/permissions'
import { useAuth } from '@/hooks/useAuth'

function MyComponent() {
  const { user } = useAuth()
  
  return (
    <div>
      {permissions.canCreateTask(user) && (
        <button>Create Task</button>
      )}
    </div>
  )
}
```

## 🧩 Component Examples

### Protected Route

```tsx
import { ProtectedRoute } from '@/components/layout/ProtectedRoute'

export default function MyPage() {
  return (
    <ProtectedRoute requiredRole={['admin', 'manager']}>
      <div>Admin/Manager only content</div>
    </ProtectedRoute>
  )
}
```

### Using Auth

```tsx
'use client'

import { useAuth } from '@/hooks/useAuth'

export default function ProfilePage() {
  const { user, logout } = useAuth()
  
  return (
    <div>
      <h1>Welcome {user?.name}</h1>
      <p>Role: {user?.role}</p>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
   ```
4. Deploy

### Other Platforms

Build the app:
```bash
npm run build
```

Start production server:
```bash
npm start
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🐛 Troubleshooting

### "Network Error" when calling API

Check:
1. Backend is running on http://localhost:4000
2. NEXT_PUBLIC_API_URL is correct in `.env.local`
3. CORS is configured in backend

### Login not working

1. Clear localStorage in browser DevTools
2. Check backend is running
3. Verify credentials are correct

### Page not found

1. Check route exists in `app/` directory
2. Restart dev server
3. Clear `.next` folder and rebuild

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
