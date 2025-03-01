"use client"
import SideNavBar from "@/components/organisms/Sidebar/Sidebar"
import Header from "@/components/organisms/Header/Header"
import BreadCrumb from "@/components/organisms/BreadCrumb/BreadCrumb"
import { useState } from "react"
import clsx from "clsx"
import Footer from "@/components/organisms/Footer/Footer"

export default function MainPageLayout({children}) {
    const [sidebarToggle, setSidebarToggle] = useState(false)

    const toggleSidebar = () => {
        setSidebarToggle(oldValue => !oldValue)
    }

    return (
        <div className="flex h-screen overflow-hidden">
            <SideNavBar sidebarToggle={sidebarToggle} />
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                
                <div
                    className={clsx(
                        "fixed z-9 h-screen w-full bg-gray-900/50",
                        sidebarToggle ? 'block lg:hidden' : 'hidden'
                    )}
                ></div>
                <Header sidebarToggle={sidebarToggle} toggleSideBar={toggleSidebar} />
                <main className="">
                    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 text-gray-900 dark:text-white/90 min-h-[calc(100vh-150px)]">
                        <BreadCrumb />
                        {children}
                    </div>
                    <Footer />
                </main>
                
            </div>
        </div>
    )
}
