'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { apiClient } from '@/lib/api-client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Employee } from '@/types'
import { Edit } from 'lucide-react'

export default function EditEmployeePage() {
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [formData, setFormData] = useState({
    // User fields
    name: '',
    email: '',
    role: 'employee',
    // Employee fields
    department: '',
    designation: '',
    status: 'Active',
    joinDate: '',
    salary: ''
  })
  const [userId, setUserId] = useState('')

  useEffect(() => {
    const fetchEmployee = async () => {
      console.log('📥 Fetching employee data for ID:', params.id)
      
      try {
        const response = await apiClient.get(`/employees/${params.id}?depth=1`)
        const employee: Employee = response.data
        
        console.log('✅ Employee data fetched:', employee)

        const user = typeof employee.user === 'object' ? employee.user : null
        
        if (user) {
          setUserId(user.id)
          setFormData({
            name: user.name,
            email: user.email,
            role: user.role,
            department: employee.department,
            designation: employee.designation,
            status: employee.status,
            joinDate: employee.joinDate.split('T')[0],
            salary: employee.salary?.toString() || ''
          })
        }
      } catch (error) {
        console.error('❌ Failed to fetch employee:', error)
        alert('Failed to load employee data')
      } finally {
        setFetchLoading(false)
      }
    }

    fetchEmployee()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    console.log('📝 Updating employee with data:', formData)

    try {
      // Step 1: Update User account
      console.log('👤 Step 1: Updating user account...')
      await apiClient.patch(`/users/${userId}`, {
        name: formData.name,
        email: formData.email,
        role: formData.role,
      })

      console.log('✅ User updated')

      // Step 2: Update Employee record
      console.log('💼 Step 2: Updating employee record...')
      await apiClient.patch(`/employees/${params.id}`, {
        department: formData.department,
        designation: formData.designation,
        status: formData.status,
        joinDate: formData.joinDate,
        salary: formData.salary ? parseFloat(formData.salary) : undefined,
      })

      console.log('✅ Employee updated')
      console.log('🎉 Employee update complete!')

      alert('Employee updated successfully!')
      router.push(`/dashboard/employees/${params.id}`)
    } catch (error: any) {
      console.error('❌ Failed to update employee:', error)
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update employee'
      alert(`Error: ${errorMessage}`)
    } finally {
      setLoading(false)
    }
  }

  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Employee</h1>
        <p className="text-gray-600 mt-1">Update employee and user account information</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User Account Section */}
          <div className="border-b pb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Edit className="w-5 h-5 mr-2" />
              User Account Information
            </h2>
            
            <div className="space-y-4">
              <Input
                label="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />

              <Input
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />

              <Select
                label="User Role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
              >
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </Select>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  💡 To change password, the user must use the "Forgot Password" feature or contact an admin.
                </p>
              </div>
            </div>
          </div>

          {/* Employee Details Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Employee Details
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Department"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  required
                />

                <Input
                  label="Designation"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  required
                >
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Resigned">Resigned</option>
                </Select>

                <Input
                  label="Join Date"
                  type="date"
                  value={formData.joinDate}
                  onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                  required
                />
              </div>

              <Input
                label="Salary (Optional)"
                type="number"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                helperText="Only visible to admins"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" loading={loading}>
              <Edit className="w-4 h-4 mr-2" />
              Update Employee
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
