/**
 * 以value为键 label为值的键值映射，用于展示字典的文本
 * @param options 选项列表
 * @returns 键值映射
 */
export const getMapOfOptions = (options) => {
  const res = {}
  if (Array.isArray(options)) {
    options.map((item) => {
      res[item.value] = item.label
    })
  }
  return res
}
