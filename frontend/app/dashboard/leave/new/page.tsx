'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { apiClient } from '@/lib/api-client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'

export default function NewLeavePage() {
  const router = useRouter()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    leaveType: 'Vacation',
    startDate: '',
    endDate: '',
    reason: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (new Date(formData.endDate) <= new Date(formData.startDate)) {
      alert('End date must be after start date')
      return
    }

    setLoading(true)

    try {
      await apiClient.post('/leave-requests', {
        ...formData,
        employee: user?.id,
        status: 'Pending'
      })
      router.push('/dashboard/leave')
    } catch (error) {
      console.error('Failed to submit leave request:', error)
      alert('Failed to submit leave request')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Request Leave</h1>
        <p className="text-gray-600 mt-1">Submit a new leave request</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Select
            label="Leave Type"
            value={formData.leaveType}
            onChange={(e) => setFormData({ ...formData, leaveType: e.target.value })}
            required
          >
            <option value="Sick">Sick Leave</option>
            <option value="Vacation">Vacation</option>
            <option value="Personal">Personal Leave</option>
            <option value="Unpaid">Unpaid Leave</option>
          </Select>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Start Date"
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              required
            />

            <Input
              label="End Date"
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              required
            />
          </div>

          <Textarea
            label="Reason"
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            rows={4}
            placeholder="Please provide a reason for your leave request"
            required
          />

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              Your leave request will be submitted for approval. You will be notified once it has been reviewed.
            </p>
          </div>

          <div className="flex gap-4">
            <Button type="submit" loading={loading}>
              Submit Request
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
