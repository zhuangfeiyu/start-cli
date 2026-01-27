import i18n from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'
import { LANG_DEFAULT } from '@/constants/index'
import { LangEnum } from '@/constants/enums'
import en from './modules/en'
import zhCN from './modules/zh-CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/en'
import zhCNLocale from 'antd/locale/zh_CN'
import enLocale from 'antd/locale/en_US'

const resources = {
  [LangEnum.en]: { translation: en },
  [LangEnum.zhCN]: { translation: zhCN },
}

i18n.use(initReactI18next).init({
  resources,
  lng: LANG_DEFAULT,
  fallbackLng: LangEnum.zhCN,
  interpolation: { escapeValue: false },
})

const dayjsLocaleMap = { [LangEnum.zhCN]: 'zh-cn', [LangEnum.en]: 'en' } as const
const antdLocaleMap = { [LangEnum.zhCN]: zhCNLocale, [LangEnum.en]: enLocale } as const

export function setLocale(locale: string) {
  const dayjsLocale = dayjsLocaleMap[locale as keyof typeof dayjsLocaleMap] ?? 'zh-cn'
  dayjs.locale(dayjsLocale)
  i18n.changeLanguage(locale)
}

export function getAntdLocale(locale: string) {
  return antdLocaleMap[locale as keyof typeof antdLocaleMap] ?? zhCNLocale
}

/**
 * 自定义 i18n hook，简化使用
 * @returns 返回翻译函数 t
 * @example
 * const t = useI18n()
 * <div>{t('common.systemTitle')}</div>
 */
export function useI18n() {
  const { t } = useTranslation()
  return t
}

setLocale(LANG_DEFAULT)
export default i18n
