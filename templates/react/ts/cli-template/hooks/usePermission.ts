import { useAppSelector } from '@/stores/hooks'
import { selectHasPermission, selectHasRole } from '@/stores/auth-store'

/**
 * 权限检查 Hook
 * @param permission - 单个权限字符串或权限数组（数组时，任一权限即可）
 * @returns 是否有权限
 */
export function usePermission(permission?: string | string[]) {
  const hasPermission = useAppSelector(selectHasPermission(permission))
  return hasPermission
}

/**
 * 角色检查 Hook
 * @param role - 单个角色字符串或角色数组（数组时，任一角色即可）
 * @returns 是否有该角色
 */
export function useRole(role?: string | string[]) {
  const hasRole = useAppSelector(selectHasRole(role))
  return hasRole
}
