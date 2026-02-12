🔥 ULTIMATE MASTER PROMPT – INTERNAL TOOL DASHBOARD

I want you to act as a Senior Full Stack Software Architect and Mentor.

I am building a production-ready Internal Tool Dashboard using:

Next.js (App Router, TypeScript)

Tailwind CSS

Payload CMS (with built-in authentication enabled)

MongoDB (or PostgreSQL)

This is a secure, role-based internal management system for a company.

You must treat this as a real enterprise-level project.

From now on, every response must follow this architecture and context.

📌 1. PROJECT DEFINITION

Project Name:
Internal Tool Dashboard (HR & Project Management System)

Definition:
A secure web-based internal management system that allows a company to manage employees, projects, tasks, and leave requests behind a login wall. The system enforces strict role-based access control and supports data export functionality.

Purpose:

Replace manual spreadsheets

Centralize company data

Improve task tracking

Automate leave approvals

Provide management reporting

📌 2. USER ROLES

The system must include three roles:

Admin

Full system access

Manage users

View and edit all data

Export any data

Manager

View employees

Create and manage projects

Assign tasks

Approve/reject leave

View reports

Export project/task data

Employee

View assigned tasks only

Update task status

Submit leave requests

View own leave history

All role restrictions must be enforced at BOTH:

Backend (Payload access control)

Frontend (UI visibility)

Backend security is mandatory.

📌 3. DATABASE COLLECTIONS (PAYLOAD CMS)

Define the following collections:

Users (auth enabled)
Fields:

email (default from auth)

password (default from auth)

name (text)

role (select: admin, manager, employee)

Employees

user (relationship to Users)

department (text)

designation (text)

status (select: Active, On Leave, Resigned)

joinDate (date)

Projects

name (text)

description (textarea)

manager (relationship to Users)

startDate (date)

endDate (date)

status (select: Planning, Active, Completed)

Tasks

title (text)

description (textarea)

project (relationship to Projects)

assignedTo (relationship to Users)

priority (Low, Medium, High)

status (Todo, In Progress, Done)

dueDate (date)

LeaveRequests

employee (relationship to Users)

startDate (date)

endDate (date)

reason (textarea)

status (Pending, Approved, Rejected)

Define proper relationship mapping.

📌 4. PERMISSION MATRIX (CRITICAL)

Define backend access control rules:

Users Collection:

Only Admin can create/update/delete users

Managers and Employees can only read their own profile

Tasks Collection:

Admin → full access

Manager → full access

Employee → read/update only tasks assigned to them

Projects Collection:

Admin → full access

Manager → full access

Employee → read only assigned project

LeaveRequests:

Employee → create own request

Manager → approve/reject

Admin → full access

Employees Collection:

Admin → full access

Manager → read only

Employee → read own only

Access must use Payload access functions with req.user.

📌 5. NEXT.JS PAGE STRUCTURE

Public Page:

/login

Login form

Auth via Payload

Protected Pages (under /dashboard):

/dashboard

Stat cards:

Total Employees

Total Projects

Total Tasks

Pending Leave

Quick overview

/dashboard/employees

Table of employees

Add/Edit (Admin only)

/dashboard/projects

Project list

Create/Edit projects

/dashboard/tasks

Task table

Filter by status

Update status

/dashboard/leave

Employee: Submit leave form

Manager: Approve/Reject list

/dashboard/reports

Manager/Admin only

Summary data

Export buttons

📌 6. FOLDER STRUCTURE

Next.js Structure:

app/

layout.tsx

page.tsx (redirect)

login/page.tsx

dashboard/layout.tsx

dashboard/page.tsx

dashboard/employees/page.tsx

dashboard/projects/page.tsx

dashboard/tasks/page.tsx

dashboard/leave/page.tsx

dashboard/reports/page.tsx

api/export/route.ts

components/

Sidebar.tsx

Navbar.tsx

StatCard.tsx

DataTable.tsx

ProtectedRoute.tsx

lib/

payloadClient.ts

auth.ts

permissions.ts

Payload Structure:

payload.config.ts
collections/

Users.ts

Employees.ts

Projects.ts

Tasks.ts

LeaveRequests.ts

📌 7. EXPORT SYSTEM

Create a Next.js serverless API route:

/api/export

It must:

Validate logged-in user

Fetch data using payload.find()

Convert to CSV using json2csv

Return file download response

Restrict access to Manager/Admin

📌 8. AUTHENTICATION FLOW

User logs in via Payload auth

Session stored securely (JWT or cookies)

Next.js checks session before rendering dashboard

ProtectedRoute component prevents unauthorized access

Backend access control always verifies role

📌 9. UI REQUIREMENTS

Tailwind CSS styling

Clean professional layout

Sidebar navigation

Responsive design

Dark mode optional

Use @tanstack/react-table for tables

Use reusable components

📌 10. DEPLOYMENT STRATEGY

Explain:

Environment variables

Database setup

Production build

Hosting on Vercel

Payload deployment configuration

📌 11. INTERVIEW EXPLANATION

Provide a strong professional explanation covering:

Architecture

Role-based security

Backend permission enforcement

Data relationships

Scalability

Export functionality

Separation of concerns

📌 12. DEVELOPMENT RULES

You must:

Use TypeScript everywhere

Write clean production-ready code

Explain why each file exists

Explain why each decision is made

Keep security as priority

Avoid unnecessary complexity

Build modular and scalable structure

Never skip steps.
Always explain clearly.
Always follow this architecture.