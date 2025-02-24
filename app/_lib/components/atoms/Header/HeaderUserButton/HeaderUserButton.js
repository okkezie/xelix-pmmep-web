import Image from "next/image";

export default function HeaderUserButton({user, dropdownOpen, setDropdownOpen}) {
    const userImg = user?.avatar || "/assets/images/user/user-29.jpg";
    return (
        <button className="flex items-center text-gray-700 dark:text-gray-400" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <span className="mr-3 h-11 w-11 overflow-hidden rounded-full">
                <Image src={userImg} alt={user?.name} width={44} height={44} />
            </span>

            <span className="mr-1 block text-theme-sm font-medium">
                {user?.name}
            </span>

            <svg 
                className="stroke-gray-500 dark:stroke-gray-400"
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M4.3125 8.65625L9 13.3437L13.6875 8.65625" stroke="" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </button>
    )
}
