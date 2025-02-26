
export default function List({ items, type='unordered', direction = "vertical", includeContainer = true }) {
    const flexDirection = direction === 'vertical' ? '' : 'md:flex-row'
    const listClassName = direction === 'vertical' ? '' : ' md:border-b-0 md:border-r'
    const containerClass = includeContainer ? "rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] sm:w-fit" : ''
    const Tag = type === 'unordered' ? 'ul' : 'ol'

    return (
        <div
            className={containerClass}
        >
            <Tag className={`flex list-decimal flex-col ${flexDirection}`}>
                {items.map((item, index) => (
                    <li key={item}
                        className={`flex items-center gap-2 border-b border-gray-200 px-3 py-2.5 text-sm text-gray-500 last:border-b-0 dark:border-gray-800 dark:text-gray-400 ${listClassName}`}
                    >
                        <span>{index + 1}. {item} </span>
                    </li>
                ))}
            </Tag>
        </div>
    )
}