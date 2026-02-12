import { Access } from 'payload/types'

export const isSelf: Access = ({ req: { user } }) => {
  if (!user) return false
  
  // Return query constraint to filter by user ID
  return {
    id: {
      equals: user.id
    }
  }
}
