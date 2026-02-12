# 👥 How to Add Employees to Your Project

## 🚀 Quick Start - Add Employees via Web Interface

### Step 1: Start Your Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Wait for: `🎉 SERVER READY!`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Wait for: `✓ Ready in X.Xs`

---

### Step 2: Login as Admin

1. Open browser: http://localhost:3000
2. Login with Admin credentials:
   - **Email:** `admin@example.com`
   - **Password:** `admin123`

---

### Step 3: Add New Employee

1. Click **"Employees"** in the sidebar
2. Click **"Add Employee"** button (top right)
3. Fill in the form:

#### User Account Information
- **Full Name:** Enter employee's full name (e.g., "John Smith")
- **Email Address:** Enter work email (e.g., "john.smith@company.com")
- **Password:** Create a password (min 8 characters, e.g., "password123")
- **User Role:** Select role:
  - `employee` - Regular employee (default)
  - `manager` - Can manage projects and tasks
  - `admin` - Full system access

#### Employee Details
- **Department:** Enter department (e.g., "Engineering", "Sales", "HR")
- **Designation:** Enter job title (e.g., "Software Developer", "Sales Manager")
- **Status:** Select status:
  - `Active` - Currently working (default)
  - `On Leave` - Temporarily away
  - `Resigned` - No longer with company
- **Join Date:** Select the date they joined
- **Salary (Optional):** Enter salary amount (only visible to admins)

4. Click **"Create Employee"** button
5. ✅ Employee created! You'll see success message

---

### Step 4: Verify Employee Was Added

1. You'll be redirected to Employees list
2. Find the new employee in the table
3. Click **"View"** to see their details
4. Open browser console (F12) to see logs:
   ```
   📝 Creating new employee with data: {...}
   👤 Step 1: Creating user account...
   ✅ User created: {...}
   💼 Step 2: Creating employee record...
   ✅ Employee created: {...}
   🎉 Employee creation complete!
   ```

---

## 📋 Example: Adding Multiple Employees

### Employee 1 - Software Developer
```
User Account:
- Name: Sarah Johnson
- Email: sarah.johnson@company.com
- Password: sarah123
- Role: employee

Employee Details:
- Department: Engineering
- Designation: Senior Software Developer
- Status: Active
- Join Date: 2024-01-15
- Salary: 85000
```

### Employee 2 - Project Manager
```
User Account:
- Name: Michael Chen
- Email: michael.chen@company.com
- Password: michael123
- Role: manager

Employee Details:
- Department: Project Management
- Designation: Project Manager
- Status: Active
- Join Date: 2024-02-01
- Salary: 95000
```

### Employee 3 - HR Specialist
```
User Account:
- Name: Emily Davis
- Email: emily.davis@company.com
- Password: emily123
- Role: employee

Employee Details:
- Department: Human Resources
- Designation: HR Specialist
- Status: Active
- Join Date: 2024-03-10
- Salary: 65000
```

---

## 🔄 Option 2: Add Employees via Database Seed Script

If you want to add multiple employees quickly, update the seed script:

### Step 1: Edit Seed File

Open: `backend/src/seed/index.ts`

Add this code after the existing employee creation:

```typescript
// Create more employees
const employee3 = await payload.create({
  collection: 'users',
  data: {
    email: 'sarah.johnson@company.com',
    password: 'sarah123',
    name: 'Sarah Johnson',
    role: 'employee',
  },
})

await payload.create({
  collection: 'employees',
  data: {
    user: employee3.id,
    department: 'Engineering',
    designation: 'Senior Software Developer',
    status: 'Active',
    joinDate: '2024-01-15',
    salary: 85000,
  },
})

const employee4 = await payload.create({
  collection: 'users',
  data: {
    email: 'michael.chen@company.com',
    password: 'michael123',
    name: 'Michael Chen',
    role: 'manager',
  },
})

await payload.create({
  collection: 'employees',
  data: {
    user: employee4.id,
    department: 'Project Management',
    designation: 'Project Manager',
    status: 'Active',
    joinDate: '2024-02-01',
    salary: 95000,
  },
})

console.log('✅ Additional employees created')
```

### Step 2: Run Seed Script

```bash
cd backend
npm run seed
```

You'll see:
```
🌱 Seeding database...
✅ Admin user created
✅ Manager user created
✅ Employee users created
✅ Additional employees created
🎉 Database seeded successfully!
```

---

## 📊 Current Employees (From Seed Data)

After running the seed script, you have these test employees:

| Name | Email | Password | Role | Department |
|------|-------|----------|------|------------|
| Admin User | admin@example.com | admin123 | admin | - |
| Manager User | manager@example.com | manager123 | manager | - |
| John Doe | employee1@example.com | employee123 | employee | Engineering |
| Jane Smith | employee2@example.com | employee123 | employee | Design |

---

## ✏️ Edit Existing Employees

1. Go to Employees page
2. Click **"Edit"** button next to employee
3. Update any information
4. Click **"Update Employee"**
5. ✅ Changes saved!

---

## 🗑️ Delete Employees

1. Go to Employees page
2. Click **"Delete"** button next to employee
3. Confirm deletion in dialog
4. ✅ Employee and their user account deleted!

⚠️ **Warning:** Deleting an employee also deletes their user account and affects related data (tasks, leaves).

---

## 🔍 View Employee Details

1. Go to Employees page
2. Click **"View"** on any employee
3. See:
   - Personal information
   - Contact details
   - Employment details
   - Assigned tasks
   - Leave history

---

## 🎯 Quick Reference

### Add Employee Steps:
1. Login as Admin
2. Employees → Add Employee
3. Fill form
4. Create Employee
5. Done! ✅

### Required Fields:
- ✅ Full Name
- ✅ Email Address
- ✅ Password
- ✅ User Role
- ✅ Department
- ✅ Designation
- ✅ Status
- ✅ Join Date

### Optional Fields:
- Salary (Admin only visibility)

---

## 💡 Tips

1. **Use Strong Passwords:** Minimum 8 characters
2. **Unique Emails:** Each employee needs a unique email
3. **Choose Correct Role:**
   - `employee` - Most common, limited access
   - `manager` - Can manage projects/tasks
   - `admin` - Full system access (use sparingly)
4. **Set Realistic Join Dates:** Use actual employment start date
5. **Department Names:** Keep consistent (e.g., always "Engineering" not "Eng" or "Engineering Dept")

---

## 🐛 Troubleshooting

### Error: "Email already exists"
**Solution:** Use a different email address

### Error: "Password too short"
**Solution:** Use at least 8 characters

### Can't see "Add Employee" button
**Solution:** Make sure you're logged in as Admin

### Employee not appearing in list
**Solution:** 
1. Refresh the page
2. Check browser console for errors
3. Verify backend is running

---

## 📞 Need Help?

Open browser console (F12) to see detailed logs:
```
📝 Creating new employee with data: {...}
👤 Step 1: Creating user account...
✅ User created
💼 Step 2: Creating employee record...
✅ Employee created
🎉 Complete!
```

If you see errors, check:
1. Backend is running (Terminal 1)
2. Frontend is running (Terminal 2)
3. MongoDB is connected
4. All required fields are filled

---

## 🎉 You're Ready!

Now you can:
- ✅ Add new employees via web interface
- ✅ Edit employee information
- ✅ Delete employees when needed
- ✅ View employee details
- ✅ Assign tasks to employees
- ✅ Track employee leave requests

**Start adding your team members now!** 👥✨
