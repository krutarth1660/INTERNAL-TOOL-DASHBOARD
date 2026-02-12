# 🔥 ULTIMATE PROJECT BLUEPRINT — INTERNAL TOOL DASHBOARD  
**Next.js (App Router) + Payload CMS + Tailwind CSS**  
*Complete file & folder structure, page definitions, backend collections, permissions, and component breakdown.*

---

## 📌 PROJECT DEFINITION

**Internal Tool Dashboard** – a secure, role‑based web application for managing employees, projects, tasks, and leave requests.  
Built with **Next.js 14+** (App Router, TypeScript) as the frontend, **Payload CMS** as the self‑hosted backend and authentication layer, and **Tailwind CSS** for styling.  
The system enforces **granular permissions** at both API and UI levels, and provides **CSV export** via a serverless function.

---

# 🧱 PART 1 — FULL PROJECT STRUCTURE (FILES & FOLDERS)

```
internal-dashboard/
│
├── .env.local
├── .eslintrc.json
├── .gitignore
├── next.config.js
├── package.json
├── tailwind.config.js
├── tsconfig.json
│
├── app/                                 # Next.js App Router
│   ├── (auth)/
│   │   └── login/
│   │       └── page.tsx               # Login page (public)
│   │
│   ├── (dashboard)/
│   │   ├── layout.tsx                # Dashboard layout (Sidebar + Navbar)
│   │   ├── page.tsx                 # Dashboard home (stat cards)
│   │   │
│   │   ├── employees/
│   │   │   └── page.tsx            # Employees list (Admin/Manager)
│   │   │
│   │   ├── projects/
│   │   │   └── page.tsx            # Projects list (Admin/Manager)
│   │   │
│   │   ├── tasks/
│   │   │   ├── page.tsx            # Tasks list (all users, filtered by role)
│   │   │   └── [id]/
│   │   │       └── page.tsx        # Task detail/edit (optional)
│   │   │
│   │   ├── leave/
│   │   │   ├── page.tsx            # Leave requests list & form
│   │   │   └── new/
│   │   │       └── page.tsx        # Submit new leave request (Employee)
│   │   │
│   │   └── reports/
│   │       └── page.tsx            # Manager-only reports & export
│   │
│   ├── api/                          # Next.js API routes (serverless)
│   │   └── export/
│   │       └── route.ts            # CSV export endpoint
│   │
│   └── payload/                      # Payload Admin panel (mounted route)
│       └── [[...segments]]/
│           └── page.tsx            # Payload admin UI
│
├── components/                        # Reusable UI components
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── Navbar.tsx
│   │   └── ProtectedRoute.tsx
│   │
│   ├── ui/
│   │   ├── Table.tsx               # Generic table with tanstack/react-table
│   │   ├── StatCard.tsx
│   │   ├── Button.tsx
│   │   ├── Modal.tsx
│   │   ├── FormInput.tsx
│   │   └── Select.tsx
│   │
│   └── features/                    # Feature-specific components
│       ├── tasks/
│       │   ├── TaskStatusBadge.tsx
│       │   └── TaskAssigneeSelect.tsx
│       └── leave/
│           ├── LeaveStatusBadge.tsx
│           └── LeaveApprovalButtons.tsx
│
├── lib/                              # Utilities & shared logic
│   ├── payload/
│   │   ├── client.ts               # Payload local API client (for server components)
│   │   └── config.ts               # Payload config (imported from root)
│   │
│   ├── auth.ts                     # Auth helpers (getCurrentUser, requireRole)
│   ├── permissions.ts              # Frontend permission helpers
│   ├── constants.ts               # App constants (roles, statuses)
│   └── utils.ts                   # Misc helpers (date formatting, etc.)
│
├── payload/                         # Payload CMS backend configuration
│   ├── payload.config.ts           # Main Payload config
│   ├── collections/                # All Payload collections
│   │   ├── Users.ts
│   │   ├── Employees.ts
│   │   ├── Projects.ts
│   │   ├── Tasks.ts
│   │   └── LeaveRequests.ts
│   │
│   └── access/                     # Reusable access control functions
│       ├── isAdmin.ts
│       ├── isManager.ts
│       ├── isSelf.ts
│       └── or.ts                  # Logical composition helpers
│
├── public/                          # Static assets
│   └── favicon.ico
│
├── styles/
│   └── globals.css                 # Tailwind imports
│
└── types/                           # Global TypeScript types
    ├── payload-types.ts           # Auto-generated Payload types
    └── index.ts                   # Custom types (UserRole, etc.)
```

**Total files (approx.):**  
- Next.js pages: **8** (7 dashboard pages + login)  
- API routes: **1**  
- Components: **10–15**  
- Lib/utils: **6**  
- Payload collections: **5**  
- Payload config & access: **6**  
- Configuration & type files: **~10**  

**Grand total: ~45–50 files** – clean, modular, production‑ready.

---

# 🗂️ PART 2 — PAGE‑BY‑PAGE DETAIL (FRONTEND)

| Page | Route | Purpose | Access | Main Components | Data Fetching |
|------|-------|---------|--------|-----------------|---------------|
| **Login** | `/login` | Authenticate user via Payload. Redirect to dashboard on success. | Public | Form, Button | Payload REST API |
| **Dashboard Home** | `/dashboard` | Overview cards: total employees, active projects, pending tasks, leave requests. | All authenticated | StatCard, QuickLinks | Server component → Payload local API |
| **Employees** | `/dashboard/employees` | List all employees. Admin can add/edit/delete; Manager read‑only. | Admin, Manager | Table, Modal, Form | Server component → Payload local API |
| **Projects** | `/dashboard/projects` | List all projects. Admin/Manager full CRUD. | Admin, Manager | Table, Modal, Form | Server component → Payload local API |
| **Tasks** | `/dashboard/tasks` | View tasks. Admin/Manager see all; Employee sees only assigned. Status update allowed. | All | Table, TaskStatusBadge, AssigneeSelect | Server component with role‑filtered query |
| **Task Detail** (optional) | `/dashboard/tasks/[id]` | Detailed view/edit of a task. | All (with ownership/perms) | Form, StatusSelect | Server component |
| **Leave Requests** | `/dashboard/leave` | List all leave requests. Admin/Manager see all; Employee sees own. Managers can approve/reject. | All | Table, LeaveStatusBadge, ApprovalButtons | Server component with role‑filtered query |
| **New Leave Request** | `/dashboard/leave/new` | Form for employee to submit leave request. | Employee | Form, DatePicker | Client component → API or Payload |
| **Reports** | `/dashboard/reports` | Manager dashboard: summary metrics, charts, export CSV button. | Manager only | StatCard, Button, Chart (optional) | Server component → Payload local API |

**Note:**  
- All pages inside `(dashboard)` are protected by a **layout‑level authentication check** (`ProtectedRoute` or middleware).  
- Role‑based UI: Sidebar links are conditionally rendered based on `user.role`.

---

# 🧩 PART 3 — PAYLOAD COLLECTIONS (BACKEND)

Each collection is defined in its own `.ts` file inside `/payload/collections/`.  
**All collections use TypeScript and include proper access control, fields, and hooks.**

| Collection | Slug | Description | Key Fields | Access Rules (Summary) |
|-----------|------|-------------|-----------|------------------------|
| **Users** | `users` | Extends Payload auth. Stores name and role. | `name` (text), `role` (select) | Admin full; Managers read‑only; Employees can update own name/password. |
| **Employees** | `employees` | Links User to department/status. | `user` (relationship), `department` (text), `status` (select) | Admin full; Managers read‑only; Employees can view own record. |
| **Projects** | `projects` | Company projects with a manager. | `name`, `description`, `manager` (rel to Users) | Admin/Manager full CRUD; Employees read‑only (all projects). |
| **Tasks** | `tasks` | Individual tasks assigned to users. | `title`, `project` (rel), `assignedTo` (rel), `status` | Admin/Manager full; Employees can read/update only their own tasks. |
| **LeaveRequests** | `leaveRequests` | Time‑off requests. | `employee` (rel), `startDate`, `endDate`, `reason`, `status` | Admin/Manager read/update all; Employees create/read own; Managers can approve/reject. |

**Each collection file exports a `CollectionConfig` object with:**  
- `slug`  
- `fields` (array)  
- `access` (object with `read`, `create`, `update`, `delete` functions)  
- `hooks` (optional: beforeChange, afterChange)  
- `admin` (optional: group, list columns, etc.)

---

# 🔐 PART 4 — PERMISSION MATRIX (DETAILED)

| Action / Collection | Admin | Manager | Employee |
|---------------------|-------|--------|----------|
| **Users** – read | ✅ all | ✅ all | ❌ (only self) |
| **Users** – create | ✅ | ❌ | ❌ |
| **Users** – update | ✅ all | ❌ | ✅ self |
| **Users** – delete | ✅ | ❌ | ❌ |
| **Employees** – read | ✅ all | ✅ all | ✅ own |
| **Employees** – create | ✅ | ❌ | ❌ |
| **Employees** – update | ✅ | ✅ (limited?) | ❌ |
| **Employees** – delete | ✅ | ❌ | ❌ |
| **Projects** – read | ✅ all | ✅ all | ✅ all |
| **Projects** – create | ✅ | ✅ | ❌ |
| **Projects** – update | ✅ | ✅ | ❌ |
| **Projects** – delete | ✅ | ❌ | ❌ |
| **Tasks** – read | ✅ all | ✅ all | ✅ assigned to self |
| **Tasks** – create | ✅ | ✅ | ❌ |
| **Tasks** – update | ✅ | ✅ | ✅ own task status |
| **Tasks** – delete | ✅ | ❌ | ❌ |
| **LeaveRequests** – read | ✅ all | ✅ all | ✅ own |
| **LeaveRequests** – create | ✅ | ✅ | ✅ self |
| **LeaveRequests** – update | ✅ | ✅ (approve/reject) | ✅ own pending requests |
| **LeaveRequests** – delete | ✅ | ❌ | ❌ |

**Frontend enforcement:** Navigation links, buttons, and page access are conditionally rendered using `user.role` checks, but **never rely on frontend alone** – all critical permissions are enforced in Payload access control.

---

# 🧰 PART 5 — COMPONENTS & THEIR RESPONSIBILITIES

| Component | Location | Purpose |
|-----------|----------|---------|
| **Sidebar** | `components/layout/Sidebar.tsx` | Renders navigation links based on role; uses `user` context. |
| **Navbar** | `components/layout/Navbar.tsx` | Shows user name, role, and logout button. |
| **ProtectedRoute** | `components/layout/ProtectedRoute.tsx` | HOC that redirects to `/login` if not authenticated. Wraps dashboard layout. |
| **Table** | `components/ui/Table.tsx` | Generic table using `@tanstack/react-table`. Accepts columns, data, sorting, pagination. |
| **StatCard** | `components/ui/StatCard.tsx` | Card displaying a metric (e.g., “12 Tasks”) with optional icon and trend. |
| **Button** | `components/ui/Button.tsx` | Reusable button with variants (primary, outline, danger) and loading state. |
| **Modal** | `components/ui/Modal.tsx` | Reusable modal for forms/confirmations. |
| **FormInput** | `components/ui/FormInput.tsx` | Wrapper for text inputs with label, error message. |
| **Select** | `components/ui/Select.tsx` | Wrapper for dropdowns. |
| **TaskStatusBadge** | `components/features/tasks/TaskStatusBadge.tsx` | Displays status with color coding. |
| **TaskAssigneeSelect** | `components/features/tasks/TaskAssigneeSelect.tsx` | Dropdown to change assignee (Admin/Manager only). |
| **LeaveStatusBadge** | `components/features/leave/LeaveStatusBadge.tsx` | Displays leave status (Pending, Approved, Rejected). |
| **LeaveApprovalButtons** | `components/features/leave/LeaveApprovalButtons.tsx` | Approve/Reject buttons (visible to Managers/Admins). |

---

# 📡 PART 6 — API ROUTES (SERVERLESS)

| Route | File | Method | Description | Auth |
|-------|------|--------|-------------|------|
| `/api/export` | `app/api/export/route.ts` | GET | Exports specified collection data (default Tasks) as CSV. | Requires `admin` or `manager` role. |

**Implementation details:**
- Extracts user from Payload auth cookie.
- Checks role permission.
- Uses Payload local API to fetch data.
- Converts to CSV via `json2csv`.
- Returns file with `Content-Disposition: attachment`.

---

# 🧠 PART 7 — UTILITIES & LIBRARIES

| File | Purpose |
|------|---------|
| `lib/payload/client.ts` | Initializes and exports Payload's local API client for server components. |
| `lib/payload/config.ts` | Imports Payload config; used by `client.ts`. |
| `lib/auth.ts` | Functions: `getCurrentUser()`, `requireAuth()`, `hasRole(role)`. |
| `lib/permissions.ts` | Frontend helpers: `canViewPage(user, page)`, `canPerformAction(user, resource, action)`. |
| `lib/constants.ts` | Role constants (`ADMIN`, `MANAGER`, `EMPLOYEE`), status options, date formats. |
| `lib/utils.ts` | `formatDate()`, `truncateText()`, `downloadCSV()`, etc. |
| `types/payload-types.ts` | Auto-generated from Payload schema (run `payload generate:types`). |
| `types/index.ts` | Custom interfaces: `UserWithRole`, `TaskWithRelations`, etc. |

---

# 🧭 PART 8 — NAVIGATION / MENU STRUCTURE

**Sidebar menu items** (conditionally rendered):

- **Dashboard** – Always visible.
- **Employees** – Only if role is `admin` or `manager`.
- **Projects** – Only if role is `admin` or `manager`.
- **Tasks** – Always visible (content filtered by role).
- **Leave Requests** – Always visible (content filtered by role).
- **Reports** – Only if role is `manager` or `admin`.

**Navbar:**  
- User name and role (e.g., “John Doe (Manager)”).  
- Logout button.

---

# 🏗️ PART 9 — DEVELOPMENT PHASES (STEP‑BY‑STEP ORDER)

1. **Initial Setup**  
   - Create Next.js app with TypeScript, Tailwind.  
   - Install Payload and integrate into Next.js (follow Payload docs).  
   - Set up environment variables (MongoDB/Postgres, Payload secret, etc.).  

2. **Authentication & Users**  
   - Create `Users` collection with `name` and `role`.  
   - Enable Payload auth.  
   - Build `/login` page.  
   - Test login, session persistence.  

3. **Base Collections (Employees, Projects)**  
   - Define schemas with basic fields.  
   - Implement Payload Admin UI access.  
   - Seed test data.  

4. **Tasks & LeaveRequests**  
   - Define collections with relationships.  
   - Add access control rules (simple start: admin only).  

5. **Role‑Based Access Control (Core)**  
   - Implement granular access functions in each collection.  
   - Test as different user roles.  

6. **Dashboard Layout & Pages**  
   - Create `(dashboard)` group, layout with Sidebar/Navbar.  
   - Implement `ProtectedRoute` wrapper.  
   - Build each page as server component, fetching data via Payload local API.  

7. **UI Components**  
   - Build `Table` component with tanstack/react-table.  
   - Build `StatCard`, `Modal`, forms.  
   - Integrate with pages.  

8. **Export Feature**  
   - Create `/api/export` route.  
   - Add export button on Reports page (managers only).  

9. **Polish & Testing**  
   - Responsive design (Tailwind).  
   - Error boundaries, loading states.  
   - Test all roles thoroughly.  

10. **Deployment**  
    - Deploy to Vercel.  
    - Configure database (MongoDB Atlas / Supabase).  

---

# 🎤 PART 10 — INTERVIEW EXPLANATION SCRIPT

> “I built a full‑stack internal dashboard using Next.js and Payload CMS. The goal was to replace spreadsheets with a secure, role‑aware system where admins, managers, and employees each have different views and permissions.  
>  
> I chose Payload because it gives me a customizable admin panel, authentication, and a powerful access control layer out of the box – all integrated into Next.js.  
>  
> The backend is composed of five collections (Users, Employees, Projects, Tasks, LeaveRequests). Every collection has its own access control functions that check the user’s role and document ownership. For example, an employee can only see tasks where `assignedTo` equals their user ID; a manager can see all tasks and approve leave requests.  
>  
> On the frontend, I used the App Router with server components to fetch data directly via Payload’s local API – this avoids extra network calls and keeps the UI fast. All pages are protected by a layout wrapper that checks authentication.  
>  
> I also implemented a serverless CSV export endpoint that verifies the user’s role before generating the file. This ensures that only managers and admins can download sensitive data.  
>  
> If I had more time, I would add real‑time notifications, audit logs, and chart visualizations. But the current version already demonstrates clean separation of concerns, strong security, and a polished UI.”

---

## ✅ THIS BLUEPRINT IS COMPLETE.

You now have:

- ✅ Full folder/file structure with names and purposes  
- ✅ Every frontend page, its route, purpose, and role access  
- ✅ Every backend collection, fields, and permission rules  
- ✅ Components and utilities with responsibilities  
- ✅ API route definition  
- ✅ Permission matrix in clear table format  
- ✅ Development order  
- ✅ Interview explanation  

**You can now use this document as your project specification.**  
Hand it to any developer (or AI) and they will build exactly what you described – without missing any part.

---

**Next step:**  
If you want, I can expand any section into a detailed task list, or provide the exact prompt to generate each file individually. Just tell me where to begin.



