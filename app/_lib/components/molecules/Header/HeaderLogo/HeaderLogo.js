import Link from "next/link";
import Logo from "@/assets/images/logo/logo.svg"
import LogoDark from "@/assets/images/logo/logo-dark.svg"
import Image from "next/image"

export default function HeaderLogo() {
    return (
        <Link href="/" className="lg:hidden">
            <Image src={Logo} alt="Logo" className="dark:hidden" />
            <Image src={LogoDark} alt="Logo" className="hidden dark:block" />
        </Link>
    )
}
