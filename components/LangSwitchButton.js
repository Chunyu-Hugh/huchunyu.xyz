import { useRouter } from 'next/router'
import BLOG from '@/blog.config'
import { extractLangPrefix } from '@/lib/utils/pageId'

/**
 * 语言切换按钮
 * 在配置了多语言 Notion 数据库时显示
 */
const LangSwitchButton = ({ className }) => {
  const router = useRouter()

  // 从 NOTION_PAGE_ID 中解析支持的语言
  const siteIds = BLOG.NOTION_PAGE_ID?.split(',') || []
  if (siteIds.length <= 1) return null // 未配置多语言则不显示

  const currentLocale = router.locale || BLOG.LANG
  const isEnglish = currentLocale === 'en' || currentLocale === 'en-US'

  const toggleLang = () => {
    const targetLocale = isEnglish ? BLOG.LANG : 'en'
    router.push(router.asPath, router.asPath, { locale: targetLocale })
  }

  return (
    <div
      className={`${className || ''} flex justify-center dark:text-gray-200 text-gray-800`}>
      <div
        onClick={toggleLang}
        className='hover:scale-110 cursor-pointer transform duration-200 flex items-center justify-center w-5 h-5 text-xs font-bold select-none'
        title={isEnglish ? '切换到中文' : 'Switch to English'}>
        {isEnglish ? '中' : 'EN'}
      </div>
    </div>
  )
}

export default LangSwitchButton
