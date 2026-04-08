import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { loadExternalResource } from '@/lib/utils'
import { useEffect, useRef } from 'react'

/**
 * Twikoo评论 支持根据站点语言自动切换评论区中英文
 * @see https://github.com/imaegoo/twikoo/blob/main/src/client/utils/i18n/index.js
 */

// 将站点语言映射为 Twikoo 支持的语言代码
function toTwikooLang(siteLang) {
  if (!siteLang) return 'zh-CN'
  if (siteLang.startsWith('zh-TW') || siteLang.startsWith('zh-HK')) return 'zh-TW'
  if (siteLang.startsWith('zh')) return 'zh-CN'
  if (siteLang.startsWith('ja')) return 'ja'
  if (siteLang.startsWith('en')) return 'en'
  return 'zh-CN'
}

const Twikoo = ({ isDarkMode }) => {
  const envId = siteConfig('COMMENT_TWIKOO_ENV_ID')
  const el = siteConfig('COMMENT_TWIKOO_ELEMENT_ID', '#twikoo')
  const twikooCDNURL = siteConfig('COMMENT_TWIKOO_CDN_URL')
  const { lang } = useGlobal()
  const twikooLang = toTwikooLang(lang)
  const isInit = useRef(false)

  const loadTwikoo = async () => {
    try {
      await loadExternalResource(twikooCDNURL, 'js')
      const twikoo = window?.twikoo
      if (
        typeof twikoo !== 'undefined' &&
        twikoo &&
        typeof twikoo.init === 'function'
      ) {
        twikoo.init({
          envId: envId,
          el: el,
          lang: twikooLang
        })
        console.log('twikoo init, lang:', twikooLang)
        isInit.current = true
      }
    } catch (error) {
      console.error('twikoo 加载失败', error)
    }
  }

  // 语言或暗色模式变化时，重新初始化 Twikoo
  useEffect(() => {
    isInit.current = false
    // 清空容器，让 Twikoo 重新渲染
    const container = document.querySelector(el)
    if (container) container.innerHTML = ''

    const interval = setInterval(() => {
      if (isInit.current) {
        clearInterval(interval)
      } else {
        loadTwikoo()
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [isDarkMode, twikooLang])
  return <div id="twikoo"></div>
}

export default Twikoo
