import { useAppSelector } from '@/stores/hooks'
import { selectTheme } from '@/stores/global-store'
import type { ThemeType } from '@/types/modules/common-type'

function getThemeImage(path: string, name: string, theme: ThemeType): string {
  const suffix = theme === 'dark' ? '-dark' : ''
  const [baseName = '', ext = 'svg'] = name.split('.')
  const baseUrl = new URL(import.meta.url)
  const clean = path.startsWith('/') ? path.slice(1) : path
  return new URL(`../${clean}/${baseName}${suffix}.${ext}`, baseUrl).href
}

/**
 * 根据主题返回图标路径（如 language.svg / language-dark.svg）
 */
export function useThemeIcon(path: string, name: string) {
  const theme = useAppSelector(selectTheme)
  return getThemeImage(path, name, theme)
}
