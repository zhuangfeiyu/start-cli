import { computed } from 'vue'
import { useGlobalStore } from '@/stores/global-store'

/**
 * 根据主题获取对应的图片路径
 * @param {string} path - 图片资源路径（相对于 src 目录），如 'assets/images'
 * @param {string} name - 图片文件名（包含扩展名，如 'language.svg'）
 * @param {string} theme - 当前主题
 * @returns {string} 图片路径
 */
const getThemeImage = (path, name, theme) => {
  const suffix = theme === 'dark' ? '-dark' : ''
  // 分离文件名和扩展名
  const nameParts = name.split('.')
  const [ baseName = '', extension = 'svg' ] = nameParts
  const baseUrl = new URL(import.meta.url)
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  // 拼接：基础名称 + 主题后缀 + 扩展名
  return new URL(`../${cleanPath}/${baseName}${suffix}.${extension}`, baseUrl).href
}

/**
 * 根据主题获取图标的 composable
 * @param {string} path - 图片资源路径（相对于 src 目录，如 'assets/images'）
 * @param {string} name - 图片文件名（包含扩展名，如 'language.svg'）
 * @returns {Object} 响应式的图标路径，主题切换时自动更新
 * 
 * @example
 * // 获取语言图标
 * const { icon: languageIcon } = useThemeIcon('assets/images', 'language.svg')
 */
export function useThemeIcon(path, name) {
  const globalStore = useGlobalStore()
  
  const icon = computed(() => getThemeImage(path, name, globalStore.theme))

  return {
    icon,
  }
}
