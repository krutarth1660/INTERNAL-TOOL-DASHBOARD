import { CollectionConfig } from 'payload/types'
import { isAdmin } from '../access/isAdmin'
import { isAdminOrManager } from '../access/isAdminOrManager'

const Tasks: CollectionConfig = {
  slug: 'tasks',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'project', 'assignedTo', 'status', 'priority'],
  },
  access: {
    // Admin and Manager can read all, Employee can read assigned tasks
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin' || user.role === 'manager') return true
      
      // Employee can only read tasks assigned to them
      return {
        assignedTo: {
          equals: user.id
        }
      }
    },
    // Admin and Manager can create
    create: isAdminOrManager,
    // Admin and Manager can update all, Employee can update own tasks (limited fields)
    update: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin' || user.role === 'manager') return true
      
      // Employee can update tasks assigned to them
      return {
        assignedTo: {
          equals: user.id
        }
      }
    },
    // Admin and Manager can delete
    delete: isAdminOrManager,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'project',
      type: 'relationship',
      relationTo: 'projects',
      required: true,
      hasMany: false,
    },
    {
      name: 'assignedTo',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
      access: {
        // Only admin and manager can change assignee
        update: ({ req: { user } }) => {
          if (!user) return false
          return user.role === 'admin' || user.role === 'manager'
        },
      },
    },
    {
      name: 'priority',
      type: 'select',
      required: true,
      defaultValue: 'Medium',
      options: [
        {
          label: 'Low',
          value: 'Low',
        },
        {
          label: 'Medium',
          value: 'Medium',
        },
        {
          label: 'High',
          value: 'High',
        },
        {
          label: 'Critical',
          value: 'Critical',
        },
      ],
      access: {
        update: ({ req: { user } }) => {
          if (!user) return false
          return user.role === 'admin' || user.role === 'manager'
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'Todo',
      options: [
        {
          label: 'Todo',
          value: 'Todo',
        },
        {
          label: 'In Progress',
          value: 'In Progress',
        },
        {
          label: 'In Review',
          value: 'In Review',
        },
        {
          label: 'Done',
          value: 'Done',
        },
        {
          label: 'Blocked',
          value: 'Blocked',
        },
      ],
    },
    {
      name: 'dueDate',
      type: 'date',
      required: true,
    },
    {
      name: 'estimatedHours',
      type: 'number',
      access: {
        update: ({ req: { user } }) => {
          if (!user) return false
          return user.role === 'admin' || user.role === 'manager'
        },
      },
    },
    {
      name: 'actualHours',
      type: 'number',
    },
  ],
}

export default Tasks
