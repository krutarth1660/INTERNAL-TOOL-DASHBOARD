'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { apiClient } from '@/lib/api-client'
import { Employee, Task, LeaveRequest } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { User, Calendar, Briefcase, Mail, DollarSign, Edit, Trash2 } from 'lucide-react'

export default function EmployeeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [leaves, setLeaves] = useState<LeaveRequest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEmployee = async () => {
      console.log('📥 Fetching employee details for ID:', params.id)
      
      try {
        const [employeeRes, tasksRes, leavesRes] = await Promise.all([
          apiClient.get(`/employees/${params.id}?depth=1`),
          apiClient.get(`/tasks?where[assignedTo][equals]=${typeof employeeRes.data.user === 'object' ? employeeRes.data.user.id : employeeRes.data.user}&depth=1`),
          apiClient.get(`/leave-requests?where[employee][equals]=${typeof employeeRes.data.user === 'object' ? employeeRes.data.user.id : employeeRes.data.user}&depth=1`)
        ])
        
        console.log('✅ Employee details fetched')
        
        setEmployee(employeeRes.data)
        setTasks(tasksRes.data.docs)
        setLeaves(leavesRes.data.docs)
      } catch (error) {
        console.error('❌ Failed to fetch employee:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEmployee()
  }, [params.id])

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this employee? This will also delete their user account.')) {
      return
    }

    console.log('🗑️ Deleting employee:', params.id)

    try {
      await apiClient.delete(`/employees/${params.id}`)
      console.log('✅ Employee deleted successfully')
      alert('Employee deleted successfully!')
      router.push('/dashboard/employees')
    } catch (error: any) {
      console.error('❌ Failed to delete employee:', error)
      const errorMessage = error.response?.data?.message || 'Failed to delete employee'
      alert(`Error: ${errorMessage}`)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!employee) {
    return <div>Employee not found</div>
  }

  const canViewSalary = user?.role === 'admin'

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {typeof employee.user === 'object' ? employee.user.name : 'Employee Details'}
          </h1>
          <p className="text-gray-600 mt-1">Employee Information</p>
        </div>
        {user?.role === 'admin' && (
          <div className="flex gap-2">
            <Link href={`/dashboard/employees/${employee.id}/edit`}>
              <Button variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </Link>
            <Button variant="danger" onClick={handleDelete}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-semibold">
                {typeof employee.user === 'object' ? employee.user.name.charAt(0).toUpperCase() : 'N'}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center text-gray-600 mb-1">
                  <User className="w-4 h-4 mr-2" />
                  <span className="text-sm">Name</span>
                </div>
                <p className="text-gray-900 font-medium">
                  {typeof employee.user === 'object' ? employee.user.name : 'N/A'}
                </p>
              </div>

              <div>
                <div className="flex items-center text-gray-600 mb-1">
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="text-sm">Email</span>
                </div>
                <p className="text-gray-900">
                  {typeof employee.user === 'object' ? employee.user.email : 'N/A'}
                </p>
              </div>

              <div>
                <div className="flex items-center text-gray-600 mb-1">
                  <Briefcase className="w-4 h-4 mr-2" />
                  <span className="text-sm">Department</span>
                </div>
                <p className="text-gray-900">{employee.department}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Designation</p>
                <p className="text-gray-900">{employee.designation}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Status</p>
                <Badge
                  variant={
                    employee.status === 'Active'
                      ? 'success'
                      : employee.status === 'On Leave'
                      ? 'warning'
                      : 'danger'
                  }
                >
                  {employee.status}
                </Badge>
              </div>

              <div>
                <div className="flex items-center text-gray-600 mb-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">Join Date</span>
                </div>
                <p className="text-gray-900">{new Date(employee.joinDate).toLocaleDateString()}</p>
              </div>

              {canViewSalary && employee.salary && (
                <div>
                  <div className="flex items-center text-gray-600 mb-1">
                    <DollarSign className="w-4 h-4 mr-2" />
                    <span className="text-sm">Salary</span>
                  </div>
                  <p className="text-gray-900">${employee.salary.toLocaleString()}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Assigned Tasks ({tasks.length})</h2>
            {tasks.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No tasks assigned</p>
            ) : (
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{task.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Project: {typeof task.project === 'object' ? task.project.name : 'N/A'}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant={task.priority === 'Critical' || task.priority === 'High' ? 'danger' : 'default'}>
                          {task.priority}
                        </Badge>
                        <Badge variant={task.status === 'Done' ? 'success' : 'warning'}>
                          {task.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Leave History ({leaves.length})</h2>
            {leaves.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No leave requests</p>
            ) : (
              <div className="space-y-3">
                {leaves.map((leave) => (
                  <div key={leave.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={leave.status === 'Approved' ? 'success' : leave.status === 'Rejected' ? 'danger' : 'warning'}>
                            {leave.status}
                          </Badge>
                          <span className="text-sm text-gray-600">{leave.leaveType}</span>
                        </div>
                        <p className="text-sm text-gray-900">
                          {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">{leave.reason}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
