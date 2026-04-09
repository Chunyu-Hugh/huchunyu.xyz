import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'

/**
 * 分类
 * @param {*} param0
 * @returns
 */
const CategoryGroup = ({ currentCategory, categoryOptions }) => {
  const { locale } = useGlobal()
  if (!categoryOptions) {
    return <></>
  }
  return (
    <div id='category-list' className='pt-4'>
      <div className='text-xl font-bold mb-2'>{locale.COMMON.CATEGORY}</div>
      <div className=''>
        {categoryOptions?.map((category, index) => {
          const selected = currentCategory === category.name
          return (
            <SmartLink
              key={index}
              href={`/category/${category.name}`}
              passHref
              className={
                (selected
                  ? 'text-accent font-medium '
                  : 'dark:text-warm-300 text-warm-dark ') +
                'text-lg hover:text-accent flex text-md items-center duration-200 cursor-pointer py-1 whitespace-nowrap transition-colors'
              }>
              <span>
                {category.name} {category?.count && `(${category?.count})`}
              </span>
            </SmartLink>
          )
        })}
      </div>
    </div>
  )
}

export default CategoryGroup
