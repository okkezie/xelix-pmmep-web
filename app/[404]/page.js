'use client'
import Light404 from "@/assets/images/error/404.svg"
import Dark404 from "@/assets/images/error/404-dark.svg"
import Grid01 from "@/assets/images/shape/grid-01.svg"
import Link from "next/link"
import Image from "next/image"

export default function NotFound() {
    return (
        <div className="relative z-1 flex min-h-screen flex-col items-center justify-center overflow-hidden p-6">
            <div className="absolute right-0 top-0 -z-1 w-full max-w-[250px] xl:max-w-[450px]">
                <Image src={Grid01} alt="Grid" className="w-full h-full object-contain" />
            </div>
            <div className="absolute bottom-0 left-0 -z-1 w-full max-w-[250px] rotate-180 xl:max-w-[450px]">
                <Image src={Grid01} alt="Grid" className="w-full h-full object-contain" />
            </div>

            <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
                <h1 className="mb-8 text-[72px] leading-[90px] font-bold text-gray-800 dark:text-white/90 xl:text-title-2xl">
                    ERROR
                </h1>

                <Image src={Light404} alt="Light" className="dark:hidden" />
                <Image src={Dark404} alt="Dark" className="hidden dark:block" />

                <p className="mb-6 mt-10 text-base text-gray-700 dark:text-gray-400 sm:text-lg">
                    We can&apos;t seem to find the page you are looking for!
                </p>

                <Link href="/"
                    className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                    Back to Home Page
                </Link>
            </div>
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-sm text-gray-500 dark:text-gray-400">
                &copy; <span id="year">{new Date().getFullYear()}</span> - Abia State Government.
            </p>
        </div>
    );
}
