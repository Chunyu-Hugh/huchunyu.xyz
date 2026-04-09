import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const MenuItemDrop = ({ link }) => {
  const [show, changeShow] = useState(false)
  //   const show = true
  //   const changeShow = () => {}
  const router = useRouter()

  if (!link || !link.show) {
    return null
  }
  const hasSubMenu = link?.subMenus?.length > 0
  const selected = router.pathname === link.href || router.asPath === link.href

  return (
    <li
      className='cursor-pointer list-none items-center h-full'
      onMouseOver={() => changeShow(true)}
      onMouseOut={() => changeShow(false)}>
      {hasSubMenu && (
        <div
          className={
            'px-2 h-full whitespace-nowrap duration-300 justify-between dark:text-gray-300 cursor-pointer flex flex-nowrap items-center ' +
            (selected
              ? 'text-accent font-medium'
              : 'hover:text-accent transition-colors')
          }>
          <div className='items-center flex'>
            {link?.icon && <i className={`${link?.icon} pr-2`} />} {link?.name}
            <i
              className={`px-1 fas fa-chevron-down duration-500 transition-all ${show ? ' rotate-180' : ''}`}></i>
          </div>
        </div>
      )}

      {!hasSubMenu && (
        <div
          className={
            'px-3 gap-x-1 h-full whitespace-nowrap duration-300 text-md justify-between dark:text-gray-300 cursor-pointer flex flex-nowrap items-center ' +
            (selected
              ? 'text-accent font-medium'
              : 'hover:text-accent transition-colors')
          }>
          <SmartLink href={link?.href} target={link?.target}>
            {link?.icon && <i className={link?.icon} />} {link?.name}
          </SmartLink>
        </div>
      )}

      {/* 子菜单 */}
      {hasSubMenu && (
        <ul
          className={`${show ? 'visible opacity-100 top-14 pointer-events-auto' : 'invisible opacity-0 top-20 pointer-events-none'} p-1 absolute border border-black/[0.08] dark:border-white/[0.06] bg-white dark:bg-surface-3 transition-all duration-150 z-20 block rounded-card shadow-notion-md`}>
          {link?.subMenus?.map(sLink => {
            return (
              <li
                key={sLink.id}
                className='py-3 pr-6 hover:bg-warm-white dark:hover:bg-surface-4 dark:text-gray-200 tracking-widest transition-colors duration-200'>
                <SmartLink href={sLink.href} target={link?.target}>
                  <span className='text-sm ml-2'>
                    {link?.icon && <i className={`${sLink?.icon} pr-2`}> </i>}
                    {sLink.title}
                  </span>
                </SmartLink>
              </li>
            )
          })}
        </ul>
      )}
    </li>
  )
}
