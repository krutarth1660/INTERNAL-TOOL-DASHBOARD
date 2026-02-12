# 🗄️ MongoDB Setup Guide

You need MongoDB to run the backend. Here are two options:

---

## ✅ Option 1: MongoDB Atlas (Cloud - RECOMMENDED)

This is the easiest option and doesn't require local installation.

### Step 1: Create Free Account

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Try Free"
3. Sign up with email or Google

### Step 2: Create a Cluster

1. Choose "FREE" tier (M0 Sandbox)
2. Select a cloud provider (AWS recommended)
3. Choose a region close to you
4. Click "Create Cluster" (takes 3-5 minutes)

### Step 3: Create Database User

1. Click "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `admin`
5. Password: `admin123` (or your choice)
6. User Privileges: "Atlas admin"
7. Click "Add User"

### Step 4: Whitelist IP Address

1. Click "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Click "Confirm"

### Step 5: Get Connection String

1. Click "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string:
   ```
   mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password

### Step 6: Update Backend .env

Open `backend/.env` and update:

```env
DATABASE_URI=mongodb+srv://admin:admin123@cluster0.xxxxx.mongodb.net/internal-dashboard?retryWrites=true&w=majority
```

**Important:** Replace with your actual connection string!

---

## Option 2: Local MongoDB (Windows)

If you prefer to install MongoDB locally:

### Step 1: Download MongoDB

1. Go to [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Select:
   - Version: Latest
   - Platform: Windows
   - Package: MSI
3. Click "Download"

### Step 2: Install MongoDB

1. Run the downloaded `.msi` file
2. Choose "Complete" installation
3. Install as a Windows Service (default)
4. Install MongoDB Compass (optional GUI tool)

### Step 3: Verify Installation

Open PowerShell and run:
```powershell
mongosh --version
```

Should show version number.

### Step 4: Start MongoDB Service

MongoDB should start automatically. If not:
```powershell
net start MongoDB
```

### Step 5: Update Backend .env

Keep the default in `backend/.env`:
```env
DATABASE_URI=mongodb://localhost:27017/internal-dashboard
```

---

## ✅ Verify Connection

After setting up MongoDB (Atlas or Local), test the connection:

```bash
cd backend
npm run seed
```

If successful, you'll see:
```
✅ Admin user created
✅ Manager user created
✅ Employee users created
...
🎉 Database seeded successfully!
```

---

## 🐛 Troubleshooting

### "MongoServerError: bad auth"
- Check username and password in connection string
- Verify database user was created in Atlas

### "MongoNetworkError: connection refused"
- For Atlas: Check IP whitelist
- For Local: Check MongoDB service is running

### "MongooseServerSelectionError"
- For Atlas: Verify connection string is correct
- For Local: Check MongoDB is installed and running

---

## 📚 Next Steps

Once MongoDB is set up:

1. Seed the database: `npm run seed`
2. Start backend: `npm run dev`
3. Test at: http://localhost:4000/admin

---

**Recommendation:** Use MongoDB Atlas for easier setup and no local installation required!
