import SmartLink from '@/components/SmartLink'

const TagItemMini = ({ tag, selected = false }) => {
  return (
    <SmartLink
      key={tag}
      href={selected ? '/' : `/tag/${encodeURIComponent(tag.name)}`}
      passHref
      className={`cursor-pointer inline-block rounded-micro duration-200
        py-1 px-2 text-xs whitespace-nowrap transition-colors
         ${
           selected
             ? 'text-white bg-accent dark:text-gray-200'
             : 'text-warm-dark hover:text-accent hover:bg-accent-light dark:text-warm-300 dark:hover:text-white dark:bg-surface-3 dark:hover:bg-surface-4'
         }`}>
      <div>
        {/* {selected && <i className='mr-1 fas fa-tag'/>} */}#
        {tag.name + (tag.count ? `(${tag.count})` : '')}{' '}
      </div>
    </SmartLink>
  )
}

export default TagItemMini
