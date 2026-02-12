import { Access } from 'payload/types'

export const isAdmin: Access = ({ req: { user } }) => {
  if (!user) return false
  return user.role === 'admin'
}
