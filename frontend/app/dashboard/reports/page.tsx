'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { apiClient } from '@/lib/api-client'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Select } from '@/components/ui/Select'
import { Download, BarChart3, Users, Briefcase, CheckSquare, Calendar } from 'lucide-react'

export default function ReportsPage() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [exporting, setExporting] = useState(false)
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalProjects: 0,
    totalTasks: 0,
    pendingLeaves: 0,
    activeProjects: 0,
    completedTasks: 0
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [employees, projects, tasks, leaves] = await Promise.all([
          apiClient.get('/employees'),
          apiClient.get('/projects'),
          apiClient.get('/tasks'),
          apiClient.get('/leave-requests?where[status][equals]=Pending')
        ])

        setStats({
          totalEmployees: employees.data.totalDocs,
          totalProjects: projects.data.totalDocs,
          totalTasks: tasks.data.totalDocs,
          pendingLeaves: leaves.data.totalDocs,
          activeProjects: projects.data.docs.filter((p: any) => p.status === 'Active').length,
          completedTasks: tasks.data.docs.filter((t: any) => t.status === 'Done').length
        })
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const handleExport = async (collection: string) => {
    setExporting(true)
    try {
      const response = await fetch(`/api/export?collection=${collection}`)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${collection}-${Date.now()}.csv`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Export failed:', error)
      alert('Failed to export data')
    } finally {
      setExporting(false)
    }
  }

  if (user?.role === 'employee') {
    return (
      <div className="bg-white rounded-lg shadow p-12 text-center">
        <BarChart3 className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Access Restricted</h3>
        <p className="text-gray-600">Reports are only available to Managers and Admins.</p>
      </div>
    )
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-600 mt-1">View insights and export data</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Employees</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalEmployees}</p>
            </div>
            <Users className="w-12 h-12 text-blue-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Projects</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalProjects}</p>
              <p className="text-xs text-green-600 mt-1">{stats.activeProjects} active</p>
            </div>
            <Briefcase className="w-12 h-12 text-green-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Tasks</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalTasks}</p>
              <p className="text-xs text-purple-600 mt-1">{stats.completedTasks} completed</p>
            </div>
            <CheckSquare className="w-12 h-12 text-purple-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pending Leaves</p>
              <p className="text-3xl font-bold text-gray-900">{stats.pendingLeaves}</p>
            </div>
            <Calendar className="w-12 h-12 text-orange-600" />
          </div>
        </Card>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Export Data</h2>
        <p className="text-gray-600 mb-6">Download data in CSV format for further analysis</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Employees</h3>
            <p className="text-sm text-gray-600 mb-4">Export all employee records</p>
            <Button
              onClick={() => handleExport('employees')}
              loading={exporting}
              variant="outline"
              className="w-full"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Employees
            </Button>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Projects</h3>
            <p className="text-sm text-gray-600 mb-4">Export all project data</p>
            <Button
              onClick={() => handleExport('projects')}
              loading={exporting}
              variant="outline"
              className="w-full"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Projects
            </Button>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Tasks</h3>
            <p className="text-sm text-gray-600 mb-4">Export all task records</p>
            <Button
              onClick={() => handleExport('tasks')}
              loading={exporting}
              variant="outline"
              className="w-full"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Tasks
            </Button>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Leave Requests</h3>
            <p className="text-sm text-gray-600 mb-4">Export leave request history</p>
            <Button
              onClick={() => handleExport('leave-requests')}
              loading={exporting}
              variant="outline"
              className="w-full"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Leave Requests
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
