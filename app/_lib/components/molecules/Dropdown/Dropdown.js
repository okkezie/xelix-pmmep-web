import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import Separator from "@/components/atoms/Separator/Separator"

export default function Dropdown({ variant = 'primary', label, items, size = "sm" }) {
    const router = useRouter()
    const dropdownRef = useRef(null)
    const [isOpen, setIsOpen] = useState(false)
    const variantClasses = {
        primary:
            "bg-brand-800 text-white shadow-theme-xs hover:bg-green-900 disabled:bg-gray-300",
        outline:
            "bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300",
        outline_primary:
            "bg-white text-brand-700 ring-1 ring-inset ring-brand-700 hover:bg-brand-800 hover:text-brand-100 dark:bg-gray-800 dark:text-brand-100 dark:ring-brand-700 dark:hover:bg-brand-700 dark:hover:text-brand-300",
    }
    const sizeClasses = {
        sm: "px-2 py-2 text-sm",
        md: "px-5 py-3.5 text-sm",
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("click", handleClickOutside)

        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [isOpen])

    return (
        <div className="relative inline-block">
            <button
                href="#"
                onClick={() => setIsOpen(prev => !prev)}
                className={`inline-flex items-center justify-center font-medium gap-2 rounded-lg transition ${variantClasses[variant]} ${sizeClasses[size]}`}
            >
                { label }
                <svg
                    className={`stroke-current duration-200 ease-in-out ${isOpen && 'rotate-180' }`}
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M4.79199 7.396L10.0003 12.6043L15.2087 7.396"
                        stroke=""
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
            <div
                ref={dropdownRef}
                className={`${isOpen ? 'block' : 'hidden'} absolute left-0 top-full z-40 mt-2 w-full min-w-[260px] rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-[#1E2635]`}
            >
                <ul className="flex flex-col gap-1">
                { items?.map((item, i) => 
                    item.separator ?
                       <li key={i++} className="w-full"><Separator /></li> 
                    :
                    <li key={i++} className="w-full">
                        <button
                            onClick={item.onClick ? item.onClick : () => router.push(item.href)}
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-white/5 w-full"
                        >
                            { item.icon}
                            { item.label }
                        </button>
                    </li>
                )}
                </ul>
            </div>
        </div>
    )
}