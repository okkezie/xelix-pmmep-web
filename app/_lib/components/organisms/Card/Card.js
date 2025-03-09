
const Card = ({
    title,
    children,
    className = "",
    contentClass = '',
    description = "",
}) => {
    return (
        <div
            className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
        >
            {(title || description) && (
                <div className="px-6 py-5">
                    {title && (
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white/90">
                            {title}
                        </h3>
                    )}
                    {description && (
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {description}
                        </p>
                    )}
                </div>
            )}

            <div className={`p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6 text-gray-800 dark:text-white/90`}>
                <div className={`space-y-6 ${contentClass}`}>{children}</div>
            </div>
        </div>
    )
}

export default Card;