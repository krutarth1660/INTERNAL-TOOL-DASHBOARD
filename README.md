# 🚀 Internal Tool Dashboard

A complete, production-ready Internal Tool Dashboard for HR & Project Management built with **Next.js 14** (frontend) and **Payload CMS** (backend).

## 📋 Project Overview

This is an enterprise-grade, role-based web application for managing:
- **Employees** - HR data and employee records
- **Projects** - Project planning and tracking
- **Tasks** - Task assignment and status management
- **Leave Requests** - Leave approval workflows

### Key Features

✅ **Role-Based Access Control** (Admin, Manager, Employee)  
✅ **Secure Authentication** with JWT tokens  
✅ **Granular Permissions** at API and UI levels  
✅ **CSV Export** functionality  
✅ **Responsive Design** with Tailwind CSS  
✅ **Type-Safe** with TypeScript  
✅ **Production-Ready** architecture

---

## 🏗️ Architecture

**Decoupled Architecture:**
- **Frontend**: Next.js 14 (App Router, React Server Components)
- **Backend**: Payload CMS (Express.js, MongoDB)
- **Communication**: REST API with JWT authentication

```
┌─────────────┐      HTTP/REST      ┌─────────────┐      ┌──────────┐
│   Next.js   │ ←─────────────────→ │  Payload    │ ←───→ │ MongoDB  │
│  Frontend   │   (JWT tokens)      │   Backend   │      │ Database │
└─────────────┘                     └─────────────┘      └──────────┘
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ installed
- **MongoDB** running locally or MongoDB Atlas account
- **npm** or **yarn** package manager

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd internal-dashboard
```

### 2. Setup Backend

```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Update .env with your MongoDB URI and secret key
# DATABASE_URI=mongodb://localhost:27017/internal-dashboard
# PAYLOAD_SECRET=your-secret-key-min-32-characters-long

# Seed the database
npm run seed

# Start backend server
npm run dev
```

Backend will run on: **http://localhost:4000**
- API: http://localhost:4000/api
- Admin Panel: http://localhost:4000/admin

### 3. Setup Frontend

```bash
cd ../frontend
npm install

# Create .env.local file
cp .env.local.example .env.local

# Update .env.local
# NEXT_PUBLIC_API_URL=http://localhost:4000/api

# Start frontend server
npm run dev
```

Frontend will run on: **http://localhost:3000**

---

## 🔑 Default Login Credentials

After seeding the database, use these credentials:

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@example.com | admin123 |
| **Manager** | manager@example.com | manager123 |
| **Employee** | employee1@example.com | employee123 |
| **Employee** | employee2@example.com | employee123 |

---

## 👥 User Roles & Permissions

### Admin
- Full system access
- Create/edit/delete users
- Manage all employees, projects, tasks
- View sensitive data (salaries)
- Export data to CSV

### Manager
- View all employees and projects
- Create and assign tasks
- Approve/reject leave requests
- Export reports
- Manage own projects

### Employee
- View assigned tasks
- Update task status
- Submit leave requests
- View own employee record
- Read-only access to assigned projects

---

## 📁 Project Structure

```
internal-dashboard/
│
├── backend/                    # Payload CMS Backend
│   ├── src/
│   │   ├── collections/       # Database collections
│   │   │   ├── Users.ts
│   │   │   ├── Employees.ts
│   │   │   ├── Projects.ts
│   │   │   ├── Tasks.ts
│   │   │   └── LeaveRequests.ts
│   │   ├── access/            # Access control functions
│   │   ├── hooks/             # Payload hooks
│   │   ├── seed/              # Database seeding
│   │   ├── payload.config.ts  # Payload configuration
│   │   └── server.ts          # Express server
│   └── package.json
│
└── frontend/                   # Next.js Frontend
    ├── app/
    │   ├── login/             # Login page
    │   ├── dashboard/         # Protected dashboard routes
    │   │   ├── page.tsx       # Dashboard home
    │   │   ├── employees/     # Employee management
    │   │   ├── projects/      # Project management
    │   │   ├── tasks/         # Task management
    │   │   ├── leave/         # Leave requests
    │   │   └── reports/       # Reports & export
    │   └── layout.tsx
    ├── components/
    │   ├── layout/            # Layout components
    │   └── ui/                # Reusable UI components
    ├── lib/                   # Utilities
    │   ├── api-client.ts      # Axios instance
    │   ├── auth.ts            # Auth service
    │   ├── permissions.ts     # Permission helpers
    │   └── utils.ts           # Utility functions
    ├── hooks/                 # Custom React hooks
    └── types/                 # TypeScript types
```

---

## 🗄️ Database Collections

### 1. Users
- Authentication and user management
- Fields: email, password, name, role

### 2. Employees
- HR data linked to users
- Fields: user, department, designation, status, joinDate, salary

### 3. Projects
- Project management
- Fields: name, description, manager, startDate, endDate, status, budget

### 4. Tasks
- Task tracking and assignment
- Fields: title, description, project, assignedTo, priority, status, dueDate

### 5. Leave Requests
- Leave approval workflow
- Fields: employee, leaveType, startDate, endDate, reason, status, approvedBy

---

## 🔐 Security Features

✅ **JWT Authentication** - Secure token-based auth  
✅ **Backend Access Control** - Permissions enforced at API level  
✅ **Field-Level Security** - Sensitive data (salary) restricted  
✅ **CORS Protection** - Configured for frontend domain  
✅ **Password Hashing** - Handled by Payload CMS  
✅ **Input Validation** - Zod schemas on frontend  

---

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Lucide React** - Icons

### Backend
- **Payload CMS** - Headless CMS
- **Express.js** - Web server
- **MongoDB** - Database
- **TypeScript** - Type safety

---

## 📡 API Endpoints

### Authentication
```
POST   /api/users/login       # Login
POST   /api/users/logout      # Logout
GET    /api/users/me          # Get current user
```

### Collections
```
GET    /api/users             # List users
GET    /api/employees         # List employees
GET    /api/projects          # List projects
GET    /api/tasks             # List tasks
GET    /api/leave-requests    # List leave requests
```

### Query Parameters
- **Filtering**: `?where[field][equals]=value`
- **Sorting**: `?sort=-createdAt`
- **Pagination**: `?limit=10&page=1`
- **Relationships**: `?depth=1`

---

## 🚢 Deployment

### Backend Deployment (Railway)

1. Create new project on Railway
2. Add MongoDB service
3. Add environment variables:
   ```
   DATABASE_URI=<mongodb-connection-string>
   PAYLOAD_SECRET=<your-secret-key>
   PAYLOAD_PUBLIC_SERVER_URL=<your-backend-url>
   FRONTEND_URL=<your-frontend-url>
   ```
4. Deploy from GitHub

### Frontend Deployment (Vercel)

1. Connect repository to Vercel
2. Set environment variable:
   ```
   NEXT_PUBLIC_API_URL=<your-backend-url>/api
   ```
3. Deploy

---

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm run dev

# Test API endpoints
curl http://localhost:4000/api/users/me
```

### Frontend Testing
```bash
cd frontend
npm run dev

# Open http://localhost:3000
# Login with demo credentials
```

---

## 📚 Documentation

- [Payload CMS Documentation](https://payloadcms.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

## 🎯 Future Enhancements

- [ ] Real-time notifications with WebSockets
- [ ] File upload for task attachments
- [ ] Advanced reporting with charts
- [ ] Email notifications
- [ ] Audit logs
- [ ] Mobile app (React Native)
- [ ] Dark mode
- [ ] Multi-language support

---

## 📝 License

MIT License - feel free to use this project for learning or production.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ using Next.js and Payload CMS**
