import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AuthData, UserInfo } from '@/api/auth'

export interface AuthState {
  token: string
  userInfo: UserInfo | Record<string, unknown>
  role: string
  permissions: string[]
}

const getInitialState = (): AuthState => ({
  token: localStorage.getItem('token') || '',
  userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}'),
  role: localStorage.getItem('role') || '',
  permissions: JSON.parse(localStorage.getItem('permissions') || '[]'),
})

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      localStorage.setItem('token', action.payload)
    },
    setUserInfo: (state, action: PayloadAction<UserInfo | Record<string, unknown>>) => {
      state.userInfo = action.payload
      localStorage.setItem('userInfo', JSON.stringify(action.payload))
    },
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload
      localStorage.setItem('role', action.payload)
    },
    setPermissions: (state, action: PayloadAction<string[]>) => {
      state.permissions = action.payload
      localStorage.setItem('permissions', JSON.stringify(action.payload))
    },
    setAuthData: (state, action: PayloadAction<Partial<AuthData>>) => {
      const { token, userInfo, role, permissions } = action.payload
      state.token = token || ''
      state.userInfo = userInfo || {}
      state.role = role || ''
      state.permissions = permissions || []
      if (token) localStorage.setItem('token', token)
      if (userInfo) localStorage.setItem('userInfo', JSON.stringify(userInfo))
      if (role) localStorage.setItem('role', role)
      if (permissions) localStorage.setItem('permissions', JSON.stringify(permissions))
    },
    clearToken: (state) => {
      state.token = ''
      state.userInfo = {}
      state.role = ''
      state.permissions = []
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      localStorage.removeItem('role')
      localStorage.removeItem('permissions')
    },
  },
})

export const { setToken, setUserInfo, setRole, setPermissions, setAuthData, clearToken } =
  authSlice.actions

export const selectToken = (state: { auth: AuthState }) => state.auth.token
export const selectUserInfo = (state: { auth: AuthState }) => state.auth.userInfo
export const selectRole = (state: { auth: AuthState }) => state.auth.role
export const selectPermissions = (state: { auth: AuthState }) => state.auth.permissions
export const selectIsLoggedIn = (state: { auth: AuthState }) => Boolean(state.auth.token)

export const selectHasRole = (role?: string | string[]) => {
  return (state: { auth: AuthState }) => {
    const userRole = state.auth.role || ''
    if (!role) return true
    if (Array.isArray(role)) {
      return role.includes(userRole)
    }
    return userRole === role
  }
}

export const selectHasPermission = (permission?: string | string[]) => {
  return (state: { auth: AuthState }) => {
    const permissions = state.auth.permissions || []
    if (!permission) return true
    if (Array.isArray(permission)) {
      return permission.some((perm) => permissions.includes(perm))
    }
    return permissions.includes(permission)
  }
}

export const getToken = (): string => localStorage.getItem('token') || ''

export const clearTokenFromStorage = (): void => {
  localStorage.removeItem('token')
  localStorage.removeItem('userInfo')
  localStorage.removeItem('role')
  localStorage.removeItem('permissions')
}

export const hasPermission = (permission?: string | string[]): boolean => {
  if (!permission) return true
  const permissions: string[] = JSON.parse(localStorage.getItem('permissions') || '[]')
  if (Array.isArray(permission)) {
    return permission.some((perm) => permissions.includes(perm))
  }
  return permissions.includes(permission)
}

export const hasRole = (role?: string | string[]): boolean => {
  if (!role) return true
  const userRole = localStorage.getItem('role') || ''
  if (Array.isArray(role)) {
    return role.includes(userRole)
  }
  return userRole === role
}

export default authSlice.reducer
