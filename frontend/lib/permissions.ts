import { User } from './auth'

export const permissions = {
  canCreateUser: (user: User | null) => {
    return user?.role === 'admin'
  },

  canEditUser: (user: User | null, targetUserId: string) => {
    if (!user) return false
    if (user.role === 'admin') return true
    return user.id === targetUserId
  },

  canDeleteUser: (user: User | null) => {
    return user?.role === 'admin'
  },

  canCreateEmployee: (user: User | null) => {
    return user?.role === 'admin'
  },

  canViewAllEmployees: (user: User | null) => {
    return user?.role === 'admin' || user?.role === 'manager'
  },

  canCreateProject: (user: User | null) => {
    return user?.role === 'admin' || user?.role === 'manager'
  },

  canEditProject: (user: User | null, projectManagerId: string) => {
    if (!user) return false
    if (user.role === 'admin') return true
    if (user.role === 'manager' && user.id === projectManagerId) return true
    return false
  },

  canDeleteProject: (user: User | null) => {
    return user?.role === 'admin'
  },

  canCreateTask: (user: User | null) => {
    return user?.role === 'admin' || user?.role === 'manager'
  },

  canEditTask: (user: User | null, taskAssigneeId: string) => {
    if (!user) return false
    if (user.role === 'admin' || user.role === 'manager') return true
    // Employee can only update status of their own tasks
    return user.id === taskAssigneeId
  },

  canDeleteTask: (user: User | null) => {
    return user?.role === 'admin' || user?.role === 'manager'
  },

  canApproveLeave: (user: User | null) => {
    return user?.role === 'admin' || user?.role === 'manager'
  },

  canExportData: (user: User | null) => {
    return user?.role === 'admin' || user?.role === 'manager'
  },
}
