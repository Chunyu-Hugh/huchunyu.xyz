import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'
import { getLocaleText } from '../locale-helper'

/**
 * 文字广告Banner
 * @param {*} props
 * @returns
 */
export default function BannerItem() {
  const { lang } = useGlobal()
  // 首屏信息栏按钮文字
  const banner = siteConfig('MAGZINE_HOME_BANNER_ENABLE', null, CONFIG)
  const button = siteConfig('MAGZINE_HOME_BUTTON', null, CONFIG)
  const text = getLocaleText(siteConfig('MAGZINE_HOME_BUTTON_TEXT', null, CONFIG), lang)
  const url = siteConfig('MAGZINE_HOME_BUTTON_URL', null, CONFIG)
  const title = getLocaleText(siteConfig('MAGZINE_HOME_TITLE', null, CONFIG), lang)
  const description = getLocaleText(siteConfig('MAGZINE_HOME_DESCRIPTION', null, CONFIG), lang)
  const tips = getLocaleText(siteConfig('MAGZINE_HOME_TIPS', null, CONFIG), lang)

  if (!banner) {
    return null
  }

  return (
    <div className='flex flex-col p-5 gap-y-5 dark items-center justify-between w-full bg-surface-1 text-gray-300 rounded-card'>
      {/* 首屏导航按钮 */}
      <h2 className='text-2xl font-semibold text-white'>{title}</h2>
      <h3 className='text-sm text-warm-300'>{description}</h3>
      {button && (
        <div className='mt-2 text-center px-6 py-3 font-medium rounded-micro text-white bg-accent hover:bg-accent-dark transition-colors duration-200'>
          <SmartLink href={url}>{text}</SmartLink>
        </div>
      )}
      <span className='text-xs text-warm-300'>{tips}</span>
    </div>
  )
}
