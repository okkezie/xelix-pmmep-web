import Image from "next/image";
import Link from "next/link";

export default function HeaderLogo() {
    return (
        <Link href="/" className="lg:hidden">
            <Image
                className="dark:hidden" 
                src="/assets/images/logo/logo.svg" 
                alt="Logo" 
                width={250}
                height={150}
            />
            <Image 
                className="hidden dark:block" 
                src="/assets/images/logo/logo-dark.svg" 
                alt="Logo" 
                width={250}
                height={150}
            />
        </Link>
    )
}
