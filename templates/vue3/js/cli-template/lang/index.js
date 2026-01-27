import { createI18n } from 'vue-i18n';
import { LANG_DEFAULT } from '@/constants/index';
import en from './modules/en.js';
import zhCN from './modules/zh-CN.js';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import enLocale from 'element-plus/es/locale/lang/en';

import { LangEnum } from "@/constants/enums";

const messages = {
    [LangEnum.en]: en,
    [LangEnum.zhCN]: zhCN,
};

const i18n = createI18n({
    globalInjection: true,
    legacy: false,
    locale: LANG_DEFAULT,
    messages,
});

// Element Plus locale 映射
const elementPlusLocaleMap = {
    [LangEnum.zhCN]: zhCn,
    [LangEnum.en]: enLocale,
};

// dayjs locale 映射
const dayjsLocaleMap = {
    [LangEnum.zhCN]: 'zh-cn',
    [LangEnum.en]: 'en',
};

// 响应式的 Element Plus locale
export const elementPlusLocale = ref(elementPlusLocaleMap[LANG_DEFAULT]);

/**
 * 设置依赖库的语言，dayjs、Element Plus、i18n
 * @param {string} locale - 语言代码，如 'zh-CN' 或 'en'
 */
export function setLocale(locale) {
    // 设置 dayjs locale
    const dayjsLocale = dayjsLocaleMap[locale] || dayjsLocaleMap[LangEnum.zhCN];
    dayjs.locale(dayjsLocale);
    // 设置 Element Plus locale
    elementPlusLocale.value = elementPlusLocaleMap[locale] || elementPlusLocaleMap[LangEnum.zhCN];
    // 设置 i18n locale
    i18n.global.locale.value = locale;
}

// 初始化时设置默认语言
setLocale(LANG_DEFAULT);

export const t = i18n.global.t;
export default i18n;