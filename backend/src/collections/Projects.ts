import { CollectionConfig } from 'payload/types'
import { isAdmin } from '../access/isAdmin'
import { isAdminOrManager } from '../access/isAdminOrManager'

const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'manager', 'status', 'startDate'],
  },
  access: {
    // Admin and Manager can read all, Employee can read assigned projects
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin' || user.role === 'manager') return true
      
      // Employee can read projects they're assigned to (via tasks)
      // This is simplified - in production, you'd query tasks collection
      return true // Will be filtered by tasks relationship
    },
    // Admin and Manager can create
    create: isAdminOrManager,
    // Admin can update all, Manager can update own projects
    update: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      
      if (user.role === 'manager') {
        return {
          manager: {
            equals: user.id
          }
        }
      }
      
      return false
    },
    // Only admin can delete
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'manager',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
      filterOptions: {
        role: {
          in: ['admin', 'manager']
        }
      },
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
    },
    {
      name: 'endDate',
      type: 'date',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'Planning',
      options: [
        {
          label: 'Planning',
          value: 'Planning',
        },
        {
          label: 'Active',
          value: 'Active',
        },
        {
          label: 'Completed',
          value: 'Completed',
        },
        {
          label: 'On Hold',
          value: 'On Hold',
        },
      ],
    },
    {
      name: 'budget',
      type: 'number',
      access: {
        read: ({ req: { user } }) => {
          if (!user) return false
          return user.role === 'admin' || user.role === 'manager'
        },
        update: ({ req: { user } }) => {
          if (!user) return false
          return user.role === 'admin' || user.role === 'manager'
        },
      },
    },
  ],
}

export default Projects
