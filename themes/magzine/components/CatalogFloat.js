import { useMagzineGlobal } from '..'
import Catalog from './Catalog'
import CatalogFloatButton from './CatalogFloatButton'

/**
 * 悬浮抽屉目录
 * @param toc
 * @param post
 * @returns {JSX.Element}
 * @constructor
 */
const CatalogFloat = ({ post, cRef }) => {
  const { tocVisible, changeTocVisible } = useMagzineGlobal()
  const switchVisible = () => {
    changeTocVisible(!tocVisible)
  }
  return (
    <div className='lg:hidden'>
      <div
        onClick={() => {
          changeTocVisible(true)
        }}
        className='fixed right-0 bottom-24 z-20 shadow-notion-sm bg-white dark:bg-surface-3 rounded-l-card'>
        {!tocVisible && <CatalogFloatButton />}
      </div>
      <div id='magzine-toc-float' className='fixed top-0 right-0 z-40'>
        {/* 侧边菜单 */}
        <div
          className={
            (tocVisible
              ? 'animate__slideInRight '
              : ' -mr-72 animate__slideOutRight') +
            ' overflow-y-hidden shadow-notion-lg w-60 duration-200 fixed right-1 bottom-16 rounded-card py-2 bg-white dark:bg-surface-3 border border-black/[0.08] dark:border-white/[0.06]'
          }>
          {post && (
            <>
              <div className='dark:text-warm-300 text-warm-500 h-56 px-2'>
                <Catalog toc={post.toc} />
              </div>
            </>
          )}
        </div>
      </div>
      {/* 背景蒙版 */}
      <div
        id='right-drawer-background'
        className={
          (tocVisible ? 'block' : 'hidden') +
          ' fixed top-0 left-0 z-30 w-full h-full'
        }
        onClick={switchVisible}
      />
    </div>
  )
}
export default CatalogFloat
