
export default function ListWithRadio({ items, direction = "vertical" }) {
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
                                        id="listRadioOne"
                                        className="sr-only"
                                        onChange={onChange}
                                    />
                                    <span className={`mr-2 flex h-4 w-4 items-center justify-center rounded-full border ${checked ? 'border-brand-500 bg-brand-500' : 'bg-transparent border-gray-300 dark:border-gray-700'}`}>
                                        <span
                                            className={`h-1.5 w-1.5 rounded-full ${checked ? 'bg-white' : 'bg-white dark:bg-[#1e2636]'}`}
                                        ></span>
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

