'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { apiClient } from '@/lib/api-client'
import { Users, FolderKanban, CheckSquare, Calendar } from 'lucide-react'

interface Stats {
  employees: number
  projects: number
  tasks: number
  pendingLeaves: number
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState<Stats>({
    employees: 0,
    projects: 0,
    tasks: 0,
    pendingLeaves: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [employeesRes, projectsRes, tasksRes, leavesRes] = await Promise.all([
          apiClient.get('/employees?limit=1'),
          apiClient.get('/projects?limit=1'),
          apiClient.get('/tasks?limit=1'),
          apiClient.get('/leave-requests?where[status][equals]=Pending&limit=1'),
        ])

        setStats({
          employees: employeesRes.data.totalDocs || 0,
          projects: projectsRes.data.totalDocs || 0,
          tasks: tasksRes.data.totalDocs || 0,
          pendingLeaves: leavesRes.data.totalDocs || 0,
        })
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      title: 'Total Employees',
      value: stats.employees,
      icon: Users,
      color: 'bg-blue-500',
      show: user?.role === 'admin' || user?.role === 'manager',
    },
    {
      title: 'Active Projects',
      value: stats.projects,
      icon: FolderKanban,
      color: 'bg-green-500',
      show: true,
    },
    {
      title: 'Total Tasks',
      value: stats.tasks,
      icon: CheckSquare,
      color: 'bg-purple-500',
      show: true,
    },
    {
      title: 'Pending Leaves',
      value: stats.pendingLeaves,
      icon: Calendar,
      color: 'bg-orange-500',
      show: user?.role === 'admin' || user?.role === 'manager',
    },
  ].filter(card => card.show)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600 mt-2">Here's what's happening with your projects today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <div
              key={card.title}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
                </div>
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {user?.role !== 'employee' && (
            <a
              href="/dashboard/tasks/new"
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
            >
              <CheckSquare className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="font-medium text-gray-700">Create New Task</p>
            </a>
          )}
          <a
            href="/dashboard/leave/new"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
          >
            <Calendar className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="font-medium text-gray-700">Request Leave</p>
          </a>
          <a
            href="/dashboard/tasks"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
          >
            <CheckSquare className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="font-medium text-gray-700">View My Tasks</p>
          </a>
        </div>
      </div>
    </div>
  )
}
