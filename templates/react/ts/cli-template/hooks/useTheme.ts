import { useAppDispatch, useAppSelector } from '@/stores/hooks'
import { setTheme, selectTheme } from '@/stores/global-store'
import type { ThemeType } from '@/types/modules/common-type'

export function useTheme() {
  const theme = useAppSelector(selectTheme)
  const dispatch = useAppDispatch()

  const toggleTheme = () => {
    const newTheme: ThemeType = theme === 'light' ? 'dark' : 'light'
    dispatch(setTheme(newTheme))
  }

  const changeTheme = (newTheme: ThemeType) => {
    dispatch(setTheme(newTheme))
  }

  return { theme, toggleTheme, changeTheme }
}
