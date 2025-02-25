
const SummaryCard = ({ title, value, percentage, comment }) => {
    return (
        <div
            className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] w-full">
            <p className="text-theme-sm text-gray-500 dark:text-gray-400">
                {title}
            </p>
            <div className="mt-3 flex items-end justify-between">
                <div>
                    <h4 className="text-2xl font-bold text-gray-800 dark:text-white/90">
                        {value}
                    </h4>
                </div>
                <div className="flex items-center gap-1">
                    <span
                        className="flex items-center gap-1 rounded-full bg-success-50 px-2 py-0.5 text-theme-xs font-medium text-success-600 dark:bg-success-500/15 dark:text-success-500">
                        {percentage}
                    </span>
                    <span className="text-theme-xs text-gray-500 dark:text-gray-400">
                        {comment}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default SummaryCard;