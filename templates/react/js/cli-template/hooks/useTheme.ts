import { useAppDispatch, useAppSelector } from '@/stores/hooks'
import { setTheme, selectTheme } from '@/stores/global-store'

export function useTheme() {
  const theme = useAppSelector(selectTheme)
  const dispatch = useAppDispatch()

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    dispatch(setTheme(newTheme))
  }

  const changeTheme = (newTheme) => {
    dispatch(setTheme(newTheme))
  }

  return { theme, toggleTheme, changeTheme }
}
