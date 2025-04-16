import Link from "next/link";
import Logo from "@/assets/images/logo/logo.svg"
import LogoDark from "@/assets/images/logo/logo-dark.svg"
import Image from "next/image"
import LogoIcon from "@/public/assets/images/logo/logo-icon";

export default function SidebarLogo({ toggled = false }) {
    return (
        <div className={`flex items-center gap-2 pt-8 sidebar-header pb-7 ${toggled ? 'justify-center' : 'justify-between'}`}>
            <Link href="/">
                <span className={`logo ${toggled ? 'hidden' : ''}`}>
                    <Image src={Logo} alt="Logo" className="dark:hidden" />
                    <Image src={LogoDark} alt="Logo" className="hidden dark:block" />
                </span>
                <span className={`logo-icon ${toggled ? 'lg:block' : 'hidden'}`} >
                    <LogoIcon />
                </span>
            </Link>
        </div>
    )
}
