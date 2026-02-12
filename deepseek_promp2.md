# 🔥 ULTIMATE MASTER PROMPT — INTERNAL TOOL DASHBOARD  
**Decoupled Architecture: Next.js (Frontend) + Payload CMS (Backend)**  
*Full‑stack, production‑ready blueprint with separate frontend/backend folders, detailed file trees, and complete page/collection definitions.*

---

Copy and paste the entire block below into any AI assistant. This prompt transforms the AI into your **Senior Solution Architect**. It will generate every file, explain every decision, and guide you through building a **decoupled** internal dashboard with **Next.js frontend** and **Payload CMS backend**.

```markdown
You are a Senior Full‑Stack Architect and Technical Lead.

I need you to design a **complete, production‑ready blueprint** for an Internal Tool Dashboard using a **decoupled architecture**:

- **Frontend**: Next.js 14+ (App Router, TypeScript, Tailwind CSS) – standalone project.
- **Backend**: Payload CMS – standalone project (runs separately, provides REST/GraphQL API).
- **Database**: MongoDB or PostgreSQL (your choice; be consistent).
- **Communication**: Frontend consumes Payload’s REST API (authenticated via HTTP‑only cookies or JWT).

The system must manage Employees, Projects, Tasks, and Leave Requests with **role‑based access control** (Admin, Manager, Employee) and include a **secure CSV export** feature.

---

## 📁 ROOT FOLDER STRUCTURE (Mandatory)

```
internal-dashboard/
├── frontend/          # Next.js application
└── backend/           # Payload CMS application
```

You **must** provide a separate, detailed folder and file tree for **both** `frontend/` and `backend/`. Every important file must be listed with its **exact path** and a **brief description** of its purpose.

---

## 🎯 PROJECT REQUIREMENTS (NON‑NEGOTIABLE)

### 👥 User Roles & Permissions
- **Admin** – Full access to all collections, can manage users.
- **Manager** – Read all data, manage projects/tasks, approve/reject leave, view reports, export CSV.
- **Employee** – Read only own tasks, update own task status, create/read own leave requests.

**Permissions must be enforced in two places:**
1. **Backend (Payload Access Control)** – the real security.
2. **Frontend (UI conditional rendering)** – for user experience.

### 📦 Backend (Payload) Collections
1. `users` – Extend Payload auth; add `name` (text) and `role` (select: admin, manager, employee).
2. `employees` – `user` (relationship to `users`), `department` (text), `status` (select).
3. `projects` – `name` (text), `description` (textarea), `manager` (relationship to `users`).
4. `tasks` – `title` (text), `project` (relationship to `projects`), `assignedTo` (relationship to `users`), `status` (select).
5. `leave-requests` – `employee` (relationship to `users`), `startDate` (date), `endDate` (date), `reason` (textarea), `status` (select).

All relationships must be properly configured.

### 🔐 Backend Access Control (Payload)
For **each collection**, define granular `access` functions. Provide full code examples for:
- `read` – Admin/Manager see all; Employees see only self‑related documents.
- `create` – Admin/Manager can create; Employees can create only their own leave requests.
- `update` – Admin/Manager full; Employees can update only their own tasks (status) and pending leave requests.
- `delete` – Admin only (or Manager for some collections – explain your choice).

### 🖥️ Frontend (Next.js) Pages & Routes
Build the following pages inside `frontend/app/` using **App Router**:

| Route                      | Page                 | Access               | Description |
|----------------------------|----------------------|----------------------|-------------|
| `/login`                   | `login/page.tsx`     | Public               | Login form, authenticates via Payload API. |
| `/dashboard`               | `dashboard/page.tsx` | All authenticated    | Home with stat cards (total employees, tasks, pending leaves). |
| `/dashboard/employees`     | `employees/page.tsx` | Admin, Manager       | List employees; Admin can add/edit/delete. |
| `/dashboard/projects`      | `projects/page.tsx`  | Admin, Manager       | List projects; full CRUD for Admin/Manager. |
| `/dashboard/tasks`         | `tasks/page.tsx`     | All                  | List tasks (filtered by role). Employees see only their own. Status update allowed. |
| `/dashboard/tasks/[id]`    | `tasks/[id]/page.tsx`| All (with ownership) | Task detail/edit page. |
| `/dashboard/leave`         | `leave/page.tsx`     | All                  | List leave requests (filtered by role). Employees can create new request. |
| `/dashboard/leave/new`     | `leave/new/page.tsx` | Employee             | Form to submit leave request. |
| `/dashboard/reports`       | `reports/page.tsx`   | Manager, Admin       | Manager dashboard with summary and CSV export button. |
| `/api/export`              | `api/export/route.ts`| Manager, Admin       | Serverless function that fetches data from Payload and returns CSV. |

All dashboard pages must be protected by authentication (redirect to `/login` if not logged in). Use **server components** where possible, fetching data via Payload REST API.

### 🧩 Frontend Components & Utilities
Provide a **complete component library** (Tailwind CSS, TypeScript) including:

- `Layout/Sidebar.tsx` – navigation links (role‑based visibility).
- `Layout/Navbar.tsx` – user info, logout.
- `Layout/ProtectedRoute.tsx` – auth guard.
- `UI/Table.tsx` – reusable table using `@tanstack/react-table`.
- `UI/StatCard.tsx` – metric card.
- `UI/Button.tsx`, `UI/Modal.tsx`, `UI/FormInput.tsx`, `UI/Select.tsx`.
- `Features/Tasks/TaskStatusBadge.tsx`, `Features/Tasks/TaskAssigneeSelect.tsx`.
- `Features/Leave/LeaveStatusBadge.tsx`, `Features/Leave/LeaveApprovalButtons.tsx`.

Also include:
- Custom hooks: `useAuth()`, `useUsers()`, `useTasks()`, etc. (using SWR or TanStack Query).
- API service layer: `lib/api/client.ts` – configured Axios instance with baseURL, credentials.
- TypeScript types: `types/payload-types.ts` (generated from Payload), plus custom frontend types.

### 📡 API Integration (Frontend to Backend)
- Use **Axios** or **fetch** to communicate with Payload REST API.
- Authentication: After login, Payload returns an HTTP‑only cookie; subsequent requests include it automatically (if `credentials: 'include'` is set).
- Provide a **centralised API client** with interceptors for error handling.

### 📊 Export Feature
- Frontend API route (`/api/export`) that:
  - Verifies the user is authenticated and has `manager` or `admin` role.
  - Fetches requested collection from Payload backend.
  - Converts to CSV using `json2csv`.
  - Returns downloadable file.

### 🚀 Deployment Strategy
- **Frontend**: Deploy to Vercel.
- **Backend**: Deploy to a Node.js host (e.g., Railway, Render, DigitalOcean) or Vercel (if using Payload inside Next.js, but here we are decoupled – explain both options and recommend one).
- **Database**: MongoDB Atlas / Supabase.
- **Environment variables**: Provide a full list for both frontend and backend.

---

## 📋 YOUR TASKS (WHAT TO GENERATE)

1. **High‑Level Architecture** – Describe how frontend and backend communicate, auth flow, data flow.
2. **Folder Structure** – Provide a **detailed tree** for both `frontend/` and `backend/` with **every important file** and its role.
3. **Backend Implementation**  
   - Payload config file (`payload.config.ts`) with all collections registered.  
   - Each collection file (Users, Employees, Projects, Tasks, LeaveRequests) with **full TypeScript code** including fields and access control.  
   - Reusable access control helpers in `backend/src/access/`.  
   - Seed script (optional but recommended).  
4. **Frontend Implementation**  
   - All pages listed above – provide **example code** for key pages (e.g., Dashboard, Tasks, Reports).  
   - All components listed – provide **key component examples** (Table, Sidebar, etc.).  
   - API client and service functions.  
   - Custom hooks for data fetching.  
5. **Permission Matrix** – A table showing exactly what each role can do on each collection (backend) and which UI elements they see (frontend).  
6. **Development Order** – A step‑by‑step plan to build the project from scratch.  
7. **Interview Explanation** – A concise, impressive summary of the project to present in interviews.  

---

## 🔧 RULES FOR YOU (THE AI)

- **Act as a Senior Architect** – think about scalability, security, maintainability, and clean code.  
- **Provide code blocks in TypeScript** with proper imports/exports.  
- **Explain every design decision** – why you structure things this way, why you chose certain access rules, why you used certain libraries.  
- **Never skip steps** – show full file content for critical files.  
- **Assume I am a developer with basic Next.js knowledge but new to Payload.** Teach me like a senior mentor.  
- **Do not generate the entire project in one response.** First provide the architecture, folder structure, and development plan. Then wait for my command to generate specific files.  

---

## 🎯 INITIAL REQUEST

Start by giving me:

1. **Architecture overview** (diagram in text) – how frontend and backend interact, authentication flow.  
2. **Complete folder/file tree** for both `frontend/` and `backend/` – with meaningful file names and one‑line descriptions.  
3. **Development phase plan** – what to build first, second, third, etc.  

Then I will ask you to generate specific parts (collections, pages, components, etc.) one by one.
```

---

# 🚀 WHY THIS PROMPT IS ULTIMATE

- **Decoupled by design** – forces separate frontend/backend folders.  
- **Complete blueprint** – from folder structure to file‑level details.  
- **Production‑ready** – includes auth, permissions, CSV export, deployment.  
- **Role‑based everything** – backend access control + frontend conditional UI.  
- **Scalable** – clean separation of concerns.  
- **AI‑optimised** – gives clear, actionable instructions; the AI will act as a senior architect and not skip steps.  

---

**Copy the block above, paste it into your AI, and watch it build your project blueprint step by step.**  

Good luck, architect. 🏗️