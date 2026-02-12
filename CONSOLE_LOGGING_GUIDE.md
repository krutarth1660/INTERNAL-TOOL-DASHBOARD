# 🔍 Console Logging Guide

## Overview

The application now has comprehensive console logging to help you track all operations and debug issues. Open your browser's Developer Console (F12) to see all the logs.

---

## 📊 Log Categories

### 🔧 System Initialization
**When:** Application starts
**Where:** Browser Console & Terminal

```
🔧 API Client initialized with URL: http://localhost:4000/api
🔧 Starting server initialization...
📝 Environment: { NODE_ENV, PORT, MONGODB_URI, etc. }
```

### 🔐 Authentication Logs
**When:** Login, Logout, Token checks
**Where:** Browser Console

```
🔐 Attempting login for: user@example.com
✅ Login successful: { user, tokenLength, expiresAt }
💾 Auth data stored in localStorage
🚪 Logging out...
🗑️ Auth data cleared from localStorage
🔒 Authentication status: Authenticated
```

### 📤 API Request Logs
**When:** Every API call
**Where:** Browser Console

```
📤 API Request: GET /employees
  data: { ... }
  params: { ... }
  hasToken: true

✅ API Response: GET /employees
  status: 200
  dataCount: 5
  totalDocs: 5
  data: { docs: [...] }
```

### ❌ Error Logs
**When:** API errors occur
**Where:** Browser Console

```
❌ API Error: POST /tasks
  status: 400
  message: "Validation failed"
  errors: [...]

🔒 Unauthorized - Clearing auth and redirecting to login
```

### 🌱 Database Seeding
**When:** Running seed script
**Where:** Terminal

```
🌱 Seeding database...
🗑️  Clearing existing data...
✅ Existing data cleared
📝 Creating new data...
✅ Admin user created
✅ Manager user created
✅ Employee users created
✅ Employee records created
✅ Projects created
✅ Tasks created
✅ Leave requests created

🎉 Database seeded successfully!

📝 Login Credentials:
Admin: admin@example.com / admin123
Manager: manager@example.com / manager123
Employee: employee1@example.com / employee123
```

### 🚀 Server Startup
**When:** Backend starts
**Where:** Terminal

```
============================================================
🎉 SERVER READY!
============================================================
🚀 Server running on: http://localhost:4000
📊 Admin Panel: http://localhost:4000/admin
🔌 API Endpoint: http://localhost:4000/api
📝 API Docs: http://localhost:4000/api-docs
============================================================

💡 Tip: Use the seed script to populate test data
   Run: npm run seed
```

---

## 🎯 How to Use Console Logs

### 1. Open Browser Developer Console
- **Chrome/Edge:** Press `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
- **Firefox:** Press `F12` or `Ctrl+Shift+K` (Windows) / `Cmd+Option+K` (Mac)
- Click on the **Console** tab

### 2. Filter Logs by Type
Use the console filter to find specific logs:
- Type `🔐` to see only authentication logs
- Type `📤` to see only API requests
- Type `✅` to see only successful operations
- Type `❌` to see only errors

### 3. Monitor Specific Operations

**Login Flow:**
```
1. 🔐 Attempting login for: admin@example.com
2. 📤 API Request: POST /users/login
3. ✅ API Response: POST /users/login
4. ✅ Login successful: { user: {...}, tokenLength: 150 }
5. 💾 Auth data stored in localStorage
```

**Fetching Data:**
```
1. 📤 API Request: GET /employees?depth=1
2. ✅ API Response: GET /employees?depth=1
   status: 200
   dataCount: 5
   totalDocs: 5
   data: { docs: [...] }
```

**Creating Data:**
```
1. 📤 API Request: POST /projects
   data: { name: "New Project", ... }
2. ✅ API Response: POST /projects
   status: 201
   data: { id: "...", name: "New Project" }
```

**Error Handling:**
```
1. 📤 API Request: POST /tasks
2. ❌ API Error: POST /tasks
   status: 400
   message: "Validation failed"
   errors: ["Due date is required"]
```

---

## 🔍 Debugging Common Issues

### Issue: "Cannot read properties of undefined"
**Check Console For:**
```
❌ API Error: GET /employees
  status: 401
  message: "Unauthorized"
```
**Solution:** Token expired or invalid. Log in again.

### Issue: "No data showing"
**Check Console For:**
```
✅ API Response: GET /employees
  dataCount: 0
  totalDocs: 0
```
**Solution:** Database is empty. Run seed script: `npm run seed`

### Issue: "Login not working"
**Check Console For:**
```
❌ API Error: POST /users/login
  status: 401
  message: "Invalid credentials"
```
**Solution:** Check email/password. Use seed credentials.

### Issue: "CORS error"
**Check Terminal For:**
```
🌐 CORS enabled for: http://localhost:3000
```
**Solution:** Ensure frontend URL matches CORS origin.

---

## 📋 Log Emoji Reference

| Emoji | Meaning | Example |
|-------|---------|---------|
| 🔧 | System initialization | API Client setup |
| 🔐 | Authentication | Login/Logout |
| 📤 | API Request | Outgoing HTTP request |
| ✅ | Success | Operation completed |
| ❌ | Error | Operation failed |
| 🔒 | Security | Unauthorized access |
| 💾 | Storage | Data saved to localStorage |
| 🗑️ | Deletion | Data removed |
| 👤 | User | User-related operation |
| 🔑 | Token | Token check/validation |
| 📦 | Data | Data retrieved |
| ℹ️ | Info | Informational message |
| ⚠️ | Warning | Non-critical issue |
| 🌱 | Seeding | Database seeding |
| 🚀 | Server | Server startup |
| 📊 | Admin | Admin panel |
| 🔌 | API | API endpoint |
| 🌐 | CORS | CORS configuration |
| 📍 | Route | Route accessed |
| 🎉 | Complete | Task completed |
| 💡 | Tip | Helpful information |

---

## 🛠️ Advanced Debugging

### Enable Verbose Logging
To see even more details, open the console and run:
```javascript
localStorage.setItem('debug', 'true')
```

### Clear All Logs
```javascript
console.clear()
```

### Export Logs
Right-click in console → "Save as..." to export logs to a file

### Monitor Network Requests
1. Open Developer Tools (F12)
2. Click **Network** tab
3. Filter by **XHR** to see API calls
4. Click any request to see:
   - Request headers
   - Request payload
   - Response data
   - Response time

---

## 📝 Example Console Output

### Successful Login Flow
```
🔧 API Client initialized with URL: http://localhost:4000/api
🔐 Attempting login for: admin@example.com
📤 API Request: POST /users/login
  data: { email: "admin@example.com", password: "***" }
  params: {}
  hasToken: false
✅ API Response: POST /users/login
  status: 200
  dataCount: N/A
  totalDocs: N/A
  data: { user: {...}, token: "...", exp: 1234567890 }
✅ Login successful:
  user: { id: "123", email: "admin@example.com", name: "Admin User", role: "admin" }
  tokenLength: 150
  expiresAt: "2/12/2026, 10:30:00 AM"
💾 Auth data stored in localStorage
```

### Fetching Dashboard Data
```
📤 API Request: GET /employees?limit=1
✅ API Response: GET /employees?limit=1
  status: 200
  dataCount: 1
  totalDocs: 5
  data: { docs: [...], totalDocs: 5 }

📤 API Request: GET /projects?limit=1
✅ API Response: GET /projects?limit=1
  status: 200
  dataCount: 1
  totalDocs: 3
  data: { docs: [...], totalDocs: 3 }
```

---

## 🎓 Tips for Effective Debugging

1. **Keep Console Open:** Always have the console open while developing
2. **Read Error Messages:** Error logs contain detailed information
3. **Check Network Tab:** See actual HTTP requests and responses
4. **Use Filters:** Filter console by emoji or keywords
5. **Check Token:** Verify token exists with `localStorage.getItem('token')`
6. **Check User:** Verify user data with `localStorage.getItem('user')`
7. **Clear Cache:** If issues persist, clear browser cache and localStorage
8. **Restart Servers:** Sometimes a fresh restart helps

---

## 🚨 Common Error Messages

### "Token not found"
```
🔑 Token check: Not found
🔒 Authentication status: Not authenticated
```
**Fix:** Log in again

### "API Error: 401"
```
❌ API Error: GET /employees
  status: 401
  message: "Unauthorized"
🔒 Unauthorized - Clearing auth and redirecting to login
```
**Fix:** Session expired, logging in again

### "API Error: 404"
```
❌ API Error: GET /projects/invalid-id
  status: 404
  message: "Not found"
```
**Fix:** Resource doesn't exist

### "API Error: 400"
```
❌ API Error: POST /tasks
  status: 400
  message: "Validation failed"
  errors: ["Title is required", "Due date must be in the future"]
```
**Fix:** Check form validation

---

## 📞 Need Help?

If you see unexpected logs or errors:
1. Copy the console output
2. Check the error message
3. Look for the emoji indicators
4. Follow the debugging steps above
5. Check the Network tab for more details

**Happy Debugging! 🐛🔍**
