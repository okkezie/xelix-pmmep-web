import Link from "next/link";
import Logo from "@/assets/images/logo/logo.svg"
import LogoDark from "@/assets/images/logo/logo-dark.svg"
import LogoIcon from "@/assets/images/logo/logo-icon.svg"
import Image from "next/image"

export default function SidebarLogo({ toggled = false }) {
    console.log({LogoDark})
    return (
        <div className={`flex items-center gap-2 pt-8 sidebar-header pb-7 ${toggled ? 'justify-center' : 'justify-between'}`}>
            <Link href="/">
                <span className={`logo ${toggled ? 'hidden' : ''}`}>
                    <Image src={Logo} alt="Logo" className="dark:hidden" />
                    <Image src={LogoDark} alt="Logo" className="hidden dark:block" />
                </span>
                <Image src={LogoIcon} alt="Logo" className={`logo-icon ${toggled ? 'lg:block' : 'hidden'}`} />
            </Link>
        </div>
    )
}
