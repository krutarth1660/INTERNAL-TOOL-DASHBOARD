# 🚀 Quick Guide: Add Employee in 3 Steps

## Step 1: Login as Admin
```
1. Open: http://localhost:3000
2. Email: admin@example.com
3. Password: admin123
4. Click "Login"
```

## Step 2: Navigate to Add Employee
```
1. Click "Employees" in sidebar
2. Click "Add Employee" button (top right)
```

## Step 3: Fill the Form

### 👤 User Account Section
```
Full Name:       [Enter name, e.g., "John Smith"]
Email:           [Enter email, e.g., "john@company.com"]
Password:        [Enter password, min 8 chars]
Role:            [Select: employee / manager / admin]
```

### 💼 Employee Details Section
```
Department:      [Enter dept, e.g., "Engineering"]
Designation:     [Enter title, e.g., "Developer"]
Status:          [Select: Active / On Leave / Resigned]
Join Date:       [Select date from calendar]
Salary:          [Optional, e.g., "75000"]
```

### ✅ Submit
```
Click "Create Employee" button
Wait for success message
Done! ✅
```

---

## 📋 Example Employee Data

Copy and paste these examples:

### Example 1: Software Developer
```
Name: Sarah Johnson
Email: sarah.johnson@company.com
Password: sarah123
Role: employee
Department: Engineering
Designation: Software Developer
Status: Active
Join Date: 2024-01-15
Salary: 75000
```

### Example 2: Project Manager
```
Name: Michael Chen
Email: michael.chen@company.com
Password: michael123
Role: manager
Department: Management
Designation: Project Manager
Status: Active
Join Date: 2024-02-01
Salary: 90000
```

### Example 3: HR Specialist
```
Name: Emily Davis
Email: emily.davis@company.com
Password: emily123
Role: employee
Department: Human Resources
Designation: HR Specialist
Status: Active
Join Date: 2024-03-01
Salary: 65000
```

---

## 🎯 Quick Commands

### Start Application
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Add Multiple Employees via Seed
```bash
cd backend
npm run seed
```

---

## ✅ Checklist

Before adding employee:
- [ ] Backend running (port 4000)
- [ ] Frontend running (port 3000)
- [ ] Logged in as Admin
- [ ] On Employees page

Required fields:
- [ ] Full Name
- [ ] Email (unique)
- [ ] Password (min 8 chars)
- [ ] Role
- [ ] Department
- [ ] Designation
- [ ] Status
- [ ] Join Date

---

## 🔍 Verify Employee Added

After creating:
1. ✅ See success message
2. ✅ Redirected to employee list
3. ✅ New employee appears in table
4. ✅ Console shows: "🎉 Employee creation complete!"

---

## 💡 Pro Tips

1. **Unique Emails:** Each employee needs different email
2. **Strong Passwords:** Use at least 8 characters
3. **Consistent Departments:** Use same names (e.g., "Engineering" not "Eng")
4. **Choose Right Role:**
   - `employee` → Regular user (most common)
   - `manager` → Can manage projects
   - `admin` → Full access (use carefully)

---

## 🐛 Common Issues

**"Email already exists"**
→ Use different email

**"Password too short"**
→ Use 8+ characters

**Can't see "Add Employee" button**
→ Login as Admin

**Form not submitting**
→ Fill all required fields (marked with *)

---

## 📞 Need Help?

Press F12 to open console and see:
```
📝 Creating new employee...
👤 Creating user account...
✅ User created
💼 Creating employee record...
✅ Employee created
🎉 Complete!
```

---

**That's it! Start adding employees now!** 👥✨

For detailed guide, see: `HOW_TO_ADD_EMPLOYEES.md`
