import { useAppSelector } from '@/stores/hooks'
import { selectTheme } from '@/stores/global-store'

function getThemeImage(path, name, theme) {
  const suffix = theme === 'dark' ? '-dark' : ''
  const [baseName = '', ext = 'svg'] = name.split('.')
  const baseUrl = new URL(import.meta.url)
  const clean = path.startsWith('/') ? path.slice(1) : path
  return new URL(`../${clean}/${baseName}${suffix}.${ext}`, baseUrl).href
}

/**
 * 根据主题返回图标路径（如 language.svg / language-dark.svg）
 */
export function useThemeIcon(path, name) {
  const theme = useAppSelector(selectTheme)
  return getThemeImage(path, name, theme)
}
