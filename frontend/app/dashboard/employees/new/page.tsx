'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { apiClient } from '@/lib/api-client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { UserPlus } from 'lucide-react'

export default function NewEmployeePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    // User fields
    name: '',
    email: '',
    password: '',
    role: 'employee',
    // Employee fields
    department: '',
    designation: '',
    status: 'Active',
    joinDate: '',
    salary: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    console.log('📝 Creating new employee with data:', formData)

    try {
      // Step 1: Create User account
      console.log('👤 Step 1: Creating user account...')
      const userResponse = await apiClient.post('/users', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      })

      console.log('✅ User created:', userResponse.data)

      // Step 2: Create Employee record
      console.log('💼 Step 2: Creating employee record...')
      const employeeResponse = await apiClient.post('/employees', {
        user: userResponse.data.doc.id,
        department: formData.department,
        designation: formData.designation,
        status: formData.status,
        joinDate: formData.joinDate,
        salary: formData.salary ? parseFloat(formData.salary) : undefined,
      })

      console.log('✅ Employee created:', employeeResponse.data)
      console.log('🎉 Employee creation complete!')

      alert('Employee created successfully!')
      router.push('/dashboard/employees')
    } catch (error: any) {
      console.error('❌ Failed to create employee:', error)
      const errorMessage = error.response?.data?.message || error.message || 'Failed to create employee'
      alert(`Error: ${errorMessage}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add New Employee</h1>
        <p className="text-gray-600 mt-1">Create a new employee with user account</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User Account Section */}
          <div className="border-b pb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <UserPlus className="w-5 h-5 mr-2" />
              User Account Information
            </h2>
            
            <div className="space-y-4">
              <Input
                label="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                required
              />

              <Input
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john.doe@example.com"
                required
              />

              <Input
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Minimum 8 characters"
                required
                helperText="User will use this to login"
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
                  placeholder="Engineering"
                  required
                />

                <Input
                  label="Designation"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  placeholder="Software Developer"
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
                placeholder="75000"
                helperText="Only visible to admins"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" loading={loading}>
              <UserPlus className="w-4 h-4 mr-2" />
              Create Employee
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
