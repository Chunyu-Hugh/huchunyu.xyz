/**
 * 从多语言配置值中获取当前语言的文本
 * 支持两种格式：
 * - 字符串: 直接返回
 * - 对象 { 'zh-CN': '中文', en: 'English' }: 根据 lang 返回对应文本
 */
export function getLocaleText(value, lang) {
  if (!value || typeof value === 'string') return value
  if (typeof value === 'object' && !Array.isArray(value)) {
    const isEn = lang === 'en' || lang === 'en-US' || lang?.startsWith('en')
    return isEn ? (value.en || value['zh-CN']) : (value['zh-CN'] || value.en)
  }
  return value
}

/**
 * 从多语言数组配置中获取当前语言的数组
 */
export function getLocaleArray(value, lang) {
  if (Array.isArray(value)) return value
  if (typeof value === 'object' && value !== null) {
    const isEn = lang === 'en' || lang === 'en-US' || lang?.startsWith('en')
    return isEn ? (value.en || value['zh-CN'] || []) : (value['zh-CN'] || value.en || [])
  }
  return value || []
}
