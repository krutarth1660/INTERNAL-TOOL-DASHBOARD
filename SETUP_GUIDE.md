# 📖 Complete Setup Guide

Step-by-step guide to set up and run the Internal Tool Dashboard project.

---

## 📋 Prerequisites Checklist

Before starting, ensure you have:

- [ ] **Node.js 18+** installed ([Download](https://nodejs.org/))
- [ ] **MongoDB** installed locally OR MongoDB Atlas account ([Setup](https://www.mongodb.com/cloud/atlas))
- [ ] **Git** installed
- [ ] **Code editor** (VS Code recommended)
- [ ] **Terminal/Command Prompt** access

---

## 🔧 Step 1: Install MongoDB

### Option A: Local MongoDB (Windows)

1. Download MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Run the installer
3. Start MongoDB service:
   ```bash
   net start MongoDB
   ```
4. Verify installation:
   ```bash
   mongosh
   ```

### Option B: MongoDB Atlas (Cloud - Recommended)

1. Create free account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (Free tier available)
3. Create database user with password
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/internal-dashboard
   ```

---

## 📦 Step 2: Clone and Setup Project

### Clone Repository

```bash
git clone <your-repo-url>
cd internal-dashboard
```

---

## 🔙 Step 3: Setup Backend

### Navigate to Backend

```bash
cd backend
```

### Install Dependencies

```bash
npm install
```

### Create Environment File

```bash
# Windows
copy .env.example .env

# Mac/Linux
cp .env.example .env
```

### Configure Environment Variables

Open `.env` file and update:

```env
# For Local MongoDB
DATABASE_URI=mongodb://localhost:27017/internal-dashboard

# For MongoDB Atlas
DATABASE_URI=mongodb+srv://username:password@cluster.mongodb.net/internal-dashboard

# Generate a secure secret (min 32 characters)
PAYLOAD_SECRET=your-super-secret-key-min-32-chars-long-12345

# Backend URL
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:4000

# Server Port
PORT=4000

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

### Seed Database

```bash
npm run seed
```

You should see:
```
✅ Admin user created
✅ Manager user created
✅ Employee users created
✅ Employee records created
✅ Projects created
✅ Tasks created
✅ Leave requests created

🎉 Database seeded successfully!
```

### Start Backend Server

```bash
npm run dev
```

Backend should be running on:
- **API**: http://localhost:4000/api
- **Admin Panel**: http://localhost:4000/admin

### Test Backend

Open browser and visit:
- http://localhost:4000/admin
- Login with: `admin@example.com` / `admin123`

---

## 🎨 Step 4: Setup Frontend

### Open New Terminal

Keep backend running, open a new terminal window.

### Navigate to Frontend

```bash
cd frontend
```

### Install Dependencies

```bash
npm install
```

### Create Environment File

```bash
# Windows
copy .env.local.example .env.local

# Mac/Linux
cp .env.local.example .env.local
```

### Configure Environment Variables

Open `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

### Start Frontend Server

```bash
npm run dev
```

Frontend should be running on:
- **App**: http://localhost:3000

### Test Frontend

1. Open browser: http://localhost:3000
2. You'll be redirected to login page
3. Login with demo credentials:
   - **Admin**: admin@example.com / admin123
   - **Manager**: manager@example.com / manager123
   - **Employee**: employee1@example.com / employee123

---

## ✅ Step 5: Verify Installation

### Check Backend

1. Visit http://localhost:4000/admin
2. Login as admin
3. Navigate to Collections → Users
4. You should see 4 users

### Check Frontend

1. Visit http://localhost:3000
2. Login as admin
3. You should see dashboard with stats
4. Navigate through:
   - Employees
   - Projects
   - Tasks
   - Leave Requests

---

## 🐛 Troubleshooting

### Backend Issues

**Error: "Cannot connect to MongoDB"**
```bash
# Check if MongoDB is running
mongosh

# If using Atlas, verify:
# 1. Connection string is correct
# 2. IP is whitelisted
# 3. Database user has correct permissions
```

**Error: "Port 4000 already in use"**
```bash
# Change PORT in backend/.env
PORT=5000

# Update frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Error: "PAYLOAD_SECRET must be at least 32 characters"**
```bash
# Generate a longer secret in backend/.env
PAYLOAD_SECRET=this-is-a-very-long-secret-key-with-more-than-32-characters
```

### Frontend Issues

**Error: "Network Error" or "Failed to fetch"**
```bash
# Verify backend is running on http://localhost:4000
# Check NEXT_PUBLIC_API_URL in frontend/.env.local
# Check CORS settings in backend/src/server.ts
```

**Error: "Module not found"**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

**Login not working**
```bash
# Clear browser localStorage
# Open DevTools → Application → Local Storage → Clear All
# Try login again
```

---

## 🔄 Development Workflow

### Daily Development

1. **Start Backend**:
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend** (new terminal):
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access Applications**:
   - Frontend: http://localhost:3000
   - Backend Admin: http://localhost:4000/admin
   - API: http://localhost:4000/api

### Making Changes

**Backend Changes** (Collections, Access Control):
1. Edit files in `backend/src/collections/`
2. Server auto-restarts (nodemon)
3. Test in Admin Panel or API

**Frontend Changes** (UI, Components):
1. Edit files in `frontend/app/` or `frontend/components/`
2. Hot reload automatically updates browser
3. Test in browser

### Reset Database

```bash
cd backend

# Drop database and reseed
npm run seed
```

---

## 📊 Testing Different Roles

### Test as Admin
- Login: admin@example.com / admin123
- Can access: All pages
- Can do: Everything (create, edit, delete)

### Test as Manager
- Login: manager@example.com / manager123
- Can access: Dashboard, Employees (view), Projects, Tasks, Leave, Reports
- Can do: Create projects/tasks, approve leaves, export data

### Test as Employee
- Login: employee1@example.com / employee123
- Can access: Dashboard, Projects (assigned), Tasks (assigned), Leave
- Can do: Update task status, submit leave requests

---

## 🚀 Next Steps

Now that your project is running:

1. **Explore the Admin Panel** (http://localhost:4000/admin)
   - View all collections
   - Test CRUD operations
   - Check access control

2. **Explore the Frontend** (http://localhost:3000)
   - Test as different roles
   - Create tasks, projects
   - Submit leave requests

3. **Customize the Project**
   - Add new fields to collections
   - Create new pages
   - Modify styling

4. **Deploy to Production**
   - Follow deployment guide in README.md
   - Use Railway for backend
   - Use Vercel for frontend

---

## 📚 Additional Resources

- [Payload CMS Docs](https://payloadcms.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

## 🆘 Getting Help

If you encounter issues:

1. Check this troubleshooting guide
2. Review error messages in terminal
3. Check browser console (F12)
4. Open an issue on GitHub

---

**Happy Coding! 🎉**
