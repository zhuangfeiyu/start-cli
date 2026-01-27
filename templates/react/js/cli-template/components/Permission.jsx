import { usePermission } from '@/hooks/usePermission'

/**
 * 权限控制组件
 * 用法：
 * - <Permission permission="user:view">...</Permission>
 * - <Permission permission={['user:view', 'user:edit']}>...</Permission>
 */
export function Permission({ permission, children, fallback = null }) {
  const hasPermission = usePermission(permission)

  if (!hasPermission) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
