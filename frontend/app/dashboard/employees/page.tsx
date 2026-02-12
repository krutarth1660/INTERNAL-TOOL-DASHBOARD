'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { apiClient } from '@/lib/api-client'
import { Employee } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Users, Edit, Trash2 } from 'lucide-react'

export default function EmployeesPage() {
  const { user } = useAuth()
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)

  const fetchEmployees = async () => {
    console.log('📥 Fetching employees list...')
    try {
      const response = await apiClient.get('/employees?depth=1')
      console.log('✅ Employees fetched:', response.data.docs.length, 'employees')
      setEmployees(response.data.docs)
    } catch (error) {
      console.error('❌ Failed to fetch employees:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}? This will also delete their user account.`)) {
      return
    }

    console.log('🗑️ Deleting employee:', id)

    try {
      await apiClient.delete(`/employees/${id}`)
      console.log('✅ Employee deleted successfully')
      alert('Employee deleted successfully!')
      // Refresh the list
      fetchEmployees()
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

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
          <p className="text-gray-600 mt-1">Manage your team members</p>
        </div>
        {user?.role === 'admin' && (
          <Link href="/dashboard/employees/new">
            <Button>
              <Users className="w-4 h-4 mr-2" />
              Add Employee
            </Button>
          </Link>
        )}
      </div>

      {employees.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Users className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No employees found</h3>
          <p className="text-gray-600">Get started by adding your first employee.</p>
          {user?.role === 'admin' && (
            <Link href="/dashboard/employees/new">
              <Button className="mt-4">
                <Users className="w-4 h-4 mr-2" />
                Add Employee
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Designation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                        {typeof employee.user === 'object' ? employee.user.name.charAt(0).toUpperCase() : 'N'}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {typeof employee.user === 'object' ? employee.user.name : 'N/A'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {typeof employee.user === 'object' ? employee.user.email : ''}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.designation}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
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
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(employee.joinDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex gap-2 justify-end">
                      <Link
                        href={`/dashboard/employees/${employee.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </Link>
                      {user?.role === 'admin' && (
                        <>
                          <Link
                            href={`/dashboard/employees/${employee.id}/edit`}
                            className="text-green-600 hover:text-green-900 flex items-center"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(employee.id, typeof employee.user === 'object' ? employee.user.name : 'this employee')}
                            className="text-red-600 hover:text-red-900 flex items-center"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
