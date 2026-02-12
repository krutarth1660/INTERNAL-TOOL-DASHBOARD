# 🚀 START HERE - Quick Setup

## ⚠️ MongoDB Required

You encountered an error because MongoDB is not set up. Here's how to fix it:

---

## 🎯 Quick Fix (5 minutes)

### Option A: MongoDB Atlas (Cloud - EASIEST)

1. **Create free account**: Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

2. **Create cluster**: 
   - Click "Build a Database"
   - Choose "FREE" (M0)
   - Click "Create"

3. **Create user**:
   - Username: `admin`
   - Password: `admin123`
   - Click "Create User"

4. **Whitelist IP**:
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere"
   - Click "Confirm"

5. **Get connection string**:
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the string (looks like):
   ```
   mongodb+srv://admin:admin123@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

6. **Update backend/.env**:
   ```env
   DATABASE_URI=mongodb+srv://admin:admin123@cluster0.xxxxx.mongodb.net/internal-dashboard?retryWrites=true&w=majority
   ```
   (Replace with YOUR connection string!)

7. **Seed database**:
   ```bash
   cd backend
   npm run seed
   ```

8. **Start servers**:
   ```bash
   # Terminal 1
   cd backend
   npm run dev

   # Terminal 2
   cd frontend
   npm install
   npm run dev
   ```

9. **Open app**: http://localhost:3000
   - Login: admin@example.com / admin123

---

### Option B: Install MongoDB Locally (Windows)

1. **Download**: [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)

2. **Install**: Run the `.msi` file, choose "Complete"

3. **Verify**:
   ```bash
   mongosh --version
   ```

4. **Keep default .env**:
   ```env
   DATABASE_URI=mongodb://localhost:27017/internal-dashboard
   ```

5. **Seed and start** (same as steps 7-9 above)

---

## 🎬 Automated Setup

Run this script to guide you through setup:

```bash
setup-mongodb.bat
```

---

## 📚 Detailed Guides

- **MongoDB Setup**: See [MONGODB_SETUP.md](MONGODB_SETUP.md)
- **Full Setup**: See [SETUP_GUIDE.md](SETUP_GUIDE.md)
- **Getting Started**: See [GETTING_STARTED.md](GETTING_STARTED.md)

---

## ✅ Success Checklist

After setup, you should have:

- [ ] MongoDB running (Atlas or Local)
- [ ] Backend dependencies installed (`npm install` in backend/)
- [ ] Database seeded (`npm run seed` in backend/)
- [ ] Backend running on http://localhost:4000
- [ ] Frontend dependencies installed (`npm install` in frontend/)
- [ ] Frontend running on http://localhost:3000
- [ ] Can login with admin@example.com / admin123

---

## 🆘 Still Having Issues?

1. Check [MONGODB_SETUP.md](MONGODB_SETUP.md) for troubleshooting
2. Verify your connection string is correct
3. Make sure MongoDB is accessible
4. Check backend/.env file

---

**Recommendation**: Use MongoDB Atlas (Option A) - it's free, easy, and requires no local installation!
