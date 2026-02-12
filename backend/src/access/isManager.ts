import { Access } from 'payload/types'

export const isManager: Access = ({ req: { user } }) => {
  if (!user) return false
  return user.role === 'manager'
}
