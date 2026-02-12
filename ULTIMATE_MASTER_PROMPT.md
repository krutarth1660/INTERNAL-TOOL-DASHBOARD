# 🔥 ULTIMATE MASTER PROMPT — INTERNAL TOOL DASHBOARD
**Enterprise-Grade Full-Stack Application with Next.js + Payload CMS**

---

## 🎯 AI ROLE & CONTEXT

You are a **Senior Full-Stack Software Architect and Technical Mentor** with expertise in:
- Next.js 14+ (App Router, TypeScript, Server Components)
- Payload CMS (Authentication, Access Control, Collections)
- Enterprise security patterns and role-based access control
- Production-ready code architecture and deployment strategies

**Your Mission:**  
Guide me through building a complete, production-ready Internal Tool Dashboard that demonstrates enterprise-level architecture, security, and scalability. This project will be used for interviews and real-world deployment.

**Communication Style:**
- Act as a senior mentor teaching a mid-level developer
- Explain WHY behind every architectural decision
- Provide complete, working code examples
- Never skip critical steps
- Think about scalability, security, and maintainability first

---

## 📋 PROJECT DEFINITION

**Project Name:** Internal Tool Dashboard (HR & Project Management System)

**Description:**  
A secure, role-based web application for managing employees, projects, tasks, and leave requests. Built with Next.js 14+ (App Router, TypeScript) and Payload CMS as the backend/auth layer, styled with Tailwind CSS.

**Core Purpose:**
- Replace manual spreadsheets with centralized data management
- Enforce strict role-based access control at API and UI levels
- Provide secure data export functionality (CSV)
- Automate leave approval workflows
- Enable real-time task tracking and project management

**Architecture Choice:**  
You must decide and explain whether to use:
1. **Integrated Architecture** – Payload embedded within Next.js (single deployment)
2. **Decoupled Architecture** – Separate frontend/backend (two deployments)

Recommend the best approach based on scalability, deployment complexity, and maintenance.

---

## 👥 USER ROLES & PERMISSION MATRIX

### Role Definitions

**Admin**
- Full system access across all collections
- User management (create, update, delete users)
- View and edit all data without restrictions
- Export any data
- System configuration access

**Manager**
- View all employees and their details
- Create and manage projects
- Assign tasks to team members
- Approve/reject leave requests
- View reports and analytics
- Export project/task data

**Employee**
- View only assigned tasks
- Update own task status
- Submit leave requests
- View own leave history
- Read-only access to assigned projects

### Detailed Permission Matrix

| Collection / Action | Admin | Manager | Employee |
|---------------------|-------|---------|----------|
| **Users** - Read | ✅ All | ✅ All | ❌ Self only |
| **Users** - Create | ✅ | ❌ | ❌ |
| **Users** - Update | ✅ All | ❌ | ✅ Self (name/password) |
| **Users** - Delete | ✅ | ❌ | ❌ |
| **Employees** - Read | ✅ All | ✅ All | ✅ Own record |
| **Employees** - Create | ✅ | ❌ | ❌ |
| **Employees** - Update | ✅ All | ✅ Limited fields | ❌ |
| **Employees** - Delete | ✅ | ❌ | ❌ |
| **Projects** - Read | ✅ All | ✅ All | ✅ Assigned only |
| **Projects** - Create | ✅ | ✅ | ❌ |
| **Projects** - Update | ✅ All | ✅ Own projects | ❌ |
| **Projects** - Delete | ✅ | ❌ | ❌ |
| **Tasks** - Read | ✅ All | ✅ All | ✅ Assigned to self |
| **Tasks** - Create | ✅ | ✅ | ❌ |
| **Tasks** - Update | ✅ All | ✅ All | ✅ Own status only |
| **Tasks** - Delete | ✅ | ✅ | ❌ |
| **LeaveRequests** - Read | ✅ All | ✅ All | ✅ Own requests |
| **LeaveRequests** - Create | ✅ | ✅ | ✅ Self |
| **LeaveRequests** - Update | ✅ All | ✅ Approve/Reject | ✅ Own pending |
| **LeaveRequests** - Delete | ✅ | ❌ | ❌ |

**Critical Security Rule:**  
Permissions MUST be enforced at the backend (Payload access control functions). Frontend UI visibility is for UX only, never for security.

---

## 🗄️ DATABASE COLLECTIONS (PAYLOAD CMS)

Define the following collections with complete field specifications:

### 1. Users Collection (`users`)
**Extends Payload Auth**

Fields:
- `email` (text, required) – from Payload auth
- `password` (password, required) – from Payload auth
- `name` (text, required) – full name
- `role` (select, required) – options: `admin`, `manager`, `employee`

Access Control:
- Admin: full CRUD
- Manager: read all, update self
- Employee: read self, update self (name/password only)

### 2. Employees Collection (`employees`)
**Links users to HR data**

Fields:
- `user` (relationship to Users, required, unique)
- `department` (text, required) – e.g., "Engineering", "HR"
- `designation` (text, required) – job title
- `status` (select, required) – options: `Active`, `On Leave`, `Resigned`
- `joinDate` (date, required)
- `salary` (number, optional) – Admin only visibility

Access Control:
- Admin: full CRUD
- Manager: read all
- Employee: read own record only

### 3. Projects Collection (`projects`)

Fields:
- `name` (text, required)
- `description` (textarea, required)
- `manager` (relationship to Users, required) – must be Manager or Admin role
- `startDate` (date, required)
- `endDate` (date, optional)
- `status` (select, required) – options: `Planning`, `Active`, `Completed`, `On Hold`
- `budget` (number, optional)

Access Control:
- Admin: full CRUD
- Manager: full CRUD on own projects, read all
- Employee: read projects they're assigned to (via tasks)

### 4. Tasks Collection (`tasks`)

Fields:
- `title` (text, required)
- `description` (richText, required)
- `project` (relationship to Projects, required)
- `assignedTo` (relationship to Users, required)
- `priority` (select, required) – options: `Low`, `Medium`, `High`, `Critical`
- `status` (select, required) – options: `Todo`, `In Progress`, `In Review`, `Done`, `Blocked`
- `dueDate` (date, required)
- `estimatedHours` (number, optional)
- `actualHours` (number, optional)

Access Control:
- Admin: full CRUD
- Manager: full CRUD
- Employee: read tasks assigned to them, update status/actualHours only

### 5. LeaveRequests Collection (`leave-requests`)

Fields:
- `employee` (relationship to Users, required)
- `leaveType` (select, required) – options: `Sick`, `Vacation`, `Personal`, `Unpaid`
- `startDate` (date, required)
- `endDate` (date, required)
- `reason` (textarea, required)
- `status` (select, required) – options: `Pending`, `Approved`, `Rejected`
- `approvedBy` (relationship to Users, optional) – auto-set on approval
- `approvalDate` (date, optional) – auto-set on approval
- `rejectionReason` (textarea, optional) – required if rejected

Access Control:
- Admin: full CRUD
- Manager: read all, update (approve/reject)
- Employee: create own, read own, update own (only if pending)

**Validation Rules:**
- `endDate` must be after `startDate`
- Cannot create overlapping leave requests for same employee
- Status can only change: Pending → Approved/Rejected (no reversal)

---

## 🏗️ COMPLETE FOLDER STRUCTURE

Provide a detailed file tree based on your chosen architecture (integrated or decoupled).

### For Integrated Architecture:

```
internal-dashboard/
├── .env.local
├── .eslintrc.json
├── .gitignore
├── next.config.js
├── package.json
├── tailwind.config.js
├── tsconfig.json
│
├── app/                                    # Next.js App Router
│   ├── (auth)/                            # Auth route group (no layout)
│   │   └── login/
│   │       └── page.tsx                  # Public login page
│   │
│   ├── (dashboard)/                       # Protected route group
│   │   ├── layout.tsx                    # Dashboard layout (Sidebar + Navbar)
│   │   ├── page.tsx                      # Dashboard home (stat cards)
│   │   │
│   │   ├── employees/
│   │   │   ├── page.tsx                  # Employee list
│   │   │   └── [id]/
│   │   │       └── page.tsx              # Employee detail/edit
│   │   │
│   │   ├── projects/
│   │   │   ├── page.tsx                  # Project list
│   │   │   ├── new/
│   │   │   │   └── page.tsx              # Create project
│   │   │   └── [id]/
│   │   │       ├── page.tsx              # Project detail
│   │   │       └── edit/
│   │   │           └── page.tsx          # Edit project
│   │   │
│   │   ├── tasks/
│   │   │   ├── page.tsx                  # Task list (filtered by role)
│   │   │   ├── new/
│   │   │   │   └── page.tsx              # Create task
│   │   │   └── [id]/
│   │   │       ├── page.tsx              # Task detail
│   │   │       └── edit/
│   │   │           └── page.tsx          # Edit task
│   │   │
│   │   ├── leave/
│   │   │   ├── page.tsx                  # Leave requests list
│   │   │   └── new/
│   │   │       └── page.tsx              # Submit leave request
│   │   │
│   │   └── reports/
│   │       └── page.tsx                  # Manager/Admin reports + export
│   │
│   ├── api/                               # Next.js API routes
│   │   ├── export/
│   │   │   └── route.ts                  # CSV export endpoint
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts              # NextAuth config (if using)
│   │
│   └── admin/                             # Payload Admin UI
│       └── [[...segments]]/
│           └── page.tsx                  # Payload admin panel
│
├── components/                            # React components
│   ├── layout/
│   │   ├── Sidebar.tsx                   # Navigation sidebar
│   │   ├── Navbar.tsx                    # Top navbar
│   │   ├── ProtectedRoute.tsx            # Auth guard wrapper
│   │   └── DashboardShell.tsx            # Combined layout shell
│   │
│   ├── ui/                                # Generic UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Textarea.tsx
│   │   ├── Modal.tsx
│   │   ├── Dialog.tsx
│   │   ├── Table.tsx                     # @tanstack/react-table wrapper
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Tabs.tsx
│   │   ├── DatePicker.tsx
│   │   └── LoadingSpinner.tsx
│   │
│   └── features/                          # Feature-specific components
│       ├── dashboard/
│       │   ├── StatCard.tsx
│       │   └── QuickActions.tsx
│       │
│       ├── employees/
│       │   ├── EmployeeTable.tsx
│       │   ├── EmployeeForm.tsx
│       │   └── EmployeeStatusBadge.tsx
│       │
│       ├── projects/
│       │   ├── ProjectCard.tsx
│       │   ├── ProjectForm.tsx
│       │   └── ProjectStatusBadge.tsx
│       │
│       ├── tasks/
│       │   ├── TaskTable.tsx
│       │   ├── TaskForm.tsx
│       │   ├── TaskStatusBadge.tsx
│       │   ├── TaskPriorityBadge.tsx
│       │   └── TaskAssigneeSelect.tsx
│       │
│       └── leave/
│           ├── LeaveRequestTable.tsx
│           ├── LeaveRequestForm.tsx
│           ├── LeaveStatusBadge.tsx
│           └── LeaveApprovalButtons.tsx
│
├── lib/                                   # Utilities and helpers
│   ├── payload/
│   │   ├── client.ts                     # Payload local API client
│   │   └── config.ts                     # Payload config import
│   │
│   ├── auth.ts                           # Auth helpers (getCurrentUser, etc.)
│   ├── permissions.ts                    # Frontend permission checks
│   ├── constants.ts                      # App constants (roles, statuses)
│   ├── utils.ts                          # General utilities
│   ├── validations.ts                    # Form validation schemas (Zod)
│   └── api-client.ts                     # API request wrapper
│
├── hooks/                                 # Custom React hooks
│   ├── useAuth.ts                        # Authentication hook
│   ├── useUser.ts                        # Current user data
│   ├── usePermissions.ts                 # Permission checks
│   └── useToast.ts                       # Toast notifications
│
├── payload/                               # Payload CMS configuration
│   ├── payload.config.ts                 # Main Payload config
│   │
│   ├── collections/                      # Collection definitions
│   │   ├── Users.ts
│   │   ├── Employees.ts
│   │   ├── Projects.ts
│   │   ├── Tasks.ts
│   │   └── LeaveRequests.ts
│   │
│   ├── access/                           # Reusable access control
│   │   ├── isAdmin.ts
│   │   ├── isManager.ts
│   │   ├── isAdminOrManager.ts
│   │   ├── isSelf.ts
│   │   ├── isAssignedTo.ts
│   │   └── helpers.ts
│   │
│   ├── hooks/                            # Payload hooks
│   │   ├── autoSetApprover.ts
│   │   └── validateDateRange.ts
│   │
│   └── seed/                             # Database seeding
│       └── index.ts                      # Seed script
│
├── types/                                 # TypeScript types
│   ├── payload-types.ts                  # Auto-generated from Payload
│   ├── index.ts                          # Custom app types
│   └── api.ts                            # API response types
│
├── styles/
│   └── globals.css                       # Tailwind imports + custom styles
│
└── public/                                # Static assets
    ├── favicon.ico
    └── images/
```

**Total File Count:** ~60-70 files

**Key Directories Explained:**
- `app/` – Next.js 14 App Router with route groups for auth/dashboard
- `components/` – Organized by layout/ui/features for scalability
- `payload/` – Complete Payload CMS backend configuration
- `lib/` – Shared utilities and business logic
- `hooks/` – Custom React hooks for data fetching and state

---

## 🖥️ FRONTEND PAGES & ROUTES

Complete specification for all Next.js pages:

| Route | File Path | Access | Purpose | Key Features | Data Source |
|-------|-----------|--------|---------|--------------|-------------|
| `/login` | `app/(auth)/login/page.tsx` | Public | User authentication | Login form, error handling, redirect to dashboard | Payload Auth API |
| `/dashboard` | `app/(dashboard)/page.tsx` | All authenticated | Dashboard home | Stat cards (employees, projects, tasks, pending leaves), quick actions | Payload Local API (server component) |
| `/dashboard/employees` | `app/(dashboard)/employees/page.tsx` | Admin, Manager | Employee list | Table with search/filter, add button (Admin only) | Payload Local API |
| `/dashboard/employees/[id]` | `app/(dashboard)/employees/[id]/page.tsx` | Admin, Manager, Self | Employee detail | View/edit employee info, role-based field visibility | Payload Local API |
| `/dashboard/projects` | `app/(dashboard)/projects/page.tsx` | Admin, Manager | Project list | Grid/table view, status filters, create button | Payload Local API |
| `/dashboard/projects/new` | `app/(dashboard)/projects/new/page.tsx` | Admin, Manager | Create project | Project form with validation | Payload REST API |
| `/dashboard/projects/[id]` | `app/(dashboard)/projects/[id]/page.tsx` | All (filtered) | Project detail | Project info, related tasks, team members | Payload Local API |
| `/dashboard/projects/[id]/edit` | `app/(dashboard)/projects/[id]/edit/page.tsx` | Admin, Manager (owner) | Edit project | Editable project form | Payload REST API |
| `/dashboard/tasks` | `app/(dashboard)/tasks/page.tsx` | All (filtered) | Task list | Table with filters (status, priority, assignee), role-based visibility | Payload Local API with role filter |
| `/dashboard/tasks/new` | `app/(dashboard)/tasks/new/page.tsx` | Admin, Manager | Create task | Task form with project/assignee selection | Payload REST API |
| `/dashboard/tasks/[id]` | `app/(dashboard)/tasks/[id]/page.tsx` | All (ownership) | Task detail | Task info, comments, status updates | Payload Local API |
| `/dashboard/tasks/[id]/edit` | `app/(dashboard)/tasks/[id]/edit/page.tsx` | Admin, Manager | Edit task | Full task edit form | Payload REST API |
| `/dashboard/leave` | `app/(dashboard)/leave/page.tsx` | All (filtered) | Leave requests | Table with status filters, approval buttons (Manager), create button | Payload Local API with role filter |
| `/dashboard/leave/new` | `app/(dashboard)/leave/new/page.tsx` | All | Submit leave request | Leave request form with date picker, validation | Payload REST API |
| `/dashboard/reports` | `app/(dashboard)/reports/page.tsx` | Manager, Admin | Reports & analytics | Summary metrics, charts, CSV export button | Payload Local API + aggregation |

### Page Implementation Guidelines:

**Server Components (Default):**
- Use for all pages that fetch data on load
- Leverage Payload Local API for direct database access
- Implement proper error boundaries
- Add loading.tsx for each route segment

**Client Components (When Needed):**
- Forms with interactive validation
- Components with useState/useEffect
- Real-time updates
- Mark with 'use client' directive

**Authentication Flow:**
1. All `(dashboard)` routes protected by layout-level auth check
2. Redirect to `/login` if not authenticated
3. Role-based page access enforced in layout
4. Individual components check permissions for UI elements

**Data Fetching Strategy:**
- Server Components: Direct Payload Local API calls
- Client Components: SWR or TanStack Query for caching
- Optimistic updates for better UX
- Proper error handling and loading states

---

## 🧩 COMPONENT LIBRARY SPECIFICATION

### Layout Components

**Sidebar.tsx**
- Purpose: Main navigation menu
- Features:
  - Role-based menu item visibility
  - Active route highlighting
  - Collapsible on mobile
  - User info section at bottom
- Props: `user: User`, `collapsed?: boolean`

**Navbar.tsx**
- Purpose: Top navigation bar
- Features:
  - Breadcrumb navigation
  - User dropdown (profile, settings, logout)
  - Notifications icon (future)
  - Mobile menu toggle
- Props: `user: User`, `onMenuToggle: () => void`

**ProtectedRoute.tsx**
- Purpose: Authentication guard
- Features:
  - Check authentication status
  - Redirect to login if not authenticated
  - Role-based access control
  - Loading state during auth check
- Props: `children: ReactNode`, `requiredRole?: Role[]`

### UI Components (Generic, Reusable)

**Table.tsx**
- Library: @tanstack/react-table
- Features:
  - Sorting, filtering, pagination
  - Column visibility toggle
  - Row selection
  - Responsive design
  - Export to CSV
- Props: `columns`, `data`, `onRowClick?`, `loading?`

**Button.tsx**
- Variants: primary, secondary, outline, ghost, danger
- Sizes: sm, md, lg
- States: default, loading, disabled
- Props: `variant`, `size`, `loading`, `disabled`, `onClick`

**Modal.tsx**
- Features:
  - Backdrop click to close
  - ESC key to close
  - Focus trap
  - Accessible (ARIA)
- Props: `isOpen`, `onClose`, `title`, `children`, `footer?`

**Input.tsx**
- Types: text, email, password, number
- Features:
  - Label, error message, helper text
  - Icon support (prefix/suffix)
  - Validation state styling
- Props: `label`, `error`, `helperText`, `icon?`

**Select.tsx**
- Features:
  - Single/multi-select
  - Search/filter options
  - Custom option rendering
  - Accessible
- Props: `options`, `value`, `onChange`, `multiple?`, `searchable?`

**DatePicker.tsx**
- Library: react-day-picker or similar
- Features:
  - Date range selection
  - Min/max date constraints
  - Disabled dates
  - Custom formatting
- Props: `value`, `onChange`, `mode: 'single' | 'range'`, `disabled?`

### Feature Components

**StatCard.tsx**
- Purpose: Display key metrics on dashboard
- Features:
  - Number with label
  - Trend indicator (up/down)
  - Icon
  - Click action (optional)
- Props: `title`, `value`, `trend?`, `icon?`, `onClick?`

**TaskStatusBadge.tsx**
- Purpose: Visual task status indicator
- Features:
  - Color-coded by status
  - Icon per status
  - Tooltip with description
- Props: `status: TaskStatus`

**TaskPriorityBadge.tsx**
- Purpose: Visual priority indicator
- Features:
  - Color-coded (Critical=red, High=orange, etc.)
  - Icon
- Props: `priority: TaskPriority`

**LeaveApprovalButtons.tsx**
- Purpose: Approve/Reject leave requests
- Features:
  - Approve button (green)
  - Reject button (red) with reason modal
  - Loading states
  - Confirmation dialogs
- Props: `leaveRequestId`, `onApprove`, `onReject`

**EmployeeForm.tsx**
- Purpose: Create/edit employee
- Features:
  - All employee fields
  - User relationship selector
  - Validation (Zod schema)
  - Submit/cancel actions
- Props: `employee?`, `onSubmit`, `onCancel`

---

## 🔐 PAYLOAD ACCESS CONTROL IMPLEMENTATION

For each collection, provide complete TypeScript access control functions.

### Access Control Pattern

```typescript
import { Access } from 'payload/types'

// Example: Tasks collection read access
export const readTasks: Access = ({ req: { user } }) => {
  // No user = no access
  if (!user) return false
  
  // Admin sees everything
  if (user.role === 'admin') return true
  
  // Manager sees everything
  if (user.role === 'manager') return true
  
  // Employee sees only assigned tasks
  if (user.role === 'employee') {
    return {
      assignedTo: {
        equals: user.id
      }
    }
  }
  
  return false
}
```

### Required Access Functions Per Collection

**Users Collection:**
- `readUsers` – Admin/Manager see all, Employee sees self
- `createUsers` – Admin only
- `updateUsers` – Admin all, Employee self (limited fields)
- `deleteUsers` – Admin only

**Employees Collection:**
- `readEmployees` – Admin/Manager see all, Employee sees self
- `createEmployees` – Admin only
- `updateEmployees` – Admin all, Manager limited fields
- `deleteEmployees` – Admin only

**Projects Collection:**
- `readProjects` – Admin/Manager see all, Employee sees assigned (via tasks)
- `createProjects` – Admin/Manager
- `updateProjects` – Admin all, Manager own projects
- `deleteProjects` – Admin only

**Tasks Collection:**
- `readTasks` – Admin/Manager see all, Employee sees assigned
- `createTasks` – Admin/Manager
- `updateTasks` – Admin/Manager all, Employee own (status only)
- `deleteTasks` – Admin/Manager

**LeaveRequests Collection:**
- `readLeaveRequests` – Admin/Manager see all, Employee sees own
- `createLeaveRequests` – All (but employee field must match user)
- `updateLeaveRequests` – Admin all, Manager approve/reject, Employee own pending
- `deleteLeaveRequests` – Admin only

### Field-Level Access Control

Some fields require additional restrictions:

**Employees.salary:**
- Read: Admin only
- Update: Admin only

**LeaveRequests.status:**
- Update: Admin/Manager only (employees cannot self-approve)

**Tasks.assignedTo:**
- Update: Admin/Manager only (employees cannot reassign)

### Hooks for Business Logic

**beforeChange Hook Example (LeaveRequests):**
```typescript
beforeChange: [
  async ({ data, req, operation }) => {
    // Auto-set approvedBy and approvalDate when status changes to Approved
    if (data.status === 'Approved' && operation === 'update') {
      data.approvedBy = req.user.id
      data.approvalDate = new Date()
    }
    
    // Validate date range
    if (new Date(data.endDate) <= new Date(data.startDate)) {
      throw new Error('End date must be after start date')
    }
    
    return data
  }
]
```

**afterRead Hook Example (Employees):**
```typescript
afterRead: [
  async ({ doc, req }) => {
    // Hide salary from non-admins
    if (req.user?.role !== 'admin') {
      delete doc.salary
    }
    return doc
  }
]
```

---

## 📡 API & DATA FETCHING STRATEGY

### Server Components (Payload Local API)

**Advantages:**
- Direct database access (no HTTP overhead)
- Automatic authentication context
- Type-safe with generated types
- Server-side rendering benefits

**Example Usage:**
```typescript
// app/(dashboard)/tasks/page.tsx
import { getPayloadClient } from '@/lib/payload/client'
import { getCurrentUser } from '@/lib/auth'

export default async function TasksPage() {
  const payload = await getPayloadClient()
  const user = await getCurrentUser()
  
  // Payload automatically applies access control
  const tasks = await payload.find({
    collection: 'tasks',
    where: {
      // Additional filters if needed
    },
    sort: '-createdAt',
    limit: 50
  })
  
  return <TaskTable tasks={tasks.docs} user={user} />
}
```

### Client Components (REST API)

**When to Use:**
- Interactive forms
- Real-time updates
- Optimistic UI updates
- Client-side filtering/sorting

**API Client Setup:**
```typescript
// lib/api-client.ts
import axios from 'axios'

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  withCredentials: true, // Include cookies
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptors for error handling
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

**Custom Hooks with SWR:**
```typescript
// hooks/useTasks.ts
import useSWR from 'swr'
import { apiClient } from '@/lib/api-client'

export function useTasks(filters?: TaskFilters) {
  const { data, error, mutate } = useSWR(
    ['/api/tasks', filters],
    ([url, filters]) => apiClient.get(url, { params: filters }).then(res => res.data)
  )
  
  return {
    tasks: data?.docs || [],
    isLoading: !error && !data,
    isError: error,
    mutate
  }
}
```

### CSV Export Implementation

**API Route: `/api/export/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload/client'
import { getCurrentUser } from '@/lib/auth'
import { Parser } from 'json2csv'

export async function GET(request: NextRequest) {
  try {
    // 1. Authenticate user
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // 2. Check role permission
    if (!['admin', 'manager'].includes(user.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    
    // 3. Get collection from query params
    const searchParams = request.nextUrl.searchParams
    const collection = searchParams.get('collection') || 'tasks'
    
    // 4. Fetch data (access control automatically applied)
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection,
      limit: 1000, // Adjust as needed
      depth: 1 // Include relationships
    })
    
    // 5. Convert to CSV
    const parser = new Parser()
    const csv = parser.parse(result.docs)
    
    // 6. Return file
    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${collection}-${Date.now()}.csv"`
      }
    })
  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json({ error: 'Export failed' }, { status: 500 })
  }
}
```

**Frontend Export Button:**
```typescript
// components/features/reports/ExportButton.tsx
'use client'

export function ExportButton({ collection }: { collection: string }) {
  const [loading, setLoading] = useState(false)
  
  const handleExport = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/export?collection=${collection}`)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${collection}-${Date.now()}.csv`
      a.click()
    } catch (error) {
      console.error('Export failed:', error)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <Button onClick={handleExport} loading={loading}>
      Export to CSV
    </Button>
  )
}
```

---

## 🎨 UI/UX REQUIREMENTS

### Design System

**Color Palette:**
- Primary: Blue (#3B82F6) – actions, links
- Success: Green (#10B981) – approved, completed
- Warning: Yellow (#F59E0B) – pending, in progress
- Danger: Red (#EF4444) – rejected, critical
- Neutral: Gray scale for text and backgrounds

**Typography:**
- Font: Inter or System UI
- Headings: font-semibold
- Body: font-normal
- Code: font-mono

**Spacing:**
- Use Tailwind's spacing scale (4px base)
- Consistent padding/margin throughout

### Layout Requirements

**Sidebar Navigation:**
- Fixed on desktop (240px width)
- Collapsible on tablet/mobile
- Active route highlighted
- Icons + text labels
- User info at bottom

**Main Content Area:**
- Max width: 1400px
- Responsive padding
- Breadcrumb navigation
- Page title + actions

**Tables:**
- Sticky header on scroll
- Zebra striping (optional)
- Hover state on rows
- Action buttons in last column
- Pagination at bottom
- Mobile: Card view instead of table

**Forms:**
- Clear labels above inputs
- Inline validation errors
- Required field indicators (*)
- Submit + Cancel buttons
- Loading state during submission

### Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

**Mobile Adaptations:**
- Hamburger menu for navigation
- Stack form fields vertically
- Convert tables to cards
- Bottom sheet for modals
- Touch-friendly button sizes (min 44px)

### Accessibility (WCAG 2.1 AA)

- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Focus indicators visible
- Color contrast ratios met
- Screen reader friendly
- Skip to main content link

### Loading & Error States

**Loading:**
- Skeleton screens for initial load
- Spinner for actions
- Progress bar for uploads
- Disable buttons during loading

**Empty States:**
- Friendly message
- Illustration (optional)
- Call-to-action button
- Example: "No tasks yet. Create your first task!"

**Error States:**
- Clear error message
- Retry button
- Contact support link (if critical)
- Toast notifications for non-critical errors

### Dark Mode (Optional)

- Toggle in user menu
- Persist preference in localStorage
- Use Tailwind's dark: variant
- Adjust colors for readability

---

## 🚀 DEVELOPMENT ROADMAP

### Phase 1: Foundation (Week 1)

**Day 1-2: Project Setup**
- [ ] Initialize Next.js 14 with TypeScript
- [ ] Install and configure Tailwind CSS
- [ ] Install Payload CMS dependencies
- [ ] Set up MongoDB/PostgreSQL database
- [ ] Configure environment variables
- [ ] Set up ESLint and Prettier
- [ ] Initialize Git repository

**Day 3-4: Authentication & Users**
- [ ] Configure Payload auth in payload.config.ts
- [ ] Create Users collection with role field
- [ ] Implement basic access control (admin only)
- [ ] Build login page UI
- [ ] Test authentication flow
- [ ] Create seed script for initial admin user

**Day 5-7: Core Collections**
- [ ] Define Employees collection with fields and access control
- [ ] Define Projects collection with relationships
- [ ] Define Tasks collection with full specifications
- [ ] Define LeaveRequests collection
- [ ] Test all access control rules
- [ ] Seed sample data for testing

### Phase 2: Backend & Access Control (Week 2)

**Day 8-10: Granular Permissions**
- [ ] Implement all access control functions
- [ ] Create reusable access helpers (isAdmin, isManager, etc.)
- [ ] Add field-level access control
- [ ] Implement Payload hooks (beforeChange, afterRead)
- [ ] Add validation logic (date ranges, overlaps)
- [ ] Test all permission scenarios

**Day 11-14: Payload Admin Panel**
- [ ] Configure Payload admin UI
- [ ] Customize collection list views
- [ ] Add custom fields and components
- [ ] Test CRUD operations as different roles
- [ ] Document admin panel usage

### Phase 3: Frontend Foundation (Week 3)

**Day 15-17: Layout & Navigation**
- [ ] Create dashboard layout with Sidebar + Navbar
- [ ] Implement ProtectedRoute wrapper
- [ ] Build role-based navigation menu
- [ ] Add user dropdown with logout
- [ ] Implement responsive mobile menu
- [ ] Test authentication redirects

**Day 18-21: UI Component Library**
- [ ] Build generic UI components (Button, Input, Select, etc.)
- [ ] Create Table component with @tanstack/react-table
- [ ] Build Modal and Dialog components
- [ ] Create DatePicker component
- [ ] Build Badge and Card components
- [ ] Document component usage with Storybook (optional)

### Phase 4: Feature Pages (Week 4)

**Day 22-24: Dashboard & Employees**
- [ ] Build dashboard home with stat cards
- [ ] Create employees list page
- [ ] Build employee detail/edit page
- [ ] Implement employee form with validation
- [ ] Add role-based UI visibility
- [ ] Test as different user roles

**Day 25-28: Projects & Tasks**
- [ ] Build projects list page
- [ ] Create project detail/edit pages
- [ ] Build tasks list with filters
- [ ] Create task detail/edit pages
- [ ] Implement task status updates
- [ ] Add assignee selection (Manager only)

### Phase 5: Leave Management & Reports (Week 5)

**Day 29-31: Leave Requests**
- [ ] Build leave requests list page
- [ ] Create leave request form
- [ ] Implement approval/rejection flow
- [ ] Add validation (date ranges, overlaps)
- [ ] Build leave calendar view (optional)
- [ ] Test approval workflow

**Day 32-35: Reports & Export**
- [ ] Build reports page with metrics
- [ ] Implement CSV export API route
- [ ] Add export buttons for each collection
- [ ] Create charts/visualizations (optional)
- [ ] Test export functionality
- [ ] Add role-based report access

### Phase 6: Polish & Testing (Week 6)

**Day 36-38: UI/UX Polish**
- [ ] Implement loading states everywhere
- [ ] Add error boundaries
- [ ] Create empty states
- [ ] Add toast notifications
- [ ] Improve mobile responsiveness
- [ ] Add dark mode (optional)

**Day 39-42: Testing & Bug Fixes**
- [ ] Test all user flows as Admin
- [ ] Test all user flows as Manager
- [ ] Test all user flows as Employee
- [ ] Fix identified bugs
- [ ] Optimize performance
- [ ] Add error logging

### Phase 7: Deployment (Week 7)

**Day 43-45: Deployment Preparation**
- [ ] Set up production database
- [ ] Configure environment variables for production
- [ ] Optimize build configuration
- [ ] Set up error monitoring (Sentry)
- [ ] Create deployment documentation

**Day 46-49: Deploy & Monitor**
- [ ] Deploy to Vercel/Railway
- [ ] Run database migrations
- [ ] Seed production data
- [ ] Test production deployment
- [ ] Monitor for errors
- [ ] Create user documentation

---

## 🔧 TECHNICAL STACK & DEPENDENCIES

### Core Dependencies

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "payload": "^2.20.0",
    "@payloadcms/db-mongodb": "^2.20.0",
    "@payloadcms/richtext-slate": "^2.20.0",
    "typescript": "^5.4.0",
    
    "@tanstack/react-table": "^8.13.0",
    "@tanstack/react-query": "^5.28.0",
    "swr": "^2.2.5",
    "axios": "^1.6.8",
    
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    
    "zod": "^3.22.4",
    "react-hook-form": "^7.51.0",
    "@hookform/resolvers": "^3.3.4",
    
    "json2csv": "^6.0.0",
    "date-fns": "^3.6.0",
    "clsx": "^2.1.0",
    "lucide-react": "^0.363.0"
  },
  "devDependencies": {
    "@types/node": "^20.12.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0",
    "prettier": "^3.2.5",
    "prettier-plugin-tailwindcss": "^0.5.13"
  }
}
```

### Environment Variables

**Development (.env.local):**
```bash
# Database
DATABASE_URI=mongodb://localhost:27017/internal-dashboard
# or for PostgreSQL:
# DATABASE_URI=postgresql://user:password@localhost:5432/internal-dashboard

# Payload
PAYLOAD_SECRET=your-secret-key-min-32-chars
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000

# Next.js
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NODE_ENV=development
```

**Production (.env.production):**
```bash
# Database (MongoDB Atlas or managed PostgreSQL)
DATABASE_URI=mongodb+srv://user:password@cluster.mongodb.net/internal-dashboard

# Payload
PAYLOAD_SECRET=your-production-secret-key
PAYLOAD_PUBLIC_SERVER_URL=https://yourdomain.com

# Next.js
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
NODE_ENV=production

# Optional: Error tracking
SENTRY_DSN=your-sentry-dsn
```

### Database Choice Recommendation

**MongoDB (Recommended for this project):**
- ✅ Easier setup with Payload
- ✅ Flexible schema (good for evolving requirements)
- ✅ Built-in relationship handling
- ✅ Free tier on MongoDB Atlas
- ❌ Less strict data validation

**PostgreSQL (Alternative):**
- ✅ Stronger data integrity
- ✅ Better for complex queries
- ✅ ACID compliance
- ❌ More complex Payload setup
- ❌ Requires migrations

**Recommendation:** Start with MongoDB for faster development, migrate to PostgreSQL later if needed.

---

## 🚢 DEPLOYMENT STRATEGY

### Option 1: Vercel (Recommended for Integrated Architecture)

**Advantages:**
- Zero-config Next.js deployment
- Automatic HTTPS and CDN
- Preview deployments for PRs
- Serverless functions included
- Free tier available

**Setup Steps:**
1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy

**Vercel Configuration (vercel.json):**
```json
{
  "buildCommand": "next build",
  "outputDirectory": ".next",
  "env": {
    "DATABASE_URI": "@database-uri",
    "PAYLOAD_SECRET": "@payload-secret"
  }
}
```

### Option 2: Railway (Alternative)

**Advantages:**
- Supports both Next.js and standalone Node.js
- Built-in database hosting
- Simple pricing
- Good for monorepo or decoupled architecture

**Setup:**
1. Create Railway project
2. Add MongoDB/PostgreSQL service
3. Deploy Next.js app
4. Link database to app

### Option 3: DigitalOcean App Platform

**Advantages:**
- Predictable pricing
- Full control over resources
- Good for production workloads

### Database Hosting

**MongoDB Atlas (Recommended):**
- Free tier: 512MB storage
- Automatic backups
- Global clusters
- Easy connection string

**Supabase (for PostgreSQL):**
- Free tier: 500MB database
- Built-in auth (can replace Payload auth)
- Real-time subscriptions
- REST API included

### Deployment Checklist

**Pre-Deployment:**
- [ ] Set all environment variables
- [ ] Test production build locally (`npm run build && npm start`)
- [ ] Run database migrations (if using PostgreSQL)
- [ ] Seed initial admin user
- [ ] Set up error monitoring (Sentry)
- [ ] Configure CORS if using decoupled architecture

**Post-Deployment:**
- [ ] Verify all pages load correctly
- [ ] Test authentication flow
- [ ] Test role-based access control
- [ ] Verify CSV export works
- [ ] Check database connections
- [ ] Monitor error logs
- [ ] Set up uptime monitoring

**Security Hardening:**
- [ ] Use strong PAYLOAD_SECRET (min 32 chars)
- [ ] Enable HTTPS only
- [ ] Set secure cookie flags
- [ ] Implement rate limiting (optional)
- [ ] Add CSRF protection
- [ ] Configure Content Security Policy headers

### CI/CD Pipeline (Optional)

**GitHub Actions Example:**
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - run: npm test
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 🎤 INTERVIEW EXPLANATION GUIDE

### 30-Second Elevator Pitch

> "I built a full-stack internal management dashboard using Next.js 14 and Payload CMS. It's a role-based system where admins, managers, and employees have different permissions for managing projects, tasks, and leave requests. The key challenge was implementing granular access control at both the API and UI levels, which I solved using Payload's built-in access control functions combined with Next.js server components for secure data fetching."

### 2-Minute Technical Overview

> "This is an enterprise-grade internal tool dashboard built with modern web technologies. I chose Next.js 14 with the App Router for its server component capabilities, which allow me to fetch data directly from the database without exposing API endpoints. Payload CMS serves as both the backend and authentication layer, providing a powerful access control system out of the box.
>
> The architecture consists of five main collections: Users, Employees, Projects, Tasks, and Leave Requests. Each collection has granular access control rules that check the user's role and document ownership. For example, employees can only see tasks assigned to them, while managers can see all tasks and approve leave requests.
>
> On the frontend, I used Tailwind CSS for styling and built a comprehensive component library including reusable tables, forms, and modals. The dashboard is fully responsive and includes features like CSV export, real-time status updates, and role-based navigation.
>
> Security was a top priority. All permissions are enforced at the backend level using Payload's access control functions, and the frontend conditionally renders UI elements based on the user's role. I also implemented proper authentication flows, secure session management, and field-level access control for sensitive data like employee salaries."

### Key Technical Talking Points

**1. Architecture Decision:**
- "I chose an integrated architecture with Payload embedded in Next.js for simpler deployment and reduced latency. This allows server components to access the database directly via Payload's local API."

**2. Access Control Implementation:**
- "Every collection has four access control functions: read, create, update, and delete. These functions receive the request context including the authenticated user, and return either a boolean or a query constraint. For example, the Tasks read function returns `{ assignedTo: { equals: user.id } }` for employees, which Payload automatically applies to all queries."

**3. Data Fetching Strategy:**
- "I leveraged Next.js server components for initial page loads, fetching data directly via Payload's local API. For interactive features like forms and real-time updates, I used client components with SWR for caching and optimistic updates."

**4. Type Safety:**
- "Payload auto-generates TypeScript types from the collection schemas, which I use throughout the frontend. This ensures type safety from database to UI and catches errors at compile time."

**5. CSV Export Feature:**
- "The export functionality is implemented as a Next.js API route that verifies the user's role, fetches data using Payload's API (which automatically applies access control), converts it to CSV using json2csv, and returns it as a downloadable file."

### Common Interview Questions & Answers

**Q: Why did you choose Payload CMS over building a custom backend?**
> "Payload provides a production-ready authentication system, admin panel, and access control layer out of the box. This saved weeks of development time and reduced security risks. It's also highly customizable, so I could implement complex business logic through hooks and access functions."

**Q: How do you handle role-based permissions?**
> "Permissions are enforced at two levels. The backend uses Payload's access control functions that run on every database query, ensuring security even if someone bypasses the UI. The frontend conditionally renders components based on the user's role for better UX. I never rely on frontend checks alone for security."

**Q: What would you improve if you had more time?**
> "I would add real-time notifications using WebSockets, implement audit logs to track all data changes, add more advanced reporting with charts and dashboards, implement file uploads for task attachments, and add comprehensive unit and integration tests."

**Q: How does this scale?**
> "The architecture is designed for scalability. Payload handles database queries efficiently with proper indexing. Next.js server components reduce client-side JavaScript. For larger scale, I could add Redis for caching, implement database read replicas, and use a CDN for static assets. The modular component structure also makes it easy to add new features."

**Q: How do you ensure data security?**
> "Security is multi-layered: strong authentication with secure session management, granular access control at the database level, field-level permissions for sensitive data, HTTPS-only in production, secure environment variable management, and input validation using Zod schemas. I also follow OWASP best practices for web security."

---

## 📚 ADDITIONAL FEATURES (FUTURE ENHANCEMENTS)

### Phase 8: Advanced Features (Optional)

**Real-Time Notifications:**
- WebSocket integration for live updates
- Toast notifications for task assignments
- Email notifications for leave approvals
- In-app notification center

**Audit Logs:**
- Track all CRUD operations
- Store user, timestamp, action, and changes
- Admin-only audit log viewer
- Export audit logs to CSV

**Advanced Reporting:**
- Interactive charts (Chart.js or Recharts)
- Employee performance metrics
- Project timeline visualization (Gantt chart)
- Leave calendar heatmap
- Custom report builder

**File Uploads:**
- Task attachments
- Employee documents (contracts, IDs)
- Project files
- S3 or Cloudinary integration

**Comments & Collaboration:**
- Task comments with mentions
- Project discussions
- Rich text editor
- File attachments in comments

**Search & Filters:**
- Global search across all collections
- Advanced filters (date ranges, multiple statuses)
- Saved filter presets
- Search history

**Mobile App:**
- React Native companion app
- Push notifications
- Offline mode
- Camera integration for document uploads

**Integrations:**
- Slack notifications
- Google Calendar sync
- Email integration (SendGrid)
- SSO (Google, Microsoft)

**Analytics Dashboard:**
- User activity tracking
- Feature usage metrics
- Performance monitoring
- Custom KPIs

---

## 🎯 YOUR INSTRUCTIONS (HOW TO USE THIS PROMPT)

### Step 1: Initial Architecture Discussion

When I provide this prompt, first respond with:

1. **Architecture Recommendation:**
   - Should we use integrated (Payload in Next.js) or decoupled (separate repos)?
   - Explain pros/cons of each approach
   - Recommend one based on my use case

2. **Database Choice:**
   - MongoDB vs PostgreSQL comparison
   - Recommend one with reasoning

3. **High-Level Architecture Diagram:**
   - Text-based diagram showing:
     - User → Frontend → Backend → Database flow
     - Authentication flow
     - Data fetching patterns

4. **Development Timeline:**
   - Realistic estimate (e.g., 6-8 weeks)
   - Key milestones
   - Risk factors

**Wait for my approval before proceeding.**

---

### Step 2: Detailed Planning

After I approve the architecture, provide:

1. **Complete Folder Structure:**
   - Every file with its path and purpose
   - Organized by feature/concern
   - Include configuration files

2. **Collection Schemas:**
   - Full TypeScript code for each Payload collection
   - All fields with types and validation
   - Complete access control functions
   - Hooks for business logic

3. **Component Specifications:**
   - List of all components to build
   - Props interface for each
   - Responsibilities and features

4. **Page-by-Page Breakdown:**
   - Route, purpose, access level
   - Data fetching strategy
   - Key components used

**Wait for my approval before generating code.**

---

### Step 3: Incremental Code Generation

Generate code in this order (one section per request):

1. **Project Setup:**
   - package.json with all dependencies
   - Configuration files (next.config.js, tailwind.config.js, tsconfig.json)
   - Environment variable template
   - Initial folder structure

2. **Payload Configuration:**
   - payload.config.ts
   - All collection files (Users, Employees, Projects, Tasks, LeaveRequests)
   - Access control helper functions
   - Seed script

3. **Authentication & Utilities:**
   - lib/auth.ts (getCurrentUser, requireAuth, etc.)
   - lib/permissions.ts (frontend permission helpers)
   - lib/constants.ts (roles, statuses)
   - lib/utils.ts (date formatting, etc.)

4. **UI Component Library:**
   - Layout components (Sidebar, Navbar, ProtectedRoute)
   - Generic UI components (Button, Input, Table, Modal, etc.)
   - Feature components (StatCard, TaskStatusBadge, etc.)

5. **Pages (one feature at a time):**
   - Login page
   - Dashboard home
   - Employees pages
   - Projects pages
   - Tasks pages
   - Leave pages
   - Reports page

6. **API Routes:**
   - Export endpoint
   - Any additional endpoints

7. **Final Polish:**
   - Loading states
   - Error boundaries
   - Empty states
   - Responsive design fixes

---

### Step 4: Testing & Deployment Guidance

After code is complete, provide:

1. **Testing Checklist:**
   - User flows to test for each role
   - Edge cases to verify
   - Security tests

2. **Deployment Guide:**
   - Step-by-step deployment instructions
   - Environment variable setup
   - Database configuration
   - Post-deployment verification

3. **Documentation:**
   - README.md with setup instructions
   - API documentation
   - User guide for each role

---

## 🔧 DEVELOPMENT RULES (CRITICAL)

**Code Quality Standards:**
- ✅ Use TypeScript everywhere (no `any` types)
- ✅ Write clean, self-documenting code
- ✅ Add comments for complex logic only
- ✅ Follow Next.js and React best practices
- ✅ Use proper error handling (try-catch, error boundaries)
- ✅ Implement loading states for all async operations
- ✅ Make components reusable and composable
- ✅ Keep files under 300 lines (split if larger)

**Security Requirements:**
- ✅ Never trust frontend validation alone
- ✅ Always enforce permissions at backend
- ✅ Sanitize user inputs
- ✅ Use parameterized queries (Payload handles this)
- ✅ Implement rate limiting for sensitive endpoints
- ✅ Use HTTPS in production
- ✅ Store secrets in environment variables

**Performance Optimization:**
- ✅ Use server components by default
- ✅ Implement proper caching strategies
- ✅ Optimize images (next/image)
- ✅ Lazy load heavy components
- ✅ Minimize client-side JavaScript
- ✅ Use database indexes for frequent queries

**Accessibility:**
- ✅ Semantic HTML elements
- ✅ ARIA labels where needed
- ✅ Keyboard navigation support
- ✅ Focus indicators
- ✅ Color contrast compliance
- ✅ Screen reader friendly

---

## 🚀 LET'S BEGIN!

I'm ready to build this project. Please start with **Step 1: Initial Architecture Discussion**.

Analyze my requirements and provide:
1. Architecture recommendation (integrated vs decoupled)
2. Database choice recommendation
3. High-level architecture diagram
4. Development timeline estimate

Then wait for my approval before proceeding to detailed planning.

---

## 📝 NOTES FOR THE AI

- **Be a mentor, not just a code generator.** Explain WHY behind every decision.
- **Don't skip steps.** If I ask for a specific file, provide the complete, working code.
- **Ask clarifying questions** if requirements are ambiguous.
- **Provide alternatives** when there are multiple valid approaches.
- **Think about real-world usage** – this will be deployed and used by actual users.
- **Prioritize security and scalability** over quick hacks.
- **Keep responses focused** – don't generate everything at once.
- **Use code blocks with proper syntax highlighting.**
- **Include import statements** in all code examples.
- **Test your logic** – make sure the code you provide would actually work.

---

**END OF ULTIMATE MASTER PROMPT**

*This prompt is designed to guide you through building a complete, production-ready internal dashboard. Follow the steps, ask questions, and let's build something amazing together!*
