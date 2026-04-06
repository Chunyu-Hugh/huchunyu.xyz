import FlipCard from '@/components/FlipCard'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'
import { getLocaleText } from '../locale-helper'

/**
 * 交流频道
 * @returns
 */
export default function TouchMeCard() {
  const { lang } = useGlobal()
  // 开关
  if (!siteConfig('MAGZINE_SOCIAL_CARD', null, CONFIG)) {
    return <></>
  }

  return (
    <div className={'relative h-32 text-black flex flex-col'}>
      <FlipCard
        className='cursor-pointer lg:py-8 px-4 py-4 border bg-[#7BE986] dark:bg-yellow-600 dark:border-gray-600'
        frontContent={
          <div className='h-full'>
            <h2 className='font-[1000] text-3xl'>
              {getLocaleText(siteConfig('MAGZINE_SOCIAL_CARD_TITLE_1'), lang)}
            </h2>
            <h3 className='pt-2'>
              {siteConfig('MAGZINE_SOCIAL_CARD_TITLE_2')}
            </h3>
          </div>
        }
        backContent={
          <SmartLink href={siteConfig('MAGZINE_SOCIAL_CARD_URL', '#', CONFIG)}>
            <div className='font-[1000] text-xl h-full'>
              {getLocaleText(siteConfig('MAGZINE_SOCIAL_CARD_TITLE_3'), lang)}
            </div>
          </SmartLink>
        }
      />
    </div>
  )
}
