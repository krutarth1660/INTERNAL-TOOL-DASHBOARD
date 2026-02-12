# 🚀 Deployment Guide - Internal Tool Dashboard

## 📋 Overview

This guide will help you deploy your Internal Tool Dashboard to production. We'll cover multiple deployment options.

---

## 🎯 Deployment Options

### Option 1: Vercel (Frontend) + Railway (Backend) - Recommended ⭐
- **Frontend:** Vercel (Free tier available)
- **Backend:** Railway (Free tier available)
- **Database:** MongoDB Atlas (Free tier available)
- **Best for:** Quick deployment, automatic CI/CD

### Option 2: Render (Full Stack)
- **Frontend + Backend:** Render (Free tier available)
- **Database:** MongoDB Atlas
- **Best for:** Single platform deployment

### Option 3: DigitalOcean / AWS / Azure
- **Full control:** VPS or cloud services
- **Best for:** Production-grade deployment

---

## 🗂️ Project Structure

```
your-project/
├── backend/          # Payload CMS + Express API
│   ├── src/
│   ├── package.json
│   └── .env
└── frontend/         # Next.js application
    ├── app/
    ├── package.json
    └── .env.local
```

---

## 📦 Pre-Deployment Checklist

### ✅ Before You Deploy

- [ ] MongoDB Atlas account created
- [ ] Database connection string ready
- [ ] All environment variables documented
- [ ] Code pushed to GitHub repository
- [ ] Backend tested locally
- [ ] Frontend tested locally
- [ ] Production build tested

### ✅ Required Accounts

1. **MongoDB Atlas** (Database)
   - Sign up: https://www.mongodb.com/cloud/atlas/register
   - Free tier: 512MB storage

2. **Vercel** (Frontend)
   - Sign up: https://vercel.com/signup
   - Free tier: Unlimited deployments

3. **Railway** (Backend)
   - Sign up: https://railway.app/
   - Free tier: $5 credit/month

---

## 🔧 Environment Variables

### Backend (.env)
```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# Payload CMS
PAYLOAD_SECRET=your-super-secret-key-min-32-chars
PORT=4000

# CORS
FRONTEND_URL=https://your-frontend.vercel.app

# Node Environment
NODE_ENV=production
```

### Frontend (.env.local)
```env
# API URL
NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api

# Node Environment
NODE_ENV=production
```

---

## 📚 Detailed Deployment Guides

See the following guides for step-by-step instructions:

1. **`DEPLOY_VERCEL_RAILWAY.md`** - Deploy to Vercel + Railway (Recommended)
2. **`DEPLOY_RENDER.md`** - Deploy to Render (All-in-one)
3. **`DEPLOY_VPS.md`** - Deploy to VPS (DigitalOcean/AWS)

---

## 🎯 Quick Start - Vercel + Railway

### Step 1: Setup MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Create database user
4. Whitelist all IPs (0.0.0.0/0)
5. Get connection string

### Step 2: Deploy Backend to Railway

1. Go to https://railway.app/
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Select `backend` folder
5. Add environment variables
6. Deploy!

### Step 3: Deploy Frontend to Vercel

1. Go to https://vercel.com/
2. Click "New Project"
3. Import your GitHub repository
4. Select `frontend` folder
5. Add environment variables
6. Deploy!

### Step 4: Test Your Deployment

1. Visit your frontend URL
2. Login with admin credentials
3. Test all features
4. Check console for errors

---

## 🔒 Security Checklist

### Before Going Live

- [ ] Change all default passwords
- [ ] Use strong PAYLOAD_SECRET (32+ characters)
- [ ] Enable HTTPS (automatic on Vercel/Railway)
- [ ] Restrict MongoDB IP whitelist (if possible)
- [ ] Review CORS settings
- [ ] Enable rate limiting (optional)
- [ ] Set up monitoring (optional)

### Production Passwords

⚠️ **IMPORTANT:** Change these default passwords!

```
Admin: admin@example.com / admin123  ← CHANGE THIS!
Manager: manager@example.com / manager123  ← CHANGE THIS!
```

---

## 📊 Post-Deployment

### 1. Create Admin User

After deployment, create your real admin user:

```bash
# Option 1: Via Payload Admin Panel
https://your-backend.railway.app/admin

# Option 2: Via Seed Script (update with real data)
npm run seed
```

### 2. Update Seed Data

Edit `backend/src/seed/index.ts` with real data:
- Real admin email/password
- Real company departments
- Real project names

### 3. Test Everything

- [ ] Login works
- [ ] Create employee
- [ ] Create project
- [ ] Create task
- [ ] Submit leave request
- [ ] Approve leave (admin)
- [ ] Export data

---

## 🐛 Troubleshooting

### Common Issues

**1. CORS Error**
```
Error: Access to fetch blocked by CORS policy
```
**Solution:** Check `FRONTEND_URL` in backend .env

**2. Database Connection Failed**
```
Error: MongoServerError: Authentication failed
```
**Solution:** Check MongoDB connection string and credentials

**3. API Not Found**
```
Error: 404 Not Found
```
**Solution:** Check `NEXT_PUBLIC_API_URL` in frontend .env

**4. Build Failed**
```
Error: Module not found
```
**Solution:** Run `npm install` and check dependencies

---

## 📈 Monitoring & Maintenance

### Recommended Tools

1. **Uptime Monitoring**
   - UptimeRobot (free)
   - Pingdom

2. **Error Tracking**
   - Sentry (free tier)
   - LogRocket

3. **Analytics**
   - Google Analytics
   - Plausible

### Regular Maintenance

- [ ] Weekly: Check error logs
- [ ] Monthly: Update dependencies
- [ ] Quarterly: Review security
- [ ] Yearly: Backup database

---

## 💰 Cost Estimate

### Free Tier (Recommended for Start)
- MongoDB Atlas: Free (512MB)
- Vercel: Free (Unlimited deployments)
- Railway: Free ($5 credit/month)
- **Total: $0/month** (within free limits)

### Paid Tier (For Growth)
- MongoDB Atlas: $9/month (2GB)
- Vercel Pro: $20/month
- Railway: $5-20/month
- **Total: ~$34-49/month**

---

## 🎓 Next Steps

1. Choose deployment option
2. Follow detailed guide
3. Deploy backend first
4. Deploy frontend second
5. Test thoroughly
6. Update documentation
7. Train users

---

## 📞 Support

If you encounter issues:

1. Check deployment logs
2. Review environment variables
3. Test locally first
4. Check MongoDB connection
5. Verify CORS settings

---

## 🎉 You're Ready!

Choose your deployment method and follow the detailed guide:

- **Quick & Easy:** `DEPLOY_VERCEL_RAILWAY.md`
- **All-in-One:** `DEPLOY_RENDER.md`
- **Full Control:** `DEPLOY_VPS.md`

**Good luck with your deployment!** 🚀✨
