'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { apiClient } from '@/lib/api-client'
import { Task } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { CheckSquare, Calendar, Clock, Edit, Trash2 } from 'lucide-react'

export default function TaskDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [task, setTask] = useState<Task | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await apiClient.get(`/tasks/${params.id}?depth=1`)
        setTask(response.data)
      } catch (error) {
        console.error('Failed to fetch task:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTask()
  }, [params.id])

  const handleStatusUpdate = async (newStatus: string) => {
    setUpdating(true)
    try {
      const response = await apiClient.patch(`/tasks/${params.id}`, { status: newStatus })
      setTask(response.data)
    } catch (error) {
      console.error('Failed to update status:', error)
      alert('Failed to update status')
    } finally {
      setUpdating(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this task?')) return

    try {
      await apiClient.delete(`/tasks/${params.id}`)
      router.push('/dashboard/tasks')
    } catch (error) {
      console.error('Failed to delete task:', error)
      alert('Failed to delete task')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!task) {
    return <div>Task not found</div>
  }

  const canEdit = user?.role === 'admin' || user?.role === 'manager'
  const canUpdateStatus = canEdit || (typeof task.assignedTo === 'object' && task.assignedTo.id === user?.id)

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{task.title}</h1>
          <p className="text-gray-600 mt-1">Task Details</p>
        </div>
        {canEdit && (
          <div className="flex gap-2">
            <Link href={`/dashboard/tasks/${task.id}/edit`}>
              <Button variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </Link>
            {user?.role === 'admin' && (
              <Button variant="danger" onClick={handleDelete}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: task.description }} />
          </div>

          {canUpdateStatus && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Update Status</h2>
              <Select
                label="Status"
                value={task.status}
                onChange={(e) => handleStatusUpdate(e.target.value)}
                disabled={updating}
              >
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="In Review">In Review</option>
                <option value="Done">Done</option>
                <option value="Blocked">Blocked</option>
              </Select>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Task Info</h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center text-gray-600 mb-1">
                  <CheckSquare className="w-4 h-4 mr-2" />
                  <span className="text-sm">Status</span>
                </div>
                <Badge
                  variant={
                    task.status === 'Done'
                      ? 'success'
                      : task.status === 'In Progress'
                      ? 'info'
                      : task.status === 'Blocked'
                      ? 'danger'
                      : 'default'
                  }
                >
                  {task.status}
                </Badge>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Priority</p>
                <Badge
                  variant={
                    task.priority === 'Critical' || task.priority === 'High'
                      ? 'danger'
                      : task.priority === 'Medium'
                      ? 'warning'
                      : 'default'
                  }
                >
                  {task.priority}
                </Badge>
              </div>

              <div>
                <div className="flex items-center text-gray-600 mb-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">Due Date</span>
                </div>
                <p className="text-gray-900">{new Date(task.dueDate).toLocaleDateString()}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Project</p>
                <Link
                  href={`/dashboard/projects/${typeof task.project === 'object' ? task.project.id : task.project}`}
                  className="text-blue-600 hover:text-blue-900"
                >
                  {typeof task.project === 'object' ? task.project.name : 'N/A'}
                </Link>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Assigned To</p>
                <p className="text-gray-900">
                  {typeof task.assignedTo === 'object' ? task.assignedTo.name : 'N/A'}
                </p>
              </div>

              {(task.estimatedHours || task.actualHours) && (
                <div>
                  <div className="flex items-center text-gray-600 mb-1">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">Hours</span>
                  </div>
                  <p className="text-gray-900">
                    {task.estimatedHours && `Est: ${task.estimatedHours}h`}
                    {task.estimatedHours && task.actualHours && ' / '}
                    {task.actualHours && `Actual: ${task.actualHours}h`}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
