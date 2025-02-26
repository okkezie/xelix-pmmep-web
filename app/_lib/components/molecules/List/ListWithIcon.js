
export default function ListWithIcon({ items, direction = "vertical" }) {
    const flexDirection = direction === 'vertical' ? '' : 'md:flex-row'
    const listClassName = direction === 'vertical' ? '' : ' md:border-b-0 md:border-r'

    return (
        <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] sm:w-fit">
            <ul className={`flex flex-col ${flexDirection}`}>
                {items.map(({ icon, text }, index) => (
                <li
                    key={text}
                    className={`flex items-center gap-2 border-b border-gray-200 px-3 py-2.5 text-sm text-gray-500 last:border-b-0 dark:border-gray-800 dark:text-gray-400 ${listClassName}`}>
                    <span className="text-brand-500 dark:text-brand-400">
                        {icon}
                    </span>

                    <span> {text} </span>
                </li>
                ))}
            </ul>   
        </div>
    )
}