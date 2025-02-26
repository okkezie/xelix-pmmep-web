
export default function ListWithButton({ items, direction = "vertical" }) {
    const flexDirection = direction === 'vertical' ? '' : 'md:flex-row'
    const listClassName = direction === 'vertical' ? '' : ' md:border-b-0 md:border-r'

    return (
        <div
            className="w-full overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] sm:w-[228px]"
        >
            <ul className={`flex flex-col ${flexDirection}`}>
                {items.map(({text, icon, disabled, onClick}, index) => (
                    <li key={text} className={`border-b border-gray-200 last:border-b-0 dark:border-gray-800 ${listClassName}`}>
                        <button
                            disabled={disabled}
                            onClick={onClick}
                            className="flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-brand-50 hover:text-brand-500 dark:text-gray-400 dark:hover:bg-brand-500/[0.12] dark:hover:text-brand-400"
                        >
                            <span>
                                {icon}
                            </span>
                            <span> {text} </span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
