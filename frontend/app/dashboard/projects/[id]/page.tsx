'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { apiClient } from '@/lib/api-client'
import { Project, Task } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Briefcase, Calendar, DollarSign, Edit, Trash2 } from 'lucide-react'

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [project, setProject] = useState<Project | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const [projectRes, tasksRes] = await Promise.all([
          apiClient.get(`/projects/${params.id}?depth=1`),
          apiClient.get(`/tasks?where[project][equals]=${params.id}&depth=1`)
        ])
        setProject(projectRes.data)
        setTasks(tasksRes.data.docs)
      } catch (error) {
        console.error('Failed to fetch project:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [params.id])

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      await apiClient.delete(`/projects/${params.id}`)
      router.push('/dashboard/projects')
    } catch (error) {
      console.error('Failed to delete project:', error)
      alert('Failed to delete project')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!project) {
    return <div>Project not found</div>
  }

  const canEdit = user?.role === 'admin' || (user?.role === 'manager' && typeof project.manager === 'object' && project.manager.id === user.id)

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
          <p className="text-gray-600 mt-1">Project Details</p>
        </div>
        {canEdit && (
          <div className="flex gap-2">
            <Link href={`/dashboard/projects/${project.id}/edit`}>
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
            <p className="text-gray-700 whitespace-pre-wrap">{project.description}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Tasks ({tasks.length})</h2>
              {(user?.role === 'admin' || user?.role === 'manager') && (
                <Link href={`/dashboard/tasks/new?project=${project.id}`}>
                  <Button size="sm">Add Task</Button>
                </Link>
              )}
            </div>
            {tasks.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No tasks yet</p>
            ) : (
              <div className="space-y-3">
                {tasks.map((task) => (
                  <Link key={task.id} href={`/dashboard/tasks/${task.id}`}>
                    <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{task.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Assigned to: {typeof task.assignedTo === 'object' ? task.assignedTo.name : 'N/A'}
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
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Info</h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center text-gray-600 mb-1">
                  <Briefcase className="w-4 h-4 mr-2" />
                  <span className="text-sm">Status</span>
                </div>
                <Badge
                  variant={
                    project.status === 'Active'
                      ? 'success'
                      : project.status === 'Completed'
                      ? 'info'
                      : 'warning'
                  }
                >
                  {project.status}
                </Badge>
              </div>

              <div>
                <div className="flex items-center text-gray-600 mb-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">Timeline</span>
                </div>
                <p className="text-gray-900">
                  {new Date(project.startDate).toLocaleDateString()}
                  {project.endDate && ` - ${new Date(project.endDate).toLocaleDateString()}`}
                </p>
              </div>

              {project.budget && (
                <div>
                  <div className="flex items-center text-gray-600 mb-1">
                    <DollarSign className="w-4 h-4 mr-2" />
                    <span className="text-sm">Budget</span>
                  </div>
                  <p className="text-gray-900">${project.budget.toLocaleString()}</p>
                </div>
              )}

              <div>
                <p className="text-sm text-gray-600 mb-1">Manager</p>
                <p className="text-gray-900">
                  {typeof project.manager === 'object' ? project.manager.name : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
