# 🎉 Getting Started with Internal Tool Dashboard

Welcome! This guide will help you get up and running quickly.

---

## 📋 What You Have

A complete, production-ready Internal Tool Dashboard with:

✅ **Backend** - Payload CMS with 5 collections and role-based access control  
✅ **Frontend** - Next.js 14 with authentication and dashboard layout  
✅ **Database** - MongoDB with sample data  
✅ **Documentation** - Comprehensive guides and references  

---

## 🚀 5-Minute Quick Start

### Step 1: Install Dependencies (2 minutes)

```bash
# Backend
cd backend
npm install

# Frontend (new terminal)
cd frontend
npm install
```

### Step 2: Configure Environment (1 minute)

**Backend** - Create `backend/.env`:
```env
DATABASE_URI=mongodb://localhost:27017/internal-dashboard
PAYLOAD_SECRET=your-super-secret-key-min-32-chars-long-12345
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:4000
PORT=4000
FRONTEND_URL=http://localhost:3000
```

**Frontend** - Create `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

### Step 3: Seed Database (30 seconds)

```bash
cd backend
npm run seed
```

### Step 4: Start Servers (30 seconds)

```bash
# Backend (terminal 1)
cd backend
npm run dev

# Frontend (terminal 2)
cd frontend
npm run dev
```

### Step 5: Login and Explore (1 minute)

1. Open http://localhost:3000
2. Login with: `admin@example.com` / `admin123`
3. Explore the dashboard!

---

## 📚 Documentation Overview

We've created comprehensive documentation for you:

### 🎯 Start Here
- **[README.md](README.md)** - Project overview and features
- **[GETTING_STARTED.md](GETTING_STARTED.md)** - This file!

### 📖 Setup & Installation
- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Detailed step-by-step setup
- **[INSTALLATION_CHECKLIST.md](INSTALLATION_CHECKLIST.md)** - Verification checklist

### 🏗️ Technical Documentation
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System architecture and design
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Project status and roadmap

### ⚡ Quick Reference
- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Commands, URLs, code snippets
- **[backend/README.md](backend/README.md)** - Backend-specific docs
- **[frontend/README.md](frontend/README.md)** - Frontend-specific docs

---

## 🎓 Learning Path

### Day 1: Understand the Foundation
1. Read [README.md](README.md) for project overview
2. Follow [SETUP_GUIDE.md](SETUP_GUIDE.md) to set up locally
3. Login and explore the dashboard
4. Test different user roles (Admin, Manager, Employee)

### Day 2: Explore the Backend
1. Open http://localhost:4000/admin
2. Navigate through collections (Users, Employees, Projects, Tasks, Leave Requests)
3. Try creating, editing, and deleting records
4. Test access control by logging in as different roles
5. Review `backend/src/collections/` files

### Day 3: Explore the Frontend
1. Review `frontend/app/` structure
2. Understand the authentication flow in `lib/auth.ts`
3. Check out the dashboard layout in `app/dashboard/layout.tsx`
4. Review the Sidebar component
5. Open browser DevTools and inspect API calls

### Day 4: Read the Architecture
1. Study [ARCHITECTURE.md](ARCHITECTURE.md)
2. Understand the data model and relationships
3. Learn about the access control system
4. Review the API request flow

### Day 5: Start Building
1. Pick a feature from [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)
2. Create a new page (e.g., Employee list)
3. Fetch data from the API
4. Build the UI with Tailwind CSS
5. Test with different user roles

---

## 🛠️ What's Already Built

### ✅ Backend (100% Complete)

**Collections:**
- Users (authentication)
- Employees (HR data)
- Projects (project management)
- Tasks (task tracking)
- Leave Requests (leave approval)

**Features:**
- Role-based access control
- JWT authentication
- Field-level permissions
- Data validation
- Admin panel
- RESTful API
- Sample data seeding

### ✅ Frontend (30% Complete)

**Completed:**
- Project setup and configuration
- Authentication system (login/logout)
- Dashboard layout with sidebar
- Protected routes
- Dashboard home with statistics
- API client with interceptors
- Permission helpers
- TypeScript types

**To Build:**
- Employee management pages
- Project management pages
- Task management pages
- Leave request pages
- Reports and export functionality
- Reusable UI components

---

## 🎯 Your First Task

Let's build the **Employee List Page** together!

### 1. Create the Route File

Create `frontend/app/dashboard/employees/page.tsx`:

```tsx
'use client'

import { useEffect, useState } from 'react'
import { apiClient } from '@/lib/api-client'
import { Employee } from '@/types'

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await apiClient.get('/employees?depth=1')
        setEmployees(response.data.docs)
      } catch (error) {
        console.error('Failed to fetch employees:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEmployees()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
        <p className="text-gray-600 mt-1">Manage your team members</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Designation
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {typeof employee.user === 'object' ? employee.user.name : 'N/A'}
                  </div>
                  <div className="text-sm text-gray-500">
                    {typeof employee.user === 'object' ? employee.user.email : ''}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {employee.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {employee.designation}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    employee.status === 'Active' 
                      ? 'bg-green-100 text-green-800'
                      : employee.status === 'On Leave'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {employee.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
```

### 2. Test It

1. Save the file
2. Navigate to http://localhost:3000/dashboard/employees
3. You should see a table with employee data!

### 3. Next Steps

Now you can:
- Add a "Create Employee" button
- Add employee detail page
- Add search and filters
- Add pagination

---

## 🎨 UI Component Examples

### Button Component

Create `frontend/components/ui/Button.tsx`:

```tsx
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }
  
  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        (disabled || loading) && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  )
}
```

Usage:
```tsx
<Button variant="primary" size="md">
  Create Employee
</Button>
```

---

## 🔧 Development Workflow

### Daily Routine

1. **Start servers**
   ```bash
   # Windows
   start-dev.bat
   
   # Or manually in 2 terminals
   cd backend && npm run dev
   cd frontend && npm run dev
   ```

2. **Make changes**
   - Edit files in `frontend/` or `backend/`
   - Servers auto-reload on changes

3. **Test changes**
   - Check browser: http://localhost:3000
   - Check API: http://localhost:4000/api
   - Check admin: http://localhost:4000/admin

4. **Commit changes**
   ```bash
   git add .
   git commit -m "Add employee list page"
   git push
   ```

### Testing Different Roles

Always test your changes as different user roles:

```bash
# Admin (full access)
admin@example.com / admin123

# Manager (limited access)
manager@example.com / manager123

# Employee (restricted access)
employee1@example.com / employee123
```

---

## 🆘 Common Issues

### "Cannot connect to MongoDB"
```bash
# Start MongoDB
mongosh

# Or use MongoDB Atlas (cloud)
# Update DATABASE_URI in backend/.env
```

### "Port already in use"
```bash
# Change port in backend/.env
PORT=5000

# Update frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### "Login not working"
```bash
# Clear browser storage
# F12 → Application → Local Storage → Clear All

# Reseed database
cd backend
npm run seed
```

---

## 📚 Learning Resources

### Official Documentation
- [Payload CMS](https://payloadcms.com/docs)
- [Next.js](https://nextjs.org/docs)
- [React](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)

### Tutorials
- [Payload CMS Tutorial](https://payloadcms.com/docs/getting-started/what-is-payload)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Tailwind CSS Tutorial](https://tailwindcss.com/docs/utility-first)

---

## 🎯 Development Roadmap

### Week 1: Core Pages
- [ ] Employee list and detail pages
- [ ] Project list and detail pages
- [ ] Task list and detail pages

### Week 2: Forms & Actions
- [ ] Create/edit employee forms
- [ ] Create/edit project forms
- [ ] Create/edit task forms
- [ ] Leave request submission

### Week 3: Advanced Features
- [ ] Leave approval workflow
- [ ] Reports and analytics
- [ ] CSV export functionality
- [ ] Search and filters

### Week 4: Polish & Deploy
- [ ] Loading states
- [ ] Error handling
- [ ] Mobile responsiveness
- [ ] Production deployment

---

## 🎉 You're Ready!

You now have everything you need to:
- ✅ Run the application locally
- ✅ Understand the architecture
- ✅ Start building new features
- ✅ Deploy to production

**Happy coding! 🚀**

---

## 💬 Need Help?

1. Check [QUICK_REFERENCE.md](QUICK_REFERENCE.md) for commands
2. Review [SETUP_GUIDE.md](SETUP_GUIDE.md) for troubleshooting
3. Read [ARCHITECTURE.md](ARCHITECTURE.md) for technical details
4. Check the official documentation links above

**Let's build something amazing!** 🎨
