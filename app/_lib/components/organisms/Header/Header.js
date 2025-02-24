import HeaderLogo from "@/components/molecules/Header/HeaderLogo/HeaderLogo"
import HeaderSearchForm from "@/components/molecules/Header/HeaderSearchForm/HeaderSearchForm"
import SidebarToggleButton from "@/components/atoms/Header/SidebarToggleButton/SidebarToggleButton"
import { useState } from "react"
import ThemeSwitcherButton from "@/components/atoms/Header/HeaderThemeSwitcherButton/HeaderThemeSwitcherButton";
import HeaderNotification from "@/components/molecules/Header/HeaderNotification/HeaderNotification";
import HeaderUserIcon from "@/components/molecules/Header/HeaderUserIcon/HeaderUserIcon";
import HeaderToggleButton from "@/components/atoms/Header/HeaderToggleButton/HeaderToggleButton";
import clsx from "clsx";

export default function Header({ sidebarToggle, toggleSideBar }) {
    const [headerToggle, setHeaderToggle] = useState(true);
    return (
        <header className="sticky top-0 z-99999 flex w-full border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 lg:border-b">
            <div className="flex flex-grow flex-col items-center justify-between lg:flex-row lg:px-6">
                <div className="flex w-full items-center justify-between gap-2 border-b border-gray-200 px-3 py-3 dark:border-gray-800 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
                    <SidebarToggleButton sidebarToggle={sidebarToggle} toggleSideBar={toggleSideBar} />
                    <HeaderLogo />
                    <HeaderToggleButton headerToggle={headerToggle} setHeaderToggle={setHeaderToggle} />
                    <HeaderSearchForm />
                </div>
                <div className={clsx(
                    "lg:flex w-full flex-row items-center justify-between gap-4 px-5 py-4 shadow-theme-md lg:justify-end lg:px-0 lg:shadow-none",
                    headerToggle ? "hidden" : "flex"
                )}>
                    <div className="flex items-center gap-2 2xsm:gap-3">
                        <ThemeSwitcherButton />
                        <HeaderNotification />
                    </div>
                    <HeaderUserIcon />
                </div>
            </div>
        </header>
    )
}
