import Link from "next/link";
import Logo from "@/assets/images/logo/logo.svg"
import LogoDark from "@/assets/images/logo/logo-dark.svg"

export default function HeaderLogo() {
    return (
        <Link href="/" className="lg:hidden">
            <Logo className="dark:hidden" />
            <LogoDark className="hidden dark:block" />
        </Link>
    )
}
