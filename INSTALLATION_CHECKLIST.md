# ✅ Installation Checklist

Use this checklist to ensure everything is set up correctly.

---

## 📋 Pre-Installation

- [ ] Node.js 18+ installed
  ```bash
  node --version
  # Should show v18.x.x or higher
  ```

- [ ] npm installed
  ```bash
  npm --version
  # Should show 9.x.x or higher
  ```

- [ ] MongoDB installed OR MongoDB Atlas account ready
  ```bash
  # For local MongoDB
  mongosh
  # Should connect successfully
  ```

- [ ] Git installed (optional, for cloning)
  ```bash
  git --version
  ```

---

## 🔙 Backend Setup

### 1. Navigate to Backend
- [ ] Open terminal in project root
- [ ] Run: `cd backend`

### 2. Install Dependencies
- [ ] Run: `npm install`
- [ ] Wait for installation to complete (may take 2-3 minutes)
- [ ] Verify: `node_modules` folder created

### 3. Environment Configuration
- [ ] Copy `.env.example` to `.env`
  ```bash
  # Windows
  copy .env.example .env
  
  # Mac/Linux
  cp .env.example .env
  ```

- [ ] Open `.env` file
- [ ] Set `DATABASE_URI`:
  - [ ] Local: `mongodb://localhost:27017/internal-dashboard`
  - [ ] Atlas: `mongodb+srv://username:password@cluster.mongodb.net/internal-dashboard`

- [ ] Set `PAYLOAD_SECRET` (min 32 characters):
  ```
  PAYLOAD_SECRET=your-super-secret-key-min-32-chars-long-12345
  ```

- [ ] Verify `PORT=4000`
- [ ] Verify `FRONTEND_URL=http://localhost:3000`

### 4. Seed Database
- [ ] Run: `npm run seed`
- [ ] Verify output shows:
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

### 5. Start Backend Server
- [ ] Run: `npm run dev`
- [ ] Verify output shows:
  ```
  🚀 Server is running on http://localhost:4000
  📊 Admin Panel: http://localhost:4000/admin
  🔌 API: http://localhost:4000/api
  ```

### 6. Test Backend
- [ ] Open browser: http://localhost:4000/admin
- [ ] Login with: `admin@example.com` / `admin123`
- [ ] Verify: Admin panel loads successfully
- [ ] Navigate to: Collections → Users
- [ ] Verify: 4 users are listed

---

## 🎨 Frontend Setup

### 1. Navigate to Frontend
- [ ] Open NEW terminal window (keep backend running)
- [ ] Navigate to project root
- [ ] Run: `cd frontend`

### 2. Install Dependencies
- [ ] Run: `npm install`
- [ ] Wait for installation to complete (may take 2-3 minutes)
- [ ] Verify: `node_modules` folder created

### 3. Environment Configuration
- [ ] Copy `.env.local.example` to `.env.local`
  ```bash
  # Windows
  copy .env.local.example .env.local
  
  # Mac/Linux
  cp .env.local.example .env.local
  ```

- [ ] Open `.env.local` file
- [ ] Verify: `NEXT_PUBLIC_API_URL=http://localhost:4000/api`

### 4. Start Frontend Server
- [ ] Run: `npm run dev`
- [ ] Verify output shows:
  ```
  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
  ✓ Ready in X.Xs
  ```

### 5. Test Frontend
- [ ] Open browser: http://localhost:3000
- [ ] Verify: Redirects to login page
- [ ] Login with: `admin@example.com` / `admin123`
- [ ] Verify: Dashboard loads with statistics
- [ ] Check sidebar navigation appears
- [ ] Click on different menu items

---

## 🧪 Functionality Testing

### Test as Admin
- [ ] Logout from current session
- [ ] Login: `admin@example.com` / `admin123`
- [ ] Verify: All menu items visible (Dashboard, Employees, Projects, Tasks, Leave, Reports)
- [ ] Navigate to each page
- [ ] Verify: No errors in browser console (F12)

### Test as Manager
- [ ] Logout
- [ ] Login: `manager@example.com` / `manager123`
- [ ] Verify: Menu shows Dashboard, Employees, Projects, Tasks, Leave, Reports
- [ ] Navigate to each page
- [ ] Verify: Can view data

### Test as Employee
- [ ] Logout
- [ ] Login: `employee1@example.com` / `employee123`
- [ ] Verify: Menu shows Dashboard, Projects, Tasks, Leave (no Employees or Reports)
- [ ] Navigate to each page
- [ ] Verify: Limited access as expected

---

## 🔍 Verification Checklist

### Backend Verification
- [ ] Backend running on port 4000
- [ ] Admin panel accessible at http://localhost:4000/admin
- [ ] Can login to admin panel
- [ ] All 5 collections visible (Users, Employees, Projects, Tasks, Leave Requests)
- [ ] Sample data exists in all collections
- [ ] No errors in backend terminal

### Frontend Verification
- [ ] Frontend running on port 3000
- [ ] Login page loads correctly
- [ ] Can login with demo credentials
- [ ] Dashboard shows statistics
- [ ] Sidebar navigation works
- [ ] All protected routes accessible
- [ ] No errors in browser console
- [ ] No errors in frontend terminal

### API Verification
- [ ] Test API endpoint in browser or Postman:
  ```
  GET http://localhost:4000/api/users/me
  ```
- [ ] Should return 401 (Unauthorized) without token
- [ ] Login via frontend stores token
- [ ] API calls work from frontend

---

## 🐛 Common Issues & Solutions

### Backend won't start

**Issue**: "Cannot connect to MongoDB"
- [ ] Check MongoDB is running: `mongosh`
- [ ] Verify DATABASE_URI in `.env`
- [ ] For Atlas: Check IP whitelist and credentials

**Issue**: "Port 4000 already in use"
- [ ] Change PORT in `.env` to 5000
- [ ] Update NEXT_PUBLIC_API_URL in frontend `.env.local`

**Issue**: "PAYLOAD_SECRET must be at least 32 characters"
- [ ] Make PAYLOAD_SECRET longer in `.env`

### Frontend won't start

**Issue**: "Port 3000 already in use"
- [ ] Stop other Next.js apps
- [ ] Or change port: `npm run dev -- -p 3001`

**Issue**: "Module not found"
- [ ] Delete `node_modules`: `rm -rf node_modules`
- [ ] Reinstall: `npm install`

### Login not working

**Issue**: "Network Error"
- [ ] Verify backend is running
- [ ] Check NEXT_PUBLIC_API_URL in `.env.local`
- [ ] Check browser console for CORS errors

**Issue**: "Invalid credentials"
- [ ] Verify you ran `npm run seed` in backend
- [ ] Check credentials are correct
- [ ] Try: admin@example.com / admin123

### Data not showing

**Issue**: Empty lists/tables
- [ ] Verify seed script ran successfully
- [ ] Check backend terminal for errors
- [ ] Check browser console for API errors
- [ ] Verify token is being sent (Network tab in DevTools)

---

## ✅ Final Verification

All checks passed? You're ready to develop!

- [ ] Backend running: http://localhost:4000
- [ ] Frontend running: http://localhost:3000
- [ ] Can login as Admin
- [ ] Can login as Manager
- [ ] Can login as Employee
- [ ] Dashboard shows statistics
- [ ] Navigation works
- [ ] No console errors

---

## 🎉 Success!

Your Internal Tool Dashboard is now running!

### Next Steps:
1. Explore the admin panel: http://localhost:4000/admin
2. Test the frontend: http://localhost:3000
3. Review the code structure
4. Start building new features!

### Quick Start (Next Time):
```bash
# Windows
start-dev.bat

# Mac/Linux
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```

---

## 📚 Documentation

- Main README: `README.md`
- Setup Guide: `SETUP_GUIDE.md`
- Project Summary: `PROJECT_SUMMARY.md`
- Backend README: `backend/README.md`
- Frontend README: `frontend/README.md`

---

**Need Help?** Check the troubleshooting sections in SETUP_GUIDE.md
