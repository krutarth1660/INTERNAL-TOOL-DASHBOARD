import { CollectionConfig } from 'payload/types'
import { isAdmin } from '../access/isAdmin'
import { isAdminOrManager } from '../access/isAdminOrManager'

const LeaveRequests: CollectionConfig = {
  slug: 'leave-requests',
  admin: {
    useAsTitle: 'employee',
    defaultColumns: ['employee', 'leaveType', 'startDate', 'endDate', 'status'],
  },
  access: {
    // Admin and Manager can read all, Employee can read own requests
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin' || user.role === 'manager') return true
      
      // Employee can only read their own requests
      return {
        employee: {
          equals: user.id
        }
      }
    },
    // All authenticated users can create (but employee field must match user)
    create: ({ req: { user } }) => {
      return !!user
    },
    // Admin can update all, Employee can update own pending (but not status)
    update: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      
      // Manager and Employee can update their own pending requests (but not status field)
      return {
        employee: {
          equals: user.id
        },
        status: {
          equals: 'Pending'
        }
      }
    },
    // Only admin can delete
    delete: isAdmin,
  },
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        // Ensure employee field matches current user for non-admins
        if (operation === 'create' && req.user && req.user.role !== 'admin') {
          data.employee = req.user.id
        }
        
        // Validate date range
        if (data.startDate && data.endDate) {
          const start = new Date(data.startDate)
          const end = new Date(data.endDate)
          
          if (end <= start) {
            throw new Error('End date must be after start date')
          }
        }
        
        // Auto-set approvedBy and approvalDate when status changes to Approved
        if (data.status === 'Approved' && operation === 'update' && req.user) {
          data.approvedBy = req.user.id
          data.approvalDate = new Date().toISOString()
        }
        
        return data
      }
    ],
  },
  fields: [
    {
      name: 'employee',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
    },
    {
      name: 'leaveType',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Sick',
          value: 'Sick',
        },
        {
          label: 'Vacation',
          value: 'Vacation',
        },
        {
          label: 'Personal',
          value: 'Personal',
        },
        {
          label: 'Unpaid',
          value: 'Unpaid',
        },
      ],
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
    },
    {
      name: 'endDate',
      type: 'date',
      required: true,
    },
    {
      name: 'reason',
      type: 'textarea',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'Pending',
      options: [
        {
          label: 'Pending',
          value: 'Pending',
        },
        {
          label: 'Approved',
          value: 'Approved',
        },
        {
          label: 'Rejected',
          value: 'Rejected',
        },
      ],
      access: {
        // Only admin can change status
        update: ({ req: { user } }) => {
          if (!user) return false
          return user.role === 'admin'
        },
      },
    },
    {
      name: 'approvedBy',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'approvalDate',
      type: 'date',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'rejectionReason',
      type: 'textarea',
    },
  ],
}

export default LeaveRequests
