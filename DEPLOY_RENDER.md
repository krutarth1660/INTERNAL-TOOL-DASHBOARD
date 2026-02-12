# 🚀 Deploy to Render (All-in-One Platform)

## 📋 Overview

This guide will deploy both frontend and backend to Render:
- **Frontend** → Render Static Site (Next.js)
- **Backend** → Render Web Service (Payload CMS)
- **Database** → MongoDB Atlas

**Time Required:** 30-40 minutes

---

## 🎯 Step 1: Setup MongoDB Atlas

Follow the same steps as in `DEPLOY_VERCEL_RAILWAY.md` Step 1.

**Quick Summary:**
1. Create MongoDB Atlas account
2. Create free cluster
3. Create database user
4. Whitelist all IPs (0.0.0.0/0)
5. Get connection string

✅ **Save your MongoDB connection string!**

---

## 🎯 Step 2: Prepare Your Code

### 2.1 Push to GitHub

```bash
git init
git add .
git commit -m "Ready for Render deployment"
git remote add origin https://github.com/YOUR_USERNAME/internal-dashboard.git
git push -u origin main
```

### 2.2 Create render.yaml (Optional)

Create `render.yaml` in project root:

```yaml
services:
  # Backend Service
  - type: web
    name: internal-dashboard-backend
    env: node
    region: oregon
    plan: free
    buildCommand: cd backend && npm install && npm run build
    startCommand: cd backend && npm start
    envVars:
      - key: MONGODB_URI
        sync: false
      - key: PAYLOAD_SECRET
        sync: false
      - key: PORT
        value: 4000
      - key: NODE_ENV
        value: production
      - key: FRONTEND_URL
        sync: false

  # Frontend Service
  - type: web
    name: internal-dashboard-frontend
    env: static
    region: oregon
    plan: free
    buildCommand: cd frontend && npm install && npm run build
    staticPublishPath: frontend/out
    envVars:
      - key: NEXT_PUBLIC_API_URL
        sync: false
```

---

## 🎯 Step 3: Deploy Backend to Render

### 3.1 Create Render Account
1. Go to https://render.com/
2. Click "Get Started"
3. Sign up with GitHub
4. Authorize Render

### 3.2 Create New Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Select `internal-dashboard`

### 3.3 Configure Backend Service
```
Name: internal-dashboard-backend
Region: Oregon (or closest to you)
Branch: main
Root Directory: backend
Runtime: Node
Build Command: npm install && npm run build
Start Command: npm start
Plan: Free
```

### 3.4 Add Environment Variables

Click "Advanced" → "Add Environment Variable":

```env
MONGODB_URI=mongodb+srv://dashboard_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/internal-dashboard?retryWrites=true&w=majority

PAYLOAD_SECRET=your-super-secret-key-at-least-32-characters-long

PORT=4000

FRONTEND_URL=https://your-frontend.onrender.com

NODE_ENV=production
```

**Generate PAYLOAD_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3.5 Deploy Backend
1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Check logs for errors
4. Once deployed, copy your backend URL:
   ```
   https://internal-dashboard-backend.onrender.com
   ```

✅ **Save your backend URL!**

### 3.6 Test Backend
Visit: `https://internal-dashboard-backend.onrender.com/admin`

You should see Payload CMS login page.

---

## 🎯 Step 4: Deploy Frontend to Render

### 4.1 Update Next.js Config

Edit `frontend/next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Add this for static export
  images: {
    unoptimized: true,  // Required for static export
  },
}

module.exports = nextConfig
```

### 4.2 Update Package.json

Edit `frontend/package.json`, add export script:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "export": "next build && next export",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### 4.3 Create New Static Site
1. Click "New +" → "Static Site"
2. Connect your GitHub repository
3. Select `internal-dashboard`

### 4.4 Configure Frontend Service
```
Name: internal-dashboard-frontend
Region: Oregon
Branch: main
Root Directory: frontend
Build Command: npm install && npm run build
Publish Directory: .next
```

### 4.5 Add Environment Variables

```env
NEXT_PUBLIC_API_URL=https://internal-dashboard-backend.onrender.com/api
NODE_ENV=production
```

### 4.6 Deploy Frontend
1. Click "Create Static Site"
2. Wait for deployment (3-5 minutes)
3. Once deployed, copy your frontend URL:
   ```
   https://internal-dashboard-frontend.onrender.com
   ```

✅ **Save your frontend URL!**

---

## 🎯 Step 5: Update Backend CORS

### 5.1 Update Environment Variables
1. Go to backend service in Render
2. Click "Environment"
3. Update `FRONTEND_URL`:
   ```
   FRONTEND_URL=https://internal-dashboard-frontend.onrender.com
   ```
4. Click "Save Changes"
5. Backend will redeploy automatically

---

## 🎯 Step 6: Seed Database

### Option A: Via Local Script

Update `backend/.env`:
```env
MONGODB_URI=your_production_mongodb_uri
```

Run seed:
```bash
cd backend
npm run seed
```

### Option B: Via Render Shell

1. Go to backend service
2. Click "Shell" tab
3. Run:
   ```bash
   npm run seed
   ```

---

## 🎯 Step 7: Test Deployment

### 7.1 Test Frontend
1. Visit: `https://internal-dashboard-frontend.onrender.com`
2. Should see login page
3. Open console (F12) - no errors

### 7.2 Test Login
1. Email: `admin@example.com`
2. Password: `admin123`
3. Should redirect to dashboard

### 7.3 Test All Features
- [ ] Dashboard loads
- [ ] Employees page works
- [ ] Projects page works
- [ ] Tasks page works
- [ ] Leave requests work
- [ ] Can create data
- [ ] Can edit data
- [ ] Can delete data

---

## 🎯 Step 8: Custom Domain (Optional)

### 8.1 Add Custom Domain to Backend
1. Go to backend service
2. Click "Settings" → "Custom Domain"
3. Add: `api.yourdomain.com`
4. Update DNS:
   ```
   Type: CNAME
   Name: api
   Value: internal-dashboard-backend.onrender.com
   ```

### 8.2 Add Custom Domain to Frontend
1. Go to frontend service
2. Click "Settings" → "Custom Domain"
3. Add: `app.yourdomain.com`
4. Update DNS:
   ```
   Type: CNAME
   Name: app
   Value: internal-dashboard-frontend.onrender.com
   ```

### 8.3 Update Environment Variables
Update `FRONTEND_URL` in backend:
```
FRONTEND_URL=https://app.yourdomain.com
```

Update `NEXT_PUBLIC_API_URL` in frontend:
```
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
```

---

## 📊 Deployment Summary

### Your URLs
```
Frontend:  https://internal-dashboard-frontend.onrender.com
Backend:   https://internal-dashboard-backend.onrender.com
Admin:     https://internal-dashboard-backend.onrender.com/admin
API:       https://internal-dashboard-backend.onrender.com/api
Database:  MongoDB Atlas
```

### Services
- Backend: Render Web Service (Free)
- Frontend: Render Static Site (Free)
- Database: MongoDB Atlas (Free)

---

## 🐛 Troubleshooting

### Issue 1: Service Spins Down
**Problem:** Free tier services sleep after 15 minutes of inactivity

**Solution:**
1. Upgrade to paid plan ($7/month)
2. Or use a service like UptimeRobot to ping every 14 minutes
3. First request after sleep takes 30-60 seconds

### Issue 2: Build Failed
**Problem:** Build command fails

**Solution:**
1. Check logs in Render dashboard
2. Verify `package.json` scripts
3. Test build locally first:
   ```bash
   cd backend
   npm run build
   
   cd frontend
   npm run build
   ```

### Issue 3: Environment Variables Not Working
**Problem:** App can't connect to database

**Solution:**
1. Go to service → Environment
2. Verify all variables are set
3. Click "Manual Deploy" to redeploy

---

## 💰 Cost Breakdown

### Free Tier
- **Render Web Service:** Free (spins down after 15 min)
- **Render Static Site:** Free (always on)
- **MongoDB Atlas:** Free (512MB)
- **Total:** $0/month

### Paid Tier
- **Render Web Service:** $7/month (always on)
- **Render Static Site:** Free
- **MongoDB Atlas:** $9/month (2GB)
- **Total:** $16/month

---

## 🎉 Success!

Your application is deployed on Render! 🚀

**Next Steps:**
1. Change default passwords
2. Create real users
3. Import real data
4. Share with team

---

## 📞 Need Help?

**Check Logs:**
- Go to service → "Logs" tab
- View real-time logs
- Download logs for debugging

**Redeploy:**
- Click "Manual Deploy"
- Or push to GitHub (auto-deploy)

**Support:**
- Render Docs: https://render.com/docs
- Community: https://community.render.com/

---

**Congratulations!** 🎊✨
