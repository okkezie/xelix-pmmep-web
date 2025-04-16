import Link from "next/link"
import { Constants } from "@/utils/Constants"
import ThemeTogglerButton from "@/components/atoms/ThemeTogglerButton/ThemeTogglerButton"
import Grid from "@/public/svgs/grid"
import LogoIcon from "@/public/assets/images/logo/logo-icon"

export default function AuthPageLayout({
    children,
}) {
    return (
        <div className="relative p-6 bg-white z-1 dark:bg-gray-950 sm:p-0">
            <div className="relative flex lg:flex-row w-full h-screen justify-center flex-col dark:bg-gray sm:p-0">
                {children}
                <div className="lg:w-1/2 w-full h-full bg-green-950 dark:bg-green-100/9 lg:grid items-center hidden">
                    <div className="relative items-center justify-center flex z-1 h-full">
                        <div className="absolute right-0 top-0 -z-1 w-full max-w-[250px] xl:max-w-[450px]">
                            <Grid />
                        </div>
                        <div className="absolute bottom-0 left-0 -z-1 w-full max-w-[250px] rotate-180 xl:max-w-[450px]">
                            <Grid />
                        </div>
                        <div className="flex flex-col items-center">
                            <Link href={Constants.Paths.Dashboard} className="block mb-4">
                                <LogoIcon />
                            </Link>
                            <div className="flex flex-col text-center text-gray-400 dark:text-white/60 text-[30px] leading-[60px] gap-6">
                                <p>
                                    Abia State Government
                                </p>
                                <p>
                                    Project Management, Monitoring and Evaluation Platform
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fixed bottom-6 right-6 z-50 hidden sm:block">
                    <ThemeTogglerButton />
                </div>
            </div>
        </div>
    )
}
