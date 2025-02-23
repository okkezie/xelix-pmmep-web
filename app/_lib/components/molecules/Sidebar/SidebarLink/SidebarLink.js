import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function SidebarLink({ link, sidebarToggle }) {
    const pathname = usePathname();
    const isActive = pathname === link.href;
    const { href, icon, title } = link
    return (
        <li>
            <Link href={href} className={clsx(
                "menu-item group",
                isActive ? 'menu-item-active' : 'menu-item-inactive'
            )}>
                {icon(pathname)}
                <span className={clsx(
                    "menu-item-text",
                    sidebarToggle && "lg:hidden"
                )}>
                    {title}
                </span>
            </Link>
        </li>
    )
}
