import Image from "next/image";
import Link from "next/link";

const notifications = [
    {
        id: 1,
        name: "Terry Franci",
        message: "requests permission to change Project - Nganter App",
        image: "/assets/images/user/user-05.jpg",
        time: "1 hr ago",
        type: "Project",
        link: "/",
    }
]
export default function NotificationsDropdownList({ dropdownOpen, closeDropdown, ref }) {
    return (
        dropdownOpen && (
            <div ref={ref} className="absolute -right-[240px] mt-[17px] flex h-[480px] w-[350px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark sm:w-[361px] lg:right-0">
                <div className="mb-3 flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-800">
                    <h5 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                        Notifications
                    </h5>

                    <button className="text-gray-500 dark:text-gray-400" onClick={closeDropdown}>
                        <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                                fill="" />
                        </svg>
                    </button>
                </div>

                <ul className="custom-scrollbar flex h-auto flex-col overflow-y-auto">
                    {notifications.map((notification) => (
                        <li key={notification.id}>
                            <Link className="flex gap-3 rounded-lg border-b border-gray-100 p-3 px-4.5 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5"
                                href={notification.link}>
                                <span className="relative z-1 block h-10 w-full max-w-10 rounded-full">
                                    <Image
                                        src={notification.image}
                                        alt={notification.name}
                                        className="overflow-hidden rounded-full"
                                        width={40}
                                        height={40}
                                    />
                                    <span
                                        className="absolute bottom-0 right-0 z-10 h-2.5 w-full max-w-2.5 rounded-full border-[1.5px] border-white bg-error-500 dark:border-gray-900"></span>
                                </span>

                                <span className="block">
                                    <span className="mb-1.5 block text-theme-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-medium text-gray-800 dark:text-white/90">{notification.name}</span>
                                        {notification.message}
                                    </span>

                                    <span className="flex items-center gap-2 text-theme-xs text-gray-500 dark:text-gray-400">
                                        <span>{notification.type}</span>
                                        <span className="h-1 w-1 rounded-full bg-gray-400"></span>
                                        <span>{notification.time}</span>
                                    </span>
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>

                <Link href="#"
                    className="mt-3 flex justify-center rounded-lg border border-gray-300 bg-white p-3 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                    View All Notification
                </Link>
            </div>
        )
    )
}
