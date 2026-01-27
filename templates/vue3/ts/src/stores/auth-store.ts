import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { UserInfo, AuthData } from '@/types/modules/auth-type'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>(localStorage.getItem('token') || '')
  const userInfo = ref<UserInfo>(JSON.parse(localStorage.getItem('userInfo') || '{}'))
  const role = ref<string>(localStorage.getItem('role') || '')
  const permissions = ref<string[]>(JSON.parse(localStorage.getItem('permissions') || '[]'))

  const isLoggedIn = computed(() => !!token.value)
  const getToken = (): string => token.value
  const getUserInfo = (): UserInfo => userInfo.value
  const getRole = (): string => role.value
  const getPermissions = (): string[] => permissions.value

  const setToken = (newToken: string): void => {
    token.value = newToken
    if (newToken) {
      localStorage.setItem('token', newToken)
    } else {
      localStorage.removeItem('token')
    }
  }

  const setUserInfo = (newUserInfo: UserInfo): void => {
    userInfo.value = newUserInfo
    if (newUserInfo && Object.keys(newUserInfo).length > 0) {
      localStorage.setItem('userInfo', JSON.stringify(newUserInfo))
    } else {
      localStorage.removeItem('userInfo')
    }
  }

  const setRole = (newRole: string): void => {
    role.value = newRole
    if (newRole) {
      localStorage.setItem('role', newRole)
    } else {
      localStorage.removeItem('role')
    }
  }

  const setPermissions = (newPermissions: string[]): void => {
    permissions.value = newPermissions || []
    if (newPermissions && newPermissions.length > 0) {
      localStorage.setItem('permissions', JSON.stringify(newPermissions))
    } else {
      localStorage.removeItem('permissions')
    }
  }

  const setAuthData = (authData: AuthData): void => {
    const { token: newToken, userInfo: newUserInfo, role: newRole, permissions: newPermissions } = authData
    if (newToken) {
      setToken(newToken)
    }
    if (newUserInfo) {
      setUserInfo(newUserInfo)
    }
    if (newRole) {
      setRole(newRole)
    }
    if (newPermissions) {
      setPermissions(newPermissions)
    }
  }

  const clearToken = (): void => {
    token.value = ''
    userInfo.value = {}
    role.value = ''
    permissions.value = []
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    localStorage.removeItem('role')
    localStorage.removeItem('permissions')
  }

  /**
   * 判断是否有指定角色
   * @param requiredRole - 单个角色字符串或角色数组（数组时，任一角色即可）
   * @returns 是否有该角色
   */
  const hasRole = (requiredRole?: string | string[]): boolean => {
    if (!requiredRole) return true
    const userRole = role.value || ''
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(userRole)
    }
    return userRole === requiredRole
  }

  /**
   * 判断是否有指定权限
   * @param requiredPermission - 单个权限字符串或权限数组（数组时，任一权限即可）
   * @returns 是否有权限
   */
  const hasPermission = (requiredPermission?: string | string[]): boolean => {
    if (!requiredPermission) return true
    const userPermissions = permissions.value || []
    if (userPermissions.length === 0) return false

    if (Array.isArray(requiredPermission)) {
      // 权限数组：任一权限即可
      return requiredPermission.some(perm => userPermissions.includes(perm))
    }

    // 单个权限字符串
    return userPermissions.includes(requiredPermission)
  }

  return {
    token,
    userInfo,
    role,
    permissions,
    isLoggedIn,
    getToken,
    getUserInfo,
    getRole,
    getPermissions,
    setToken,
    setUserInfo,
    setRole,
    setPermissions,
    setAuthData,
    clearToken,
    hasRole,
    hasPermission,
  }
})

