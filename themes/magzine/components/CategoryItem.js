import SmartLink from '@/components/SmartLink'

export default function CategoryItem({ selected, category, categoryCount }) {
  return (
    <SmartLink
      href={`/category/${category}`}
      passHref
      className={
        (selected
          ? 'bg-accent text-white '
          : 'dark:text-warm-300 text-warm-dark ') +
        'text-sm font-medium hover:text-accent dark:hover:text-white flex text-md items-center duration-200 cursor-pointer py-1 whitespace-nowrap transition-colors'
      }>
      <div>
        {category} {categoryCount && `(${categoryCount})`}
      </div>
    </SmartLink>
  )
}
