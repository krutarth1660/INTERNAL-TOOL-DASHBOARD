'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { apiClient } from '@/lib/api-client'
import { LeaveRequest } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Calendar } from 'lucide-react'

export default function LeavePage() {
  const { user } = useAuth()
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      console.log('📥 Fetching leave requests...')
      
      try {
        const response = await apiClient.get('/leave-requests?depth=1')
        console.log('✅ Leave requests fetched:', response.data.docs.length, 'requests')
        setLeaveRequests(response.data.docs)
      } catch (error) {
        console.error('❌ Failed to fetch leave requests:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLeaveRequests()
  }, [])

  const handleApprove = async (id: string) => {
    console.log('✅ Approving leave request:', id)
    
    try {
      await apiClient.patch(`/leave-requests/${id}`, { status: 'Approved' })
      console.log('✅ Leave request approved successfully')
      setLeaveRequests(prev =>
        prev.map(req => req.id === id ? { ...req, status: 'Approved' } : req)
      )
      alert('Leave request approved!')
    } catch (error: any) {
      console.error('❌ Failed to approve leave:', error)
      const errorMessage = error.response?.data?.message || 'Failed to approve leave request'
      alert(`Error: ${errorMessage}`)
    }
  }

  const handleReject = async (id: string) => {
    const reason = prompt('Please provide a reason for rejection:')
    if (!reason) return

    console.log('❌ Rejecting leave request:', id, 'Reason:', reason)

    try {
      await apiClient.patch(`/leave-requests/${id}`, {
        status: 'Rejected',
        rejectionReason: reason
      })
      console.log('✅ Leave request rejected successfully')
      setLeaveRequests(prev =>
        prev.map(req => req.id === id ? { ...req, status: 'Rejected', rejectionReason: reason } : req)
      )
      alert('Leave request rejected!')
    } catch (error: any) {
      console.error('❌ Failed to reject leave:', error)
      const errorMessage = error.response?.data?.message || 'Failed to reject leave request'
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

  const canApprove = user?.role === 'admin'

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leave Requests</h1>
          <p className="text-gray-600 mt-1">Manage leave requests and time off</p>
        </div>
        <Link href="/dashboard/leave/new">
          <Button>
            <Calendar className="w-4 h-4 mr-2" />
            Request Leave
          </Button>
        </Link>
      </div>

      {leaveRequests.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No leave requests found</h3>
          <p className="text-gray-600">Submit your first leave request to get started.</p>
        </div>
      ) : (
        <>
          {!canApprove && user?.role === 'manager' && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-yellow-800">
                ℹ️ Note: Only Admins can approve or reject leave requests. You can view all requests but cannot take action.
              </p>
            </div>
          )}
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Leave Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  End Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                {canApprove && (
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leaveRequests.map((leave) => (
                <tr key={leave.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {typeof leave.employee === 'object' ? leave.employee.name : 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {leave.leaveType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(leave.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(leave.endDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge
                      variant={
                        leave.status === 'Approved'
                          ? 'success'
                          : leave.status === 'Rejected'
                          ? 'danger'
                          : 'warning'
                      }
                    >
                      {leave.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {leave.reason}
                  </td>
                  {canApprove && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {leave.status === 'Pending' && (
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => handleApprove(leave.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(leave.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </>
      )}
    </div>
  )
}
