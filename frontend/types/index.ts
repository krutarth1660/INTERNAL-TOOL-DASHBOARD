export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'manager' | 'employee'
  createdAt: string
  updatedAt: string
}

export interface Employee {
  id: string
  user: User | string
  department: string
  designation: string
  status: 'Active' | 'On Leave' | 'Resigned'
  joinDate: string
  salary?: number
  createdAt: string
  updatedAt: string
}

export interface Project {
  id: string
  name: string
  description: string
  manager: User | string
  startDate: string
  endDate?: string
  status: 'Planning' | 'Active' | 'Completed' | 'On Hold'
  budget?: number
  createdAt: string
  updatedAt: string
}

export interface Task {
  id: string
  title: string
  description: any
  project: Project | string
  assignedTo: User | string
  priority: 'Low' | 'Medium' | 'High' | 'Critical'
  status: 'Todo' | 'In Progress' | 'In Review' | 'Done' | 'Blocked'
  dueDate: string
  estimatedHours?: number
  actualHours?: number
  createdAt: string
  updatedAt: string
}

export interface LeaveRequest {
  id: string
  employee: User | string
  leaveType: 'Sick' | 'Vacation' | 'Personal' | 'Unpaid'
  startDate: string
  endDate: string
  reason: string
  status: 'Pending' | 'Approved' | 'Rejected'
  approvedBy?: User | string
  approvalDate?: string
  rejectionReason?: string
  createdAt: string
  updatedAt: string
}

export interface PaginatedResponse<T> {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}
