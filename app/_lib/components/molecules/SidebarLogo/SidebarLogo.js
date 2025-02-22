import Image from "next/image";
import Link from "next/link";

export default function SidebarLogo({ toggled = false }) {
    return (
        <div className={`flex items-center gap-2 pt-8 sidebar-header pb-7 ${toggled ? 'justify-center' : 'justify-between'}`}>
            <Link href="/">
                <span className={`logo ${toggled ? 'hidden' : ''}`}>
                    <Image 
                        className="dark:hidden" 
                        src="/assets/images/logo/logo.svg" alt="Logo"
                        width={250}
                        height={150}
                    />
                    <Image 
                        className="hidden dark:block" 
                        src="/assets/images/logo/logo-dark.svg" alt="Logo"
                        width={100}
                        height={100}
                    />
                </span>
                <Image 
                    className={`logo-icon ${toggled ? 'lg:block' : 'hidden'}`} 
                    src="/assets/images/logo/logo-icon.svg" alt="Logo"
                    width={100}
                    height={100}
                />
            </Link>
        </div>
    )
}
