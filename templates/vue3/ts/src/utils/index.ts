import type { OptionItem } from '@/types/modules/common-type'

/**
 * 以value为键 label为值的键值映射，用于展示字典的文本
 * @param options - 选项列表
 * @returns 键值映射
 */
export const getMapOfOptions = (options: OptionItem[]): Record<string | number, string> => {
  const res: Record<string | number, string> = {}
  if (Array.isArray(options)) {
    options.forEach((item) => {
      res[item.value] = item.label
    })
  }
  return res
}

