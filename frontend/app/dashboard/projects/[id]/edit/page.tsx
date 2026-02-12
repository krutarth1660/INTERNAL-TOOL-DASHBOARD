'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { apiClient } from '@/lib/api-client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { User, Project } from '@/types'

export default function EditProjectPage() {
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [managers, setManagers] = useState<User[]>([])
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    manager: '',
    startDate: '',
    endDate: '',
    status: 'Planning',
    budget: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectRes, managersRes] = await Promise.all([
          apiClient.get(`/projects/${params.id}`),
          apiClient.get('/users?where[role][in]=admin,manager')
        ])
        
        const project: Project = projectRes.data
        setManagers(managersRes.data.docs)
        setFormData({
          name: project.name,
          description: project.description,
          manager: typeof project.manager === 'object' ? project.manager.id : project.manager,
          startDate: project.startDate.split('T')[0],
          endDate: project.endDate ? project.endDate.split('T')[0] : '',
          status: project.status,
          budget: project.budget?.toString() || ''
        })
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }
    }
    fetchData()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await apiClient.patch(`/projects/${params.id}`, {
        ...formData,
        budget: formData.budget ? parseFloat(formData.budget) : undefined
      })
      router.push(`/dashboard/projects/${params.id}`)
    } catch (error) {
      console.error('Failed to update project:', error)
      alert('Failed to update project')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Project</h1>
        <p className="text-gray-600 mt-1">Update project information</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Project Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <Textarea
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            required
          />

          <Select
            label="Project Manager"
            value={formData.manager}
            onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
            required
          >
            <option value="">Select a manager</option>
            {managers.map((manager) => (
              <option key={manager.id} value={manager.id}>
                {manager.name} ({manager.role})
              </option>
            ))}
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
            />
          </div>

          <Select
            label="Status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            required
          >
            <option value="Planning">Planning</option>
            <option value="Active">Active</option>
            <option value="On Hold">On Hold</option>
            <option value="Completed">Completed</option>
          </Select>

          <Input
            label="Budget"
            type="number"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            placeholder="Optional"
          />

          <div className="flex gap-4">
            <Button type="submit" loading={loading}>
              Update Project
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
