import { CollectionConfig } from 'payload/types'
import { isAdmin } from '../access/isAdmin'
import { isAdminOrManager } from '../access/isAdminOrManager'

const Employees: CollectionConfig = {
  slug: 'employees',
  admin: {
    useAsTitle: 'user',
    defaultColumns: ['user', 'department', 'designation', 'status'],
  },
  access: {
    // Admin and Manager can read all, Employee can read self
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin' || user.role === 'manager') return true
      
      // Employee can only read their own record
      return {
        user: {
          equals: user.id
        }
      }
    },
    // Only admin can create
    create: isAdmin,
    // Admin can update all, Manager can update limited fields
    update: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      
      // Manager can update some fields (handled at field level)
      if (user.role === 'manager') return true
      
      return false
    },
    // Only admin can delete
    delete: isAdmin,
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      unique: true,
      hasMany: false,
    },
    {
      name: 'department',
      type: 'text',
      required: true,
    },
    {
      name: 'designation',
      type: 'text',
      required: true,
      access: {
        update: ({ req: { user } }) => {
          if (!user) return false
          return user.role === 'admin'
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'Active',
      options: [
        {
          label: 'Active',
          value: 'Active',
        },
        {
          label: 'On Leave',
          value: 'On Leave',
        },
        {
          label: 'Resigned',
          value: 'Resigned',
        },
      ],
    },
    {
      name: 'joinDate',
      type: 'date',
      required: true,
      access: {
        update: ({ req: { user } }) => {
          if (!user) return false
          return user.role === 'admin'
        },
      },
    },
    {
      name: 'salary',
      type: 'number',
      access: {
        // Only admin can read and update salary
        read: ({ req: { user } }) => {
          if (!user) return false
          return user.role === 'admin'
        },
        update: ({ req: { user } }) => {
          if (!user) return false
          return user.role === 'admin'
        },
      },
    },
  ],
}

export default Employees
