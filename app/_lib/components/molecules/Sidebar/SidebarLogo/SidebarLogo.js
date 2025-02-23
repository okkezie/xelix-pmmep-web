import Link from "next/link";
import Logo from "@/assets/images/logo/logo.svg"
import LogoDark from "@/assets/images/logo/logo-dark.svg"
import LogoIcon from "@/assets/images/logo/logo-icon.svg"

export default function SidebarLogo({ toggled = false }) {
    return (
        <div className={`flex items-center gap-2 pt-8 sidebar-header pb-7 ${toggled ? 'justify-center' : 'justify-between'}`}>
            <Link href="/">
                <span className={`logo ${toggled ? 'hidden' : ''}`}>
                    <Logo className="dark:hidden" />
                    <LogoDark className="hidden dark:block" />
                </span>
                <LogoIcon className={`logo-icon ${toggled ? 'lg:block' : 'hidden'}`} />
            </Link>
        </div>
    )
}
