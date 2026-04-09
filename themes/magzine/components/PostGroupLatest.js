import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
// import Image from 'next/image'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'

/**
 * 最新文章列表
 * @param posts 所有文章数据
 * @param sliceCount 截取展示的数量 默认6
 * @constructor
 */
const PostGroupLatest = props => {
  const { latestPosts, vertical } = props
  // 获取当前路径
  const currentPath = useRouter().asPath
  const { locale, siteInfo } = useGlobal()
  if (!latestPosts) {
    return <></>
  }

  return (
    <>
      {/* 标题 */}
      <div className='mb-2 px-1 flex flex-nowrap justify-between'>
        <div className='font-bold text-lg'>{locale.COMMON.LATEST_POSTS}</div>
      </div>

      {/* 文章列表 */}
      <div className={`grid grid-cols-1 ${!vertical ? 'lg:grid-cols-4' : ''}`}>
        {latestPosts.map(post => {
          const selected =
            currentPath === `${siteConfig('SUB_PATH', '')}/${post.slug}`

          const headerImage = post?.pageCoverThumbnail
            ? post.pageCoverThumbnail
            : siteInfo?.pageCover

          return (
            <SmartLink
              key={post.id}
              title={post.title}
              href={`${siteConfig('SUB_PATH', '')}/${post.slug}`}
              passHref
              className={'my-3 flex'}>
              <div className='w-20 h-14 overflow-hidden relative'>
                <LazyImage
                  alt={post?.title}
                  src={`${headerImage}`}
                  className='object-cover w-full h-full'
                />
              </div>
              <div
                className={
                  (selected ? ' text-accent ' : 'dark:text-warm-300 ') +
                  ' text-sm overflow-x-hidden hover:text-accent px-2 duration-200 w-full rounded ' +
                  ' cursor-pointer items-center flex transition-colors'
                }>
                <div>
                  <div className='line-clamp-2 menu-link'>{post.title}</div>
                  <div className='text-warm-500'>{post.lastEditedDay}</div>
                </div>
              </div>
            </SmartLink>
          )
        })}
      </div>
    </>
  )
}
export default PostGroupLatest
