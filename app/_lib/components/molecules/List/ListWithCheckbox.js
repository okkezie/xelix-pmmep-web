
export default function ListWithCheckbox({ items, direction = "vertical" }) {
    const flexDirection = direction === 'vertical' ? '' : 'md:flex-row'
    const listClassName = direction === 'vertical' ? '' : ' md:border-b-0 md:border-r'

    return (

        <div
            className="rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] sm:w-fit"
        >
            <ul className={`flex flex-col ${flexDirection}`}>
                {items.map(({ text, id, checked, onChange }) => (
                    <li
                        key={id}
                        className={`border-b border-gray-200 px-3 py-2.5 last:border-b-0 dark:border-gray-800 ${listClassName}`}
                    >
                        <div>
                            <label
                                htmlFor={id}
                                className="flex cursor-pointer select-none items-center text-sm text-gray-500 dark:text-gray-400"
                            >
                                <span className="relative">
                                    <input
                                        type="checkbox"
                                        id={id}
                                        className="sr-only"
                                        onChange={onChange}
                                    />
                                    <span
                                        className={`mr-2 flex h-4 w-4 items-center justify-center rounded border ${checked ? 'border-brand-500 bg-brand-500' : 'bg-transparent border-gray-300 dark:border-gray-700'}`}
                                    >
                                        <span className={`${checked ? '' : 'opacity-0'}`}>
                                            <svg
                                                width="12"
                                                height="12"
                                                viewBox="0 0 12 12"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M10 3L4.5 8.5L2 6"
                                                    stroke="white"
                                                    strokeWidth="1.6666"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </span>
                                    </span>
                                </span>
                                {text}
                            </label>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}