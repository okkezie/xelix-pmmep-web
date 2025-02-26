
export default function UnorderedList({ items, direction = "vertical", includeContainer = true }) {
    const flexDirection = direction === 'vertical' ? '' : 'md:flex-row'
    const listClassName = direction === 'vertical' ? '' : ' md:border-b-0 md:border-r'
    const containerClass = includeContainer ? "rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] sm:w-fit" : ''
    return (
        <div
            className={containerClass}
        >
            <ul className={`flex flex-col ${flexDirection}`}>
                {items.map((item) => (
                    <li
                        key={item}
                        className={`flex items-center gap-2 border-b border-gray-200 px-3 py-2.5 text-sm text-gray-500 last:border-b-0 dark:border-gray-800 dark:text-gray-400 ${listClassName}`}
                    >
                        <span className="ml-2 block h-[3px] w-[3px] rounded-full bg-gray-500 dark:bg-gray-400"></span>
                        <span> {item} </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
