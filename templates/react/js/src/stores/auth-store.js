import { createSlice } from '@reduxjs/toolkit'

// 从 localStorage 初始化 state
const getInitialState = () => ({
  token: localStorage.getItem('token') || '',
  userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}'),
  role: localStorage.getItem('role') || '',
  permissions: JSON.parse(localStorage.getItem('permissions') || '[]'),
})

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
      localStorage.setItem('token', action.payload)
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
      localStorage.setItem('userInfo', JSON.stringify(action.payload))
    },
    setRole: (state, action) => {
      state.role = action.payload
      localStorage.setItem('role', action.payload)
    },
    setPermissions: (state, action) => {
      state.permissions = action.payload
      localStorage.setItem('permissions', JSON.stringify(action.payload))
    },
    setAuthData: (state, action) => {
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

export const { setToken, setUserInfo, setRole, setPermissions, setAuthData, clearToken } = authSlice.actions

// Selectors
export const selectToken = (state) => state.auth.token
export const selectUserInfo = (state) => state.auth.userInfo
export const selectRole = (state) => state.auth.role
export const selectPermissions = (state) => state.auth.permissions
export const selectIsLoggedIn = (state) => !!state.auth.token

/**
 * 角色判断 Selector（用于组件中，通常用于控制路由/页面访问）
 * @param {string|string[]} role - 单个角色字符串或角色数组（数组时，任一角色即可）
 * @returns {Function} Selector 函数
 */
export const selectHasRole = (role) => {
  return (state) => {
    const userRole = state.auth.role || ''
    if (!role) return true
    
    if (Array.isArray(role)) {
      return role.includes(userRole)
    }
    
    return userRole === role
  }
}

/**
 * 权限判断 Selector（用于组件中，通常用于控制按钮、操作等细节）
 * @param {string|string[]} permission - 单个权限字符串或权限数组（数组时，任一权限即可）
 * @returns {Function} Selector 函数
 */
export const selectHasPermission = (permission) => {
  return (state) => {
    const permissions = state.auth.permissions || []
    if (!permission) return true
    
    if (Array.isArray(permission)) {
      // 权限数组：任一权限即可
      return permission.some(perm => permissions.includes(perm))
    }
    
    // 单个权限字符串
    return permissions.includes(permission)
  }
}

// Helper function to get token (for use outside React components, like in axios interceptors)
export const getToken = () => {
  return localStorage.getItem('token') || ''
}

// Helper function to clear token (for use outside React components)
export const clearTokenFromStorage = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userInfo')
  localStorage.removeItem('role')
  localStorage.removeItem('permissions')
}

/**
 * 权限判断 Helper（用于非组件中，如工具函数、条件判断等）
 * @param {string|string[]} permission - 单个权限字符串或权限数组（数组时，任一权限即可）
 * @returns {boolean} 是否有权限
 * 
 * @example
 * // 单个权限
 * hasPermission('test-info:view')
 * 
 * @example
 * // 权限数组（任一权限即可）
 * hasPermission(['test-info:view', 'test-info:edit'])
 */
export const hasPermission = (permission) => {
  if (!permission) return true
  
  const permissions = JSON.parse(localStorage.getItem('permissions') || '[]')
  
  if (Array.isArray(permission)) {
    // 权限数组：任一权限即可
    return permission.some(perm => permissions.includes(perm))
  }
  
  // 单个权限字符串
  return permissions.includes(permission)
}

/**
 * 角色判断 Helper（用于非组件中）
 * @param {string|string[]} role - 单个角色字符串或角色数组
 * @returns {boolean} 是否有该角色
 * 
 * @example
 * hasRole('admin')
 * hasRole(['admin', 'editor'])
 */
export const hasRole = (role) => {
  if (!role) return true
  
  const userRole = localStorage.getItem('role') || ''
  
  if (Array.isArray(role)) {
    return role.includes(userRole)
  }
  
  return userRole === role
}

export default authSlice.reducer

