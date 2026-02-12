import { Access } from 'payload/types'

/**
 * Check if user is authenticated
 */
export const isAuthenticated: Access = ({ req: { user } }) => {
  return !!user
}

/**
 * Check if user owns the document (user field matches current user)
 */
export const isOwner: Access = ({ req: { user } }) => {
  if (!user) return false
  
  return {
    user: {
      equals: user.id
    }
  }
}

/**
 * Check if user is assigned to the document
 */
export const isAssignedTo: Access = ({ req: { user } }) => {
  if (!user) return false
  
  return {
    assignedTo: {
      equals: user.id
    }
  }
}
