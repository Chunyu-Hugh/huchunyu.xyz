const Card = ({ children, headerSlot, className }) => {
  return <div className={className}>
    <>{headerSlot}</>
    <section className="shadow-notion-sm px-2 py-4 bg-white dark:bg-surface-3 border border-black/[0.08] dark:border-white/[0.06] rounded-card hover:shadow-notion-md transition-shadow duration-200">
        {children}
    </section>
  </div>
}
export default Card
