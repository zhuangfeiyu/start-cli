import { useAuthStore } from '@/stores/auth-store'

/**
 * 检查元素权限并更新显示状态
 * @param {HTMLElement} el - DOM 元素
 * @param {Object} binding - 指令绑定对象
 */
function checkPermission(el, binding) {
  if(binding.modifiers.disabled) {
    return
  }
  const authStore = useAuthStore()

  // 直接从 auth-store 判断权限
  const hasAccess = authStore.hasPermission(binding.value)

  // 根据权限动态显示/隐藏
  if (hasAccess) {
    el.style.display = ''
  } else {
    el.style.display = 'none'
  }
}

/**
 * 权限指令
 * 用法：
 * - v-permission="'user:view'" - 单个权限
 * - v-permission="['user:view', 'user:edit']" - 权限数组（任一即可）
 * - v-permission.disabled="true" - 暂时禁用权限
 */
export default {
  mounted(el, binding) {
    checkPermission(el, binding)
  },
  updated(el, binding) {
    checkPermission(el, binding)
  }
}
