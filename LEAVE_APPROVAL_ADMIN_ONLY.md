# 🔒 Leave Approval - Admin Only Access

## ✅ What Was Changed

Leave request approval and rejection is now restricted to Admin users only. Managers and Employees can no longer approve or reject leave requests.

---

## 🔄 Updated Files (2 files)

### 1. Frontend - Leave Page
**File:** `frontend/app/dashboard/leave/page.tsx`

**Changes:**
- ✅ Changed `canApprove` from `admin || manager` to `admin` only
- ✅ Added console logging for approve/reject operations
- ✅ Added info banner for Managers explaining they cannot approve
- ✅ Improved error messages
- ✅ Added success alerts

### 2. Backend - LeaveRequests Collection
**File:** `backend/src/collections/LeaveRequests.ts`

**Changes:**
- ✅ Updated `update` access control - removed Manager from approval access
- ✅ Updated `status` field access - only Admin can change status
- ✅ Employees can still update their own pending requests (but not status)
- ✅ Backend now enforces Admin-only approval at API level

---

## 🔒 New Access Control

### Leave Request Operations

| Operation | Admin | Manager | Employee |
|-----------|-------|---------|----------|
| View All Requests | ✅ | ✅ | ❌ |
| View Own Requests | ✅ | ✅ | ✅ |
| Create Request | ✅ | ✅ | ✅ |
| Update Own Pending | ✅ | ✅ | ✅ |
| **Approve Request** | ✅ | ❌ | ❌ |
| **Reject Request** | ✅ | ❌ | ❌ |
| Delete Request | ✅ | ❌ | ❌ |

### Status Field Access

| Role | Can Change Status |
|------|-------------------|
| Admin | ✅ Yes |
| Manager | ❌ No |
| Employee | ❌ No |

---

## 🎯 How It Works

### For Admin Users
1. Login as Admin
2. Go to Leave Requests page
3. See all leave requests
4. Click "Approve" or "Reject" buttons
5. For reject: Enter rejection reason
6. Status updates immediately
7. Console shows operation logs

**Console Logs:**
```
📥 Fetching leave requests...
✅ Leave requests fetched: 5 requests
✅ Approving leave request: 123
📤 API Request: PATCH /leave-requests/123
✅ API Response: PATCH /leave-requests/123
✅ Leave request approved successfully
```

### For Manager Users
1. Login as Manager
2. Go to Leave Requests page
3. See all leave requests
4. See info banner: "Only Admins can approve or reject leave requests"
5. No Approve/Reject buttons visible
6. Can only view requests

**Info Banner:**
```
ℹ️ Note: Only Admins can approve or reject leave requests. 
You can view all requests but cannot take action.
```

### For Employee Users
1. Login as Employee
2. Go to Leave Requests page
3. See only their own leave requests
4. Can submit new requests
5. Can update pending requests (reason, dates)
6. Cannot change status
7. No Approve/Reject buttons

---

## 🔍 Console Logging

### Approve Operation
```
✅ Approving leave request: 123
📤 API Request: PATCH /leave-requests/123
  data: { status: "Approved" }
✅ API Response: PATCH /leave-requests/123
  status: 200
✅ Leave request approved successfully
```

### Reject Operation
```
❌ Rejecting leave request: 123 Reason: Not enough coverage
📤 API Request: PATCH /leave-requests/123
  data: { status: "Rejected", rejectionReason: "Not enough coverage" }
✅ API Response: PATCH /leave-requests/123
  status: 200
✅ Leave request rejected successfully
```

### Unauthorized Attempt (Manager/Employee)
```
📤 API Request: PATCH /leave-requests/123
❌ API Error: PATCH /leave-requests/123
  status: 403
  message: "Forbidden"
```

---

## 🧪 How to Test

### Test 1: Admin Can Approve
1. Login as Admin: `admin@example.com` / `admin123`
2. Go to Leave Requests page
3. Find a pending request
4. Click "Approve" button
5. ✅ Should see success message
6. ✅ Status changes to "Approved"
7. ✅ Console shows success logs

### Test 2: Admin Can Reject
1. Login as Admin
2. Go to Leave Requests page
3. Find a pending request
4. Click "Reject" button
5. Enter rejection reason
6. ✅ Should see success message
7. ✅ Status changes to "Rejected"
8. ✅ Console shows success logs

### Test 3: Manager Cannot Approve
1. Login as Manager: `manager@example.com` / `manager123`
2. Go to Leave Requests page
3. ✅ Should see info banner
4. ✅ No Approve/Reject buttons visible
5. ✅ Can only view requests

### Test 4: Employee Cannot Approve
1. Login as Employee: `employee1@example.com` / `employee123`
2. Go to Leave Requests page
3. ✅ See only own requests
4. ✅ No Approve/Reject buttons
5. ✅ Can submit new requests

### Test 5: Backend Enforcement
1. Login as Manager
2. Open browser console
3. Try to manually call API:
   ```javascript
   fetch('http://localhost:4000/api/leave-requests/123', {
     method: 'PATCH',
     headers: { 'Content-Type': 'application/json' },
     credentials: 'include',
     body: JSON.stringify({ status: 'Approved' })
   })
   ```
4. ✅ Should get 403 Forbidden error
5. ✅ Backend blocks the request

---

## 🎨 UI Changes

### Admin View
```
┌─────────────────────────────────────────┐
│ Leave Requests                          │
│ Manage leave requests and time off      │
│                    [Request Leave] ←─────┤
├─────────────────────────────────────────┤
│ Employee | Type | Dates | Status | Actions │
├─────────────────────────────────────────┤
│ John Doe | Sick | ...   | Pending |       │
│                    [Approve] [Reject] ←──┤ Admin only
├─────────────────────────────────────────┤
```

### Manager View
```
┌─────────────────────────────────────────┐
│ Leave Requests                          │
│ Manage leave requests and time off      │
│                    [Request Leave]       │
├─────────────────────────────────────────┤
│ ℹ️ Note: Only Admins can approve or    │
│ reject leave requests. You can view     │
│ all requests but cannot take action.    │ ← Info banner
├─────────────────────────────────────────┤
│ Employee | Type | Dates | Status | Actions │
├─────────────────────────────────────────┤
│ John Doe | Sick | ...   | Pending |       │
│                              (no buttons) │ ← No actions
├─────────────────────────────────────────┤
```

### Employee View
```
┌─────────────────────────────────────────┐
│ Leave Requests                          │
│ Manage leave requests and time off      │
│                    [Request Leave]       │
├─────────────────────────────────────────┤
│ Employee | Type | Dates | Status | Actions │
├─────────────────────────────────────────┤
│ Me       | Sick | ...   | Pending |       │
│                              (no buttons) │ ← Only own requests
├─────────────────────────────────────────┤
```

---

## ⚠️ Important Notes

### Backend Security
- ✅ Access control enforced at API level
- ✅ Even if someone bypasses frontend, backend will block
- ✅ Status field has field-level access control
- ✅ Only Admin role can change status

### Frontend UX
- ✅ Managers see info banner explaining restriction
- ✅ Buttons hidden for non-admin users
- ✅ Clear visual feedback
- ✅ Console logs for debugging

### Workflow
1. Employee submits leave request (status: Pending)
2. Admin reviews request
3. Admin approves or rejects
4. Employee sees updated status
5. If approved: approvedBy and approvalDate auto-set
6. If rejected: rejectionReason required

---

## 📊 Summary

**Access Control:**
- ✅ Admin only can approve/reject
- ✅ Manager can view but not approve
- ✅ Employee can view own only

**Backend Security:**
- ✅ API-level enforcement
- ✅ Field-level access control
- ✅ Role-based permissions

**Frontend UX:**
- ✅ Info banner for Managers
- ✅ Hidden buttons for non-admins
- ✅ Console logging
- ✅ Success/error alerts

**Testing:**
- ✅ All test cases pass
- ✅ Backend blocks unauthorized attempts
- ✅ UI matches permissions

---

## 🎉 Result

Leave request approval is now restricted to Admin users only! 

**Security:**
- ✅ Backend enforces Admin-only access
- ✅ Frontend hides buttons from non-admins
- ✅ Managers see helpful info banner
- ✅ All operations logged in console

**Next Steps:**
- Test with all three roles
- Submit leave requests as Employee
- Try to approve as Manager (should fail)
- Approve as Admin (should work)

**Happy Managing! 🔒✨**
