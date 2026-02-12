# 🚀 Deploy to Vercel + Railway (Recommended)

## 📋 Overview

This guide will deploy:
- **Frontend** → Vercel (Next.js)
- **Backend** → Railway (Payload CMS + Express)
- **Database** → MongoDB Atlas

**Time Required:** 30-45 minutes

---

## 🎯 Step 1: Setup MongoDB Atlas (Database)

### 1.1 Create Account
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up with email or Google
3. Choose "Free" tier
4. Click "Create"

### 1.2 Create Cluster
1. Choose "M0 Sandbox" (Free)
2. Select region closest to you
3. Cluster Name: `internal-dashboard`
4. Click "Create Cluster"
5. Wait 3-5 minutes for cluster creation

### 1.3 Create Database User
1. Click "Database Access" (left sidebar)
2. Click "Add New Database User"
3. Authentication Method: Password
4. Username: `dashboard_user`
5. Password: Click "Autogenerate Secure Password" (SAVE THIS!)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

### 1.4 Whitelist IP Addresses
1. Click "Network Access" (left sidebar)
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere"
4. IP Address: `0.0.0.0/0`
5. Click "Confirm"

⚠️ **Note:** For production, restrict to specific IPs

### 1.5 Get Connection String
1. Click "Database" (left sidebar)
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Driver: Node.js, Version: 5.5 or later
5. Copy connection string:
   ```
   mongodb+srv://dashboard_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<password>` with your actual password
7. Add database name: `/internal-dashboard` before `?`
   ```
   mongodb+srv://dashboard_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/internal-dashboard?retryWrites=true&w=majority
   ```

✅ **Save this connection string!** You'll need it later.

---

## 🎯 Step 2: Prepare Your Code

### 2.1 Push to GitHub

If not already done:

```bash
# Initialize git (if needed)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Ready for deployment"

# Create GitHub repository
# Go to https://github.com/new
# Create repository: internal-dashboard

# Add remote and push
git remote add origin https://github.com/YOUR_USERNAME/internal-dashboard.git
git branch -M main
git push -u origin main
```

### 2.2 Update Backend for Production

Create `backend/.env.example`:
```env
MONGODB_URI=your_mongodb_connection_string
PAYLOAD_SECRET=your_secret_key_min_32_characters
PORT=4000
FRONTEND_URL=https://your-frontend-url.vercel.app
NODE_ENV=production
```

### 2.3 Update Frontend for Production

Create `frontend/.env.local.example`:
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app/api
NODE_ENV=production
```

---

## 🎯 Step 3: Deploy Backend to Railway

### 3.1 Create Railway Account
1. Go to https://railway.app/
2. Click "Login" → "Login with GitHub"
3. Authorize Railway

### 3.2 Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Select your repository: `internal-dashboard`
4. Railway will detect both frontend and backend

### 3.3 Configure Backend Service
1. Click on the detected service
2. Click "Settings"
3. **Root Directory:** Set to `backend`
4. **Start Command:** `npm run build && npm start`

### 3.4 Add Environment Variables
1. Click "Variables" tab
2. Add these variables:

```env
MONGODB_URI=mongodb+srv://dashboard_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/internal-dashboard?retryWrites=true&w=majority

PAYLOAD_SECRET=your-super-secret-key-at-least-32-characters-long

PORT=4000

FRONTEND_URL=https://your-app.vercel.app

NODE_ENV=production
```

**Generate PAYLOAD_SECRET:**
```bash
# Run this in terminal
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3.5 Deploy Backend
1. Click "Deploy"
2. Wait for build to complete (3-5 minutes)
3. Check logs for errors
4. Once deployed, click "Settings" → "Networking"
5. Click "Generate Domain"
6. Copy your backend URL: `https://your-app.railway.app`

✅ **Save your backend URL!**

### 3.6 Test Backend
1. Visit: `https://your-app.railway.app/admin`
2. You should see Payload CMS login page
3. If you see errors, check logs

---

## 🎯 Step 4: Deploy Frontend to Vercel

### 4.1 Create Vercel Account
1. Go to https://vercel.com/signup
2. Sign up with GitHub
3. Authorize Vercel

### 4.2 Import Project
1. Click "Add New..." → "Project"
2. Import your GitHub repository
3. Vercel will detect Next.js

### 4.3 Configure Project
1. **Framework Preset:** Next.js (auto-detected)
2. **Root Directory:** `frontend`
3. **Build Command:** `npm run build` (default)
4. **Output Directory:** `.next` (default)

### 4.4 Add Environment Variables
1. Click "Environment Variables"
2. Add this variable:

```env
NEXT_PUBLIC_API_URL=https://your-app.railway.app/api
```

Replace `your-app.railway.app` with your actual Railway backend URL

### 4.5 Deploy Frontend
1. Click "Deploy"
2. Wait for build (2-3 minutes)
3. Once deployed, you'll get a URL: `https://your-app.vercel.app`

✅ **Save your frontend URL!**

---

## 🎯 Step 5: Update Backend CORS

### 5.1 Update Railway Environment
1. Go back to Railway
2. Click on your backend service
3. Click "Variables"
4. Update `FRONTEND_URL`:
   ```
   FRONTEND_URL=https://your-app.vercel.app
   ```
5. Click "Save"
6. Backend will redeploy automatically

---

## 🎯 Step 6: Seed Database

### 6.1 Option A: Via Local Script (Recommended)

Update `backend/.env` with production MongoDB:
```env
MONGODB_URI=your_production_mongodb_uri
```

Run seed:
```bash
cd backend
npm run seed
```

### 6.2 Option B: Via Railway CLI

Install Railway CLI:
```bash
npm install -g @railway/cli
```

Login and seed:
```bash
railway login
railway link
cd backend
railway run npm run seed
```

### 6.3 Verify Seed Data
1. Go to MongoDB Atlas
2. Click "Browse Collections"
3. You should see:
   - users (4 documents)
   - employees (2 documents)
   - projects (2 documents)
   - tasks (3 documents)
   - leave-requests (2 documents)

---

## 🎯 Step 7: Test Your Deployment

### 7.1 Test Frontend
1. Visit: `https://your-app.vercel.app`
2. You should see login page
3. No errors in console (F12)

### 7.2 Test Login
1. Email: `admin@example.com`
2. Password: `admin123`
3. Click "Login"
4. Should redirect to dashboard

### 7.3 Test Features
- [ ] Dashboard loads with stats
- [ ] Employees page loads
- [ ] Projects page loads
- [ ] Tasks page loads
- [ ] Leave requests page loads
- [ ] Can create new employee
- [ ] Can create new project
- [ ] Can create new task

### 7.4 Check Console Logs
Open browser console (F12):
```
✅ Should see API requests
✅ Should see successful responses
❌ Should NOT see CORS errors
❌ Should NOT see 404 errors
```

---

## 🎯 Step 8: Production Setup

### 8.1 Change Default Passwords

⚠️ **CRITICAL:** Change default passwords!

1. Login as admin
2. Go to Employees
3. Edit each user
4. Change passwords
5. Or delete seed users and create new ones

### 8.2 Create Real Admin User

Via Payload Admin Panel:
1. Go to: `https://your-app.railway.app/admin`
2. Login with seed admin
3. Go to Users
4. Create new admin user with real email
5. Delete seed admin

### 8.3 Configure Custom Domain (Optional)

**Vercel:**
1. Go to Project Settings
2. Click "Domains"
3. Add your domain
4. Update DNS records

**Railway:**
1. Go to Service Settings
2. Click "Networking"
3. Add custom domain
4. Update DNS records

---

## 🎯 Step 9: Monitoring & Maintenance

### 9.1 Setup Monitoring

**Vercel:**
- Automatic monitoring included
- Check "Analytics" tab

**Railway:**
- Check "Metrics" tab
- View logs in "Deployments"

### 9.2 Enable Alerts

**MongoDB Atlas:**
1. Go to "Alerts"
2. Enable connection alerts
3. Enable storage alerts

### 9.3 Backup Strategy

**MongoDB Atlas:**
1. Go to "Backup"
2. Enable Cloud Backup (paid feature)
3. Or export data regularly

---

## 📊 Deployment Summary

### Your URLs
```
Frontend:  https://your-app.vercel.app
Backend:   https://your-app.railway.app
Admin:     https://your-app.railway.app/admin
API:       https://your-app.railway.app/api
Database:  MongoDB Atlas
```

### Environment Variables

**Backend (Railway):**
```env
MONGODB_URI=mongodb+srv://...
PAYLOAD_SECRET=your-secret-key
PORT=4000
FRONTEND_URL=https://your-app.vercel.app
NODE_ENV=production
```

**Frontend (Vercel):**
```env
NEXT_PUBLIC_API_URL=https://your-app.railway.app/api
NODE_ENV=production
```

---

## 🐛 Troubleshooting

### Issue 1: CORS Error
```
Access to fetch blocked by CORS policy
```
**Solution:**
1. Check `FRONTEND_URL` in Railway
2. Must match exact Vercel URL
3. Redeploy backend after change

### Issue 2: 404 API Not Found
```
GET https://your-app.railway.app/api/users 404
```
**Solution:**
1. Check backend logs in Railway
2. Verify backend is running
3. Check `NEXT_PUBLIC_API_URL` in Vercel

### Issue 3: Database Connection Failed
```
MongoServerError: Authentication failed
```
**Solution:**
1. Check MongoDB connection string
2. Verify password is correct
3. Check IP whitelist (0.0.0.0/0)

### Issue 4: Build Failed
```
Error: Cannot find module
```
**Solution:**
1. Check `package.json` dependencies
2. Run `npm install` locally
3. Push changes and redeploy

---

## 💰 Cost Breakdown

### Free Tier Limits
- **Vercel:** Unlimited deployments, 100GB bandwidth
- **Railway:** $5 credit/month (~500 hours)
- **MongoDB Atlas:** 512MB storage, shared cluster

### When to Upgrade
- Vercel: >100GB bandwidth/month
- Railway: >500 hours/month or need more resources
- MongoDB: >512MB data or need backups

---

## 🎉 Success!

Your application is now live! 🚀

**Next Steps:**
1. Share URLs with your team
2. Create real user accounts
3. Import real data
4. Train users
5. Monitor performance

**URLs to Share:**
- App: `https://your-app.vercel.app`
- Admin: `https://your-app.railway.app/admin`

---

## 📞 Need Help?

**Check Logs:**
- Vercel: Project → Deployments → View Logs
- Railway: Service → Deployments → View Logs
- MongoDB: Cluster → Metrics

**Common Commands:**
```bash
# View Vercel logs
vercel logs

# View Railway logs
railway logs

# Redeploy
git push origin main
```

---

**Congratulations on your deployment!** 🎊✨
