
export default function Tooltip({children, title, position = "top"}) {

    const positionClass = () => {
        switch(position) {
            case "top":
                return "bottom-full left-1/2 mb-2.5 -translate-x-1/2"
            case "bottom":
                return "left-1/2 top-full mt-2.5 -translate-x-1/2"
            case "left":
                return "right-full top-1/2 mr-2.5 -translate-y-1/2"
            case 'right':
                return "left-full top-1/2 z-30 ml-2.5 -translate-y-1/2"
        }
    }

    const pointerClass = () => {
        switch(position) {
            case "top":
                return "-bottom-1 left-1/2 h-3 w-4 -translate-x-1/2 rotate-45"
            case "bottom":
                return "-top-1 left-1/2 h-3 w-4 -translate-x-1/2 rotate-45"
            case "left":
                return "-right-1.5 top-1/2 h-3 w-4 -translate-y-1/2 rotate-45"
            case "right":
                return "-left-1.5 top-1/2 h-3 w-4 -translate-y-1/2 rotate-45"
        }
    }

    return (
        <div className="relative inline-block group">
            <div className={`invisible absolute ${positionClass()} opacity-0 transition-opacity duration-300 group-hover:visible group-hover:opacity-100`}>
                <div className="relative">
                    <div className="whitespace-nowrap rounded-lg bg-gray-700 px-3 py-2 text-xs font-medium text-white drop-shadow-4xl dark:bg-white dark:text-gray-700">
                    {title}
                    </div>
                    <div className={`absolute ${pointerClass()} rotate-45 bg-gray-700 dark:bg-white`}></div>
                </div>
            </div>
            {children}
        </div>
    )
}
