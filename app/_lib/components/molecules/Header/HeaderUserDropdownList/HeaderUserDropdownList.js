import headerUserMenu from "@/data/headerUserMenu";
import Link from "next/link";
import SignOut from "@/svgs/signout";

export default function HeaderUserDropdownList({ dropdownOpen, username, email, ref }) {
    
    return dropdownOpen && (
        <div ref={ref} className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark">
            <div>
                <span className="block text-theme-sm font-medium text-gray-700 dark:text-gray-400">
                    {username}
                </span>
                <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
                    {email}
                </span>
            </div>

            <ul className="flex flex-col gap-1 border-b border-gray-200 pb-3 pt-4 dark:border-gray-800">
                {headerUserMenu.map((item) => (
                    <li key={item.id}>
                        <Link href={item.href}
                            className="group flex items-center gap-3 rounded-lg px-3 py-2 text-theme-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                            { item.svg }
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
            <button
                className="group mt-3 flex items-center gap-3 rounded-lg px-3 py-2 text-theme-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                <SignOut />
                Sign out
            </button>
        </div>
    )
}
