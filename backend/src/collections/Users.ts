import { CollectionConfig } from 'payload/types'
import { isAdmin } from '../access/isAdmin'
import { isAdminOrManager } from '../access/isAdminOrManager'

const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 7200, // 2 hours
    verify: false,
    maxLoginAttempts: 5,
    lockTime: 600000, // 10 minutes
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'role'],
  },
  access: {
    // Admin can read all, Manager can read all, Employee can read self
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin' || user.role === 'manager') return true
      
      // Employee can only read their own record
      return {
        id: {
          equals: user.id
        }
      }
    },
    // Only admin can create users
    create: isAdmin,
    // Admin can update all, users can update self (limited fields)
    update: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      
      // Users can update their own record
      return {
        id: {
          equals: user.id
        }
      }
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
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'employee',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Manager',
          value: 'manager',
        },
        {
          label: 'Employee',
          value: 'employee',
        },
      ],
      access: {
        // Only admin can change roles
        update: ({ req: { user } }) => {
          if (!user) return false
          return user.role === 'admin'
        },
      },
    },
  ],
}

export default Users
