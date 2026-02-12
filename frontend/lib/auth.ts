import { apiClient } from './api-client'

export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'manager' | 'employee'
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  user: User
  token: string
  exp: number
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    console.log('🔐 Attempting login for:', credentials.email)
    
    const response = await apiClient.post('/users/login', credentials)
    const { user, token, exp } = response.data
    
    console.log('✅ Login successful:', {
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      tokenLength: token?.length,
      expiresAt: new Date(exp * 1000).toLocaleString(),
    })
    
    // Store token and user in localStorage
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    
    console.log('💾 Auth data stored in localStorage')
    
    return { user, token, exp }
  },

  async logout(): Promise<void> {
    console.log('🚪 Logging out...')
    
    try {
      await apiClient.post('/users/logout')
      console.log('✅ Logout API call successful')
    } catch (error) {
      console.error('⚠️ Logout API call failed, clearing local data anyway')
    } finally {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      console.log('🗑️ Auth data cleared from localStorage')
    }
  },

  async getCurrentUser(): Promise<User | null> {
    console.log('👤 Fetching current user from API...')
    
    try {
      const response = await apiClient.get('/users/me')
      console.log('✅ Current user fetched:', response.data.user)
      return response.data.user
    } catch (error) {
      console.error('❌ Failed to fetch current user')
      return null
    }
  },

  getStoredUser(): User | null {
    if (typeof window === 'undefined') return null
    
    const userStr = localStorage.getItem('user')
    if (!userStr) {
      console.log('ℹ️ No stored user found in localStorage')
      return null
    }
    
    try {
      const user = JSON.parse(userStr)
      console.log('📦 Retrieved stored user:', { id: user.id, email: user.email, role: user.role })
      return user
    } catch (error) {
      console.error('❌ Failed to parse stored user data')
      return null
    }
  },

  getToken(): string | null {
    if (typeof window === 'undefined') return null
    const token = localStorage.getItem('token')
    console.log('🔑 Token check:', token ? `Found (${token.length} chars)` : 'Not found')
    return token
  },

  isAuthenticated(): boolean {
    const authenticated = !!this.getToken()
    console.log('🔒 Authentication status:', authenticated ? 'Authenticated' : 'Not authenticated')
    return authenticated
  },
}
