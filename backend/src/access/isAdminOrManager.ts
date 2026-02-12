import { Access } from 'payload/types'

export const isAdminOrManager: Access = ({ req: { user } }) => {
  if (!user) return false
  return user.role === 'admin' || user.role === 'manager'
}
