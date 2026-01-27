import { ReactNode } from 'react'
import { usePermission } from '@/hooks/usePermission'

interface PermissionProps {
  permission?: string | string[]
  children: ReactNode
  fallback?: ReactNode
}

/**
 * 权限控制组件
 * 用法：
 * - <Permission permission="user:view">...</Permission>
 * - <Permission permission={['user:view', 'user:edit']}>...</Permission>
 */
export function Permission({ permission, children, fallback = null }: PermissionProps) {
  const hasPermission = usePermission(permission)

  if (!hasPermission) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
